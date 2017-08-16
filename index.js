var Boat = require("./boats");
var boat = new Boat();

boat.on('ready',e=>{
  console.log('ready');
  boat.forward(100);

  setTimeout(d=>{
    console.log('300');

    boat.forward(300)
  },500)
  setTimeout(d=>{
    console.log('stop');
    boat.stop()
  },100)
});
