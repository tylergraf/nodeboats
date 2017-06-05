const path = require("path");
// var Boat = require("./boat");
// var boat = new Boat();

var express = require("express");
var app = express();
var server = require("http").Server(app);
var io = require("socket.io")(server);

server.listen(8080);

app.use(express.static(path.join(__dirname, "client/build/default")));

io.on("connection", function(socket) {
  socket.emit("hello", { hello: "world" });

  socket.on("test", function(message) {
    console.log(`Got message: ${message}`);
  });

  socket.on("data", function(data) {
    console.log("data", data);
    // boat.forward(data.speed || 0);
    // boat.turn(data.degree || 90);
  });

  socket.on("data", function(data) {
    console.log("data", data);
    // boat.forward(data.speed || 0);
    // boat.turn(data.degree || 90);
  });
});
