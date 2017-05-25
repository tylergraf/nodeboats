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
    const { Motor, Servo } = five;

    this.board = new five.Board({
      io: new Particle({
        token: process.env.PARTICLE_TOKEN,
        deviceId: process.env.PARTICLE_DEVICE_ID
      })
    });

    board.on("ready", () => {
      this.motorL = new Motor({ pin: DEFAULT_CONFIG.MOTOR_L_PIN });
      this.motorR = new Motor({ pin: DEFAULT_CONFIG.MOTOR_R_PIN });
      this.rudder = new Servo(DEFAULT_CONFIG.RUDDER_PIN);
      this.rudder.to(DEFAULT_CONFIG.RUDDER_START_POS);
      this.emit("ready");
    });
  }

  forward(speed) {
    this.motorL.start(speed); //255 max?
    this.motorR.start(speed);
  }

  reverse(speed) {}

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
