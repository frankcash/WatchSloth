var tessel = require('tessel'); // import tessel
var Q = require('q');
var Yo = require('yo-api');
var config = require('./config/config');
var camera = require('camera-vc0706').use(tessel.port['A']);
var gpio = tessel.port['GPIO']; // select the GPIO port

var notificationLED = tessel.led[3]; // Set up an LED to notify when we're taking a picture
var myPin = gpio.pin['G4']; // on GPIO, can be gpio.digital[0] through 5 or gpio.pin['G3'] through ‘G6’
myPin.output(1);

yo = new Yo(config.yo); // Initializes yo object


camera.on('ready', function() {
  console.log("On Ready");
  notificationLED.high();


  setInterval(function(){
    if(myPin.rawRead() === 1){

      console.log('Reading pin:', myPin.rawRead());

      takePic().then(
        function(){
          console.log("f");
        }
      );
      yo.yo("frankcash");

    }else{
      console.log('Reading pin:', myPin.rawRead());
    }
  }, 10000);

});

camera.on('error', function(err) {
  console.error(err);
});

camera.on('picture', function(picture){
  console.log('We got a picture! Saving...');
  run = true;
});


function takePic(){
    return Q.fcall(camera.takePicture(function(err, image) {
      if (err) {
        console.log('error taking image', err);
      }else{
        notificationLED.low();
        var name = 'picture-' + Math.floor(Date.now()*1000) + '.jpg';
        console.log('Picture saving as', name, '...');
        process.sendfile(name, image);
        console.log('done.');
        // camera.disable();
       }
    }));
}
