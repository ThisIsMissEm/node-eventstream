var sys = require('sys')
  , path = require('path')
  , http = require('http')
  , eventStream = require("../lib/eventStream")
  , paperboy = require('paperboy');

var server = http.createServer(function(req, res) {
  paperboy
    .deliver(path.join(path.dirname(__filename), '../public'), req, res)
    .addHeader('Expires', 300)
    .addHeader('X-PaperRoute', 'Node')
    .error(function(statCode, msg) {
      res.writeHead(statCode, {'Content-Type': 'text/plain'});
      res.end("Error " + statCode);
    })
    .otherwise(function(err) {
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.end("Error 404: File not found");
    });
})

server.listen(8080);


var stream = eventStream.create(server);

stream.on("stop", function(){
  sys.puts("stop");
  clearInterval(interval);
});

stream.on("message", function(msg){
  sys.puts("message: ", msg);
});

var interval = setInterval(function(){
  stream.emit("time", (new Date()).getTime());
}, 1000);