var noble = require('noble');

// This needs to be refactored to the config but for some reason no devices are fund when defining the array
var deviceUUIDs = ['e00e9eb160ef4ade820589526365ed7b'];
// var serviceUUIDs = ['d0611e78bbb44591a5f8487910ae4366']; // default: [] => all

// d0611e78bbb44591a5f8487910ae4366  // iphone service uuid

// 78e724f550254426a8624139e758c2f7
// f6490ce86b8143069931c3b16309c8ec
// e00e9eb160ef4ade820589526365ed7b

noble.on('stateChange', function (state) {
  if (state === 'poweredOn') {
    noble.startScanning([], false);
  } else {
    noble.stopScanning();
  }
});

noble.on('discover', processPeripheral);

function processPeripheral(peripheral) {
  explore(peripheral);
}

function explore(peripheral) {
  peripheral.on('disconnect', function () {
    process.exit(0);
  });

  peripheral.connect(function (error) {
    if (error) {
      console.log(error);
      peripheral.disconnect();
    }

    deviceUUIDs.forEach(function (deviceUUID) {
      if (deviceUUID === peripheral.uuid) {
        peripheral.discoverAllServicesAndCharacteristics(function(error, services, characteristics) {
          // console.log('discoverAllServicesAndCharacteristics', error);
          // console.log(services);
          // console.log(characteristics);

          
        });
      }
    });


    // peripheral.discoverServices(serviceUUIDs, function(error, services) {
    //   console.log(error, services);
    // }); // particular UUID's

    // This needs to be refactored to only discover the devices that you defined in the config
    // peripheral.discoverAllServicesAndCharacteristics([], function (error, services, ) {
    //   console.log(error, services);
    // });
  });
}
