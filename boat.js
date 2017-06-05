const EventEmitter = require("events").EventEmitter;
const five = require("johnny-five");
const Particle = require("particle-io");

const DEFAULT_CONFIG = {
  MOTOR_L_PIN: "A4",
  MOTOR_R_PIN: "A5",
  RUDDER_PIN: "D0",
  RUDDER_START_POS: 90
};

class Boat extends EventEmitter {
  constructor() {
    super();
    const { Motor, Servo } = five;

    this.board = new five.Board({
      io: new Particle({
        token: process.env.PARTICLE_TOKEN,
        deviceId: process.env.PARTICLE_DEVICE_ID
      })
    });

    this.board.on("ready", () => {
      this.motorBi = new Motor({
        pins: {
          dir: 'D1',
          pwm: 'D2',
        },
        invertPWM: true
      });
      // this.motorL = new Motor({ pin: DEFAULT_CONFIG.MOTOR_L_PIN });
      // this.motorR = new Motor({ pin: DEFAULT_CONFIG.MOTOR_R_PIN });
      // this.rudder = new Servo(DEFAULT_CONFIG.RUDDER_PIN);
      // this.rudder.to(DEFAULT_CONFIG.RUDDER_START_POS);
      this.emit("ready");
    });
  }

  forward(speed) {
    this.motorBi.forward(speed); //255 max?
  }

  reverse(speed) {
    this.motorBi.reverse(speed); //255 max?
  }

  turn(degree) {
    this.rudder.to(degree);
  }

  stop() {
    this.motorL.stop();
    this.motorR.stop();
  }

  fire() {}
}

module.exports = Boat;

// var boat = new Boat();
// var direction = true;
// boat.on("ready", function() {
//   setInterval(function() {
//     if (direction) {
//       console.log(direction);
//       boat.forward(255);
//     } else {
//       console.log(direction);
//       boat.reverse(255);
//     }
//     direction = !direction;
//   }, 2000);
// });

