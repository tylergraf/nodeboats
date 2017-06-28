const path = require("path");
var Boat = require("./boat");
var boat = new Boat();

var express = require("express");
var app = express();
var server = require("http").Server(app);
var io = require("socket.io")(server);

server.listen(8080);
console.log("HTTP Server listening on port 8080");

app.use(express.static(path.join(__dirname, "client/build/default")));

io.on("connection", function(socket) {
  socket.emit("hello", { hello: "world" });

  socket.on("test", function(message) {
    console.log(message);
  });

  socket.on("data", function(data) {
    boat.turn(data.degree);
    if (data.speed > 0) {
      boat.forward(data.speed);
    } else if (data.speed < 0) {
      boat.reverse(data.speed * -1);
    }
    if (data.fire) {
      boat.fireTorpedo();
    } else {
      boat.reloadTorpedo();
    }
  });

});
