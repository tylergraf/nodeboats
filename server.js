const path = require("path");
var Boat = require("./boat");
var boat = new Boat();

var forward = true;
var right = true;

function swapControls(){

  if (!forward) {
    boat.forward(100); // 0-255
  } else {
    boat.reverse(100); // 0-255
  }
  forward = !forward;

  if (!right) {
    boat.turn(180);
  } else {
    boat.turn(0);
  }
  right = !right;

  boat.fireTorpedo();

}

boat.on("ready", function(){
  setInterval(swapControls, 4000);
});
