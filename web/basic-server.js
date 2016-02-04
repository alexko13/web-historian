var http = require("http");
var handler = require("./request-handler");
var initialize = require("./initialize.js");
var helpers = require('./http-helpers');

// Why do you think we have this here?
// HINT: It has to do with what's in .gitignore
initialize();

var port = 8080;
var server = http.createServer(handler.requestHandler);
server.ip = ip = "127.0.0.1";

if (module.parent) {
  module.exports = server;
} else {
  server.listen(port, ip);
  console.log("Listening on " + ip + ":" + port);
}


