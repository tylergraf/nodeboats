# nodeboats


## Claim and configure the Photon

In order to use the particle photon you will need to register and create an account on [particle.io](https://www.particle.io/)

This will allow you to claim the photon and be able to flash firmware to it. Next, install the particle cli by entering the following into your terminal: [more info](https://docs.particle.io/guide/tools-and-features/cli/photon/)

`npm install -g particle-cli`

Connect the photon to your computer via the USB cable and login using the account you created previously:

`particle login`

Once you have succesfully logged in, you can use the commmand line to claim and configure your photon:

NOTE:  your photon must be in listening mode, for more info see [device modes](https://docs.particle.io/guide/getting-started/modes/photon/)

`particle setup`

Walk through the setup procedure and configure the WIFI to use:

`SSID: boats`
`PW: 87654321`

Your photon should be breathing a cyan blue color, which indicates it has successfully connected to the particle cloud.

Congrats, you're ready to move on!

## Tinker

Install the [particle app](https://docs.particle.io/guide/getting-started/tinker/photon/) for you mobile device

Use the app to turn on and off the LED connected to pin `D7`

## Wiring the board

Wire the board according to the wiring diagram:

NOTE: If following the instructions from the nodeboats site you need to use pins `A4,A5` instead of `A0,A1`

## Install Johnny Five

Install the VoodooSpark firmware following the directions from [here](https://github.com/voodootikigod/voodoospark)


## Helpful Links
[Original Nodeboats project](https://github.com/notthetup/nodeboats-material/blob/master/getting-started.md)

[Johnny Five API](http://johnny-five.io/api/)

[Particle Photon Datasheet](https://docs.particle.io/datasheets/photon-datasheet/)

[L293D Datasheet](http://www.ti.com/lit/ds/symlink/l293.pdf)

[Understanding the L293D](https://learn.adafruit.com/adafruit-arduino-lesson-15-dc-motor-reversing/an-experiment)

[SG90 Servo Datasheet](http://akizukidenshi.com/download/ds/towerpro/SG90.pdf)






