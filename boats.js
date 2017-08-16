const EventEmitter = require("events").EventEmitter;
const five = require("johnny-five");
const Particle = require("particle-io");

const DEFAULT_CONFIG = {
  MOTOR1_PIN_1: "D0", // requires PWM support
  MOTOR1_PIN_2: "D1", // requires PWM support
  MOTOR2_PIN_1: "D2", // requires PWM support
  MOTOR2_PIN_2: "D3" // requires PWM support
  // RUDDER_PIN: "D2", // requires PWM support
  // TORPEDO_PIN: "D3" // requires PWM support
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
      this.motor1 = new Motor({
        pins: {
          dir: DEFAULT_CONFIG.MOTOR1_PIN_1,
          pwm: DEFAULT_CONFIG.MOTOR1_PIN_2
        },
        invertPWM: true
      });
      this.motor2 = new Motor({
        pins: {
          dir: DEFAULT_CONFIG.MOTOR2_PIN_1,
          pwm: DEFAULT_CONFIG.MOTOR2_PIN_2
        },
        invertPWM: true
      });

      // this.rudder = new Servo({
      //   pin: DEFAULT_CONFIG.RUDDER_PIN, // Which pin is it attached to?
      //   range: [10, 170], // Default: 0-180
      //   center: true // Starts the servo at the center of the range
      // });
      //
      // this.torpedo = new Servo({
      //   pin: DEFAULT_CONFIG.TORPEDO_PIN, // Which pin is it attached to?
      //   range: [10, 170], // Default: 0-180
      //   startAt: 0, // Immediately move to a degree
      //   invert: true
      // });
      this.emit("ready");

      this.board.repl.inject({
        f: this.forward,
        r: this.reverse,
        s: this.stop
      });
    });
  }

  // range 0-255
  // the motor object will trim the input to the proper range
  forward(speed) {
    this.motor1.forward(speed);
    this.motor2.forward(speed);
  }

  // range 0-255
  // the motor object will trim the input to the proper range
  reverse(speed) {
    this.motor1.reverse(speed); //255 max
    this.motor2.reverse(speed); //255 max
  }

  // range 0-180 degrees
  // the servo object will trim the input to the specified range when contructed
  turn(degree) {
    this.rudder.to(degree);
  }

  // moves the torpedo arm to full
  fireTorpedo() {
    console.log("fire");
    this.torpedo.to(180);
  }

  // moves the torpedo arm to 0
  reloadTorpedo() {
    this.torpedo.to(0);
  }

  stop() {
    this.motor1.stop();
    this.motor2.stop();
  }
}

module.exports = Boat;
