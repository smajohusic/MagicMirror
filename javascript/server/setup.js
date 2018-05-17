var express = require("express");
var app = require("express")();
var server = require("http").Server(app);
var io = null;
var path = require("path");
var ipfilter = require("express-ipfilter").IpFilter;
var helmet = require("helmet");

var Server = function (config, callback) {
  console.log('Starting server on port ' + config.port + ' and address ' + config.address);

  server.listen(config.port, config.address ? config.address : null);

  app.use(function (request, response, next) {
    ipfilter(config.ipWhitelist, {mode: config.ipWhitelist.length === 0 ? "deny" : "allow",log: false})(request, response, function (err) {

      if (err === undefined) {
        return next();
      }

      console.log(err.message);
      response.status(403).send("This device is not allowed to access your mirror");
    });
  });

  app.use(helmet());

  // Load the resources we need
  app.use("/fonts/weather-icons", express.static(__dirname + '/../../fonts/weather-icons'));
  app.use("/dist", express.static(__dirname + '/../../dist'));
  app.use("/vue", express.static(__dirname + '/../vue'));

  app.get("/", function(request, response) {
    response.sendFile(path.resolve(__dirname + '/../../index.html'));
  });

  if (typeof callback === "function") {
    callback(app, io);
  }
};

module.exports = Server;
