const EventEmitter = require("events").EventEmitter;
const five = require("johnny-five");
const Particle = require("particle-io");

const DEFAULT_CONFIG = {
  MOTORS_PIN_1: "D0", // requires PWM support
  MOTORS_PIN_2: "D1", // requires PWM support
  RUDDER_PIN: "D2", // requires PWM support
  TORPEDO_PIN: "D3" // requires PWM support
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
      this.motors = new Motor({
        pins: {
          dir: DEFAULT_CONFIG.MOTORS_PIN_1,
          pwm: DEFAULT_CONFIG.MOTORS_PIN_2,
        },
        invertPWM: true
      });
      this.rudder = new Servo({
        pin: DEFAULT_CONFIG.RUDDER_PIN, // Which pin is it attached to?
        range: [45, 135], // Default: 0-180
        center: true // Starts the servo at the center of the range
      });
      this.torpedo = new Servo({
        pin: DEFAULT_CONFIG.TORPEDO_PIN, // Which pin is it attached to?
        range: [45, 135], // Default: 0-180
        startAt: 0 // Immediately move to a degree
      });
      this.emit("ready");
    });
  }

  // range 0-255
  // the motor object will trim the input to the proper range
  forward(speed) {    
    this.motors.forward(speed);
  }

  // range 0-255
  // the motor object will trim the input to the proper range
  reverse(speed) {
    this.motors.reverse(speed); //255 max
  }

  // range 0-180 degrees
  // the servo object will trim the input to the specified range when contructed
  turn(degree) {
    this.rudder.to(degree);
  }

  // moves the torpedo arm to full, and then back after a timeout
  fireTorpedo(degree) {
    this.torpedo.to(180);
    setTimeout(()=>{
      this.torpedo.to(0);
    }, 1000)
  }
  
  stop() {
    this.motorL.stop();
    this.motorR.stop();
  }

}

module.exports = Boat;
