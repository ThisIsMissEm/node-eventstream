var wss = require("websocket-server")
  , sys = require("sys");

var eventstream = function eventstream(server){
  var ws = wss.createServer({server: server})
    , self = this;
  
  process.EventEmitter.call(this);
  
  ws.on("connection", function(c){
    c.on("message", function(packet){
      packet = JSON.parse(packet);
      self._emit(packet.evt, packet.data);
    });
  });
  
  this.ws = ws;
  return this;
};

sys.inherits(eventstream, process.EventEmitter);

eventstream.prototype._emit = eventstream.prototype.emit;
eventstream.prototype.emit = function(type, data){
  this.ws.broadcast(JSON.stringify({"evt": type, "data": data}));
};

exports.create = function(server){
  return new eventstream(server);
};