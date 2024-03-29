var http = require("http");
var socketio = require("socket.io");
var fs = require("fs");
var server = http
  .createServer(function(req, res) {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(fs.readFileSync(__dirname + "/index.html", "utf-8"));
  })
  .listen(3000); // ポート競合の場合は値を変更

var io = socketio(server); //仕様変更でsocketio.listen(server)から変更

io.sockets.on("connection", function(socket) {
  socket.on("client_to_server", function(data) {
    io.sockets.emit("server_to_client", { value: data.value });
  });
});