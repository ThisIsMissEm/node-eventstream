var wss = require("websocket-server")
  , sys = require("sys");

var eventStream = function eventStream(server){
  var ws = wss.createServer({server: server})
    , self = this;
  
  ws.on("connection", function(c){
    c.on("message", function(packet){
      packet = JSON.parse(packet);
      self._emit(packet.evt, packet.data);
    });
  });
  
  this.ws = ws;
  return this;
};

sys.inherits(eventStream, process.EventEmitter);

eventStream.prototype._emit = eventStream.prototype.emit;
eventStream.prototype.emit = function(type, data){
  this.ws.broadcast(JSON.stringify({"evt": type, "data": data}));
};

exports.create = function(server){
  return new eventStream(server);
};