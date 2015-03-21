var tessel = require('tessel'); // import tessel
var gpio = tessel.port['GPIO']; // select the GPIO port


var myPin = gpio.pin['G4']; // on GPIO, can be gpio.digital[0] through 5 or gpio.pin['G3'] through ‘G6’
myPin.output(1);

function foo(){


  console.log('Reading pin:', myPin.rawRead());

  // foo();
}
for(;;){
  foo()

}
