var Server = require(__dirname + '/server/setup.js');
var config = require(__dirname + '/config.js');

const Init = function () {

  var server = new Server(config, function (app, io) {
    console.log("Server started ...");

    if (typeof callback === "function") {
      callback(config);
    }
  });

  this.start = function(callback) {

  };

  this.stop = function () {

  };
};

module.exports = new Init();
