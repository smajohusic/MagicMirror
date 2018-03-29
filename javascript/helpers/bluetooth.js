var noble = require('noble');
var events = require('events');
var config = require('../config').modules.bluetooth;

var peripheralNames = Object.keys(config);

// Devices that are supported
var iphoneEnabled = false;
var androidEnabled = false;

peripheralNames.forEach(function (name) {
  if (name === 'iphone') {
    iphoneEnabled = true;
  }

  if (name === 'android') {
    androidEnabled = true;
  }
});

noble.on('stateChange', function (state) {
  if (state === 'poweredOn') {
    noble.startScanning([], false);
  } else {
    noble.stopScanning();
  }
});

noble.on('discover', processPeripheral);

function processPeripheral(peripheral) {
  if (iphoneEnabled) {
    if (peripheral.uuid === config['iphone']) {
      exploreIphone(peripheral);
    }
  }

  // if (androidEnabled) {
  //   if (peripheral.uuid === config['android']) {
  //     exploreAndroid(peripheral);
  //   }
  // }
}

function exploreIphone(peripheral) {
  peripheral.on('disconnect', function () {
    process.exit(0);
  });

  peripheral.connect(function (error) {
    if (error) {
      console.log(error);
      peripheral.disconnect();
    }

    var eventEmitter = new events.EventEmitter();

    peripheral.discoverServices([], function (error, services) {
      services.forEach(function (service) {

        // Manufacturer
        service.discoverCharacteristics(['2a29'], function (error, characteristics) {
          characteristics.forEach(function (characteristic) {
            if (characteristic.uuid === '2a29') {
              characteristic.read(function (error, data) {
                eventEmitter.emit('iphone:manufacturer', {
                  manufacturer: data.toString('utf8')
                });
              });
            }
          });
        });

        // Battery level
        service.discoverCharacteristics(['2a19'], function (error, characteristics) {
          // Get the battery service characteristic and read the value
          characteristics.forEach(function (characteristic) {
            if (characteristic.uuid === '2a19') {
              characteristic.read(function (error, data) {
                eventEmitter.emit('iphone:battery', {
                  battery: data.readUInt8(0) + '%'
                });
              });

              // To enable notify
              characteristic.subscribe(function (error) {});
            }
          });
        });
      });
    });
  });
}
