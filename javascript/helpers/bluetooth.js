var noble = require('noble');
var async = require('async');

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
        /*
        * Discover Services
        */
        peripheral.discoverServices([], function (error, services) {
          if (!services.length) {
            peripheral.disconnect();
          }

          services.forEach(function (service) {
            // Is this only for iphone?
            service.discoverCharacteristics(['2a19'], function(error, characteristics) {
              // Get the battery service characteristic and read the value
              characteristics.forEach(function (characteristic) {
                if (characteristic.uuid === '2a19' && characteristic._serviceUuid === '180f') {
                  characteristic.read(function (error, data) {
                    console.log('battery level is now: ', data.readUInt8(0) + '%');
                  });

                  // To enable notify
                  characteristic.subscribe(function(error) {
                    console.log('battery level notification on');
                  });
                }
              });
            });


            /*
            * Discover Characteristics
            */
            // service.discoverCharacteristics([], function(error, characteristics) {
              // characteristics.forEach(function (characteristic) {
              //
              //
              //   // if (characteristic.uuid === '2a19') {
              //     characteristic.read(function (error, data) {
              //       if (data) {
              //         var string = data.toString('ascii');
              //
              //         console.log(data);
              //         console.log('utf-8: ' + data.toString('utf8'));
              //         console.log('ascii: ' + data.toString('ascii'));
              //
              //         var characteristicInfo = '\n    value       ' + data.toString('hex') + ' | \'' + string + '\'';
              //       }
              //
              //       // console.log(characteristicInfo);
              //     });
              //
              //     characteristic.discoverDescriptors(function(error, descriptors) {
              //       descriptors.forEach(function (descriptor) {
              //         descriptor.readValue(function (error, data) {
              //           if (data) {
              //             var characteristicInfo = ' (' + data.toString() + ')';
              //
              //             // console.log(characteristicInfo);
              //           }
              //         });
              //       });
              //     });
              //   // }
              //
              //   // characteristic.on('data', function (data) {
              //   //   console.log(data);
              //   // });
              //
              //
              // });
            // });
          });
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
