var config = {
  // Server setup
  port: 8080,
  //address: '127.0.0.1',
  address: 'localhost',
  ipWhitelist: ['127.0.0.1', '::ffff:127.0.0.1', '::1'],

  electron: {
    options: {},
    fullscreen: true,
    // fullscreen: false,
    autoHideMenuBar: true,
    zoom: 1,
  },

  defaults: {
    language: 'en',
    timeFormat: 24,
    units: 'metric',
  },

  modules: {
    weather: {
      location: 'Sarpsborg',
      locationID: '3140084',
      appid: '',
      updateInterval: 10 * 60 * 1000, // every 10 minutes
      units: 'metric',
      timeFormat: 24,
      lang: 'en',

      apiVersion: "2.5",
      apiBase: "https://api.openweathermap.org/data/",
      weatherEndpoint: "weather",

      appendLocationNameToHeader: true,
      calendarClass: "calendar",

      onlyTemp: false,
      roundTemp: false,
    },

  }
};

module.exports = config;
