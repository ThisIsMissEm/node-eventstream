## Node EventStream ##

Node EventStream is a (proof of concept) library built on top node-websocket-server that demonstrates a similar idea to nodestream, that is, pushing events down to the client from the server and up to the server from the client. In all, the code is quite small. the client library is 95 lines of code and the server is 30 lines of code.

## Usage (server) ##

On the server, simply include the library after installing it with npm, then call:

	eventstream.create(server);

This will return a new eventstream instance, which in turn creates a websocket server instance. With this eventstream instance, you can then call all the methods that you would on a node.js EventEmitter, such as "on", "addListener", "emit", "removeListener" and such.

There is a slight difference though, that is: emit will push the event down to the client. Then the event listeners are actually being triggered by data sent up from the client to the server.

## Usage (client) ##

The client side usage is very similar to the server-side usage. It shares the same api as the server, only, when you create it, rather then passing in a `http.Server` you pass in the url of your http.Server as a websocket url. So, if your server is listening on localhost:8080, you would do the following on the client:

	var stream = new eventstream("ws://localhost:8080");

## Warning ##

This is a proof of concept, I don't say that you should use it, it's more so to prove that it is possible and kinda cool.

## License ##

Copyright 2010 Micheil Smith.

All rights reserved.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to
deal in the Software without restriction, including without limitation the
rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
sell copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
IN THE SOFTWARE.