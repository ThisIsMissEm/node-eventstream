
;(function(global, undefined){
  var isArray = Array.isArray || function(obj) {
    return !!(obj && obj.concat && obj.unshift && !obj.callee);
  };
  
  var eventStream = function(uri){
    if( !("WebSocket" in global) ) throw new Error("No WebSocket Support");
    
    var self = this;
    
    this.connected = false;
    this._events = {};
    
    this._socket = new WebSocket(uri);
    this._socket.addEventListener("open", function(){
      self.connected = true;
    });
    
    this._socket.addEventListener("message", function(evt){
      var packet = JSON.parse(evt.data);
      self._emit(packet.evt, packet.data);
    });
  };
  
  eventStream.prototype._emit = function(evt, data){
    if (!this._events || !this._events[evt]) return false;

    if (typeof this._events[evt] == 'function') {
      this._events[evt].call(this, data);
    } else if (isArray(this._events[evt])) {
      for (var i = 0, listeners = this._events[evt].slice(0), l = listeners.length; i < l; ++i) {
        listeners[i].call(this, data);
      }
    }
  };
  
  eventStream.prototype.emit = function(evt, data){
    if( ! this.connected) throw new Error("Not Connected.");
    this._socket.send(JSON.stringify({"evt": evt, "data": data}));
  };
  
  eventStream.prototype.addListener = function(evt, listener){
    if ('function' !== typeof listener) {
      throw new Error('addListener only takes instances of Function');
    }

    if (!this._events) this._events = {};
    if (!this._events[evt]) {
      // Optimize the case of one listener. Don't need the extra array object.
      this._events[evt] = listener;
    } else if (isArray(this._events[evt])) {
      // If we've already got an array, just append.
      this._events[evt].push(listener);
    } else {
      // Adding the second element, need to change to array.
      this._events[evt] = [this._events[evt], listener];
    }
    return this;
  };
  
  eventStream.prototype.on = eventStream.prototype.addListener;
  
  eventStream.prototype.removeListener = function(evt, listener){
    if (!this._events || !this._events[evt]) return false;

    if(listener === undefined || this._events[evt] === listener) {
      delete this._events[evt];
    } else {
      if ('function' !== typeof listener) {
        throw new Error('removeListener only takes instances of Function');
      }

      var list = this._events[evt];

      if (isArray(list)) {
        var i = list.indexOf(listener);
        if (i > -1) {
          list.splice(i, 1);
          if (list.length == 0){
            delete this._events[evt];
          }
        }
      }
    }
  };
  
  global.eventStream = eventStream;
})(this);