const five = require("johnny-five");
const Particle = require("particle-io");

const board = new five.Board({
  io: new Particle({
    token: process.env.PARTICLE_TOKEN,
    deviceId: process.env.PARTICLE_DEVICE_ID
  })
});

 board.on("ready", function() {
   const motor1 = new five.Motor({
     pins: {
       dir: 'D0',
       pwm: 'D1'
     },
     invertPWM: true
   });
   const motor2 = new five.Motor({
     pins: {
       dir: 'D2',
       pwm: 'D3'
     },
     invertPWM: true
   });
    // const motor1 = new five.Motor({
    //   pin:'D0'
    // });
    // const motor2 = new five.Motor({
    //   pin:'D1'
    // });

    function forward(num){
      motor1.forward(num);
      motor2.forward(num);
    }
    function reverse(num){
      motor1.reverse(num);
      motor2.reverse(num);
    }

    function stop(){
      motor1.stop();
      motor2.stop();
    }
    board.repl.inject({
      f: forward,
      r: reverse,
      s: stop
    });
  });
