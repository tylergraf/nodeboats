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

  socket.on("btnPress", function(data) {
    console.log("btnPress", data);
    if (data.control == "btnA") {
      boat.fireTorpedo();
    }
  });

  socket.on("dpad", function(data) {
    //console.log("dpad", data);
    if (data.dy > 0) {
      boat.forward(data.dy * 5);
    } else if (data.dy < 0) {
      boat.reverse(data.dy * -5);
    }
    boat.turn(90 + (data.dx * 1.8));
  });

});
