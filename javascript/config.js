var config = {
  // Server setup
  port: 8080,
  //address: '127.0.0.1',
  address: 'localhost',
  ipWhitelist: ['127.0.0.1', '::ffff:127.0.0.1', '::1'],

  electron: {
    options: {},
    // fullscreen: true,
    fullscreen: false,
    autoHideMenuBar: true,
    zoom: 1,
  },

  defaults: {
    language: 'en',
    timeFormat: 24,
    units: 'metric',
    debug: true,
    // debug: false,
  },

  modules: {
    weather: {
      location: 'Sarpsborg',
      locationID: '3140084',
      appid: '5a92635a509d72a1c5a72fd50af77e56',
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

    jokes: {
      apiEnpoints: [
        'http://api.icndb.com/jokes/random'
      ],
      duration: 10 * 60 * 1000, // 10 minutes
    },

    clock: {
      showDate: true,
      showSeconds: false,
    },

    traffic: {
      googleApiKey: 'AIzaSyCsXhNBQ6E0WIk6JLqgKE9AusH-zdJimc4',
      zoom: 13,
      updateInterval: 15 * 60000, // 15 minutes
      lat: 59.2749729,
      lng: 11.1495561,
      work: {
        showTrafficAt: ['07:00:00,07:30:00'], // From - To
        timeFormat: 'hh:mm:ss',
        zoom: 12,
        lat: 59.4428388,
        lng: 10.6802022,
        center: {
          lat: 59.3757751,
          lng: 10.7798839,
        },
      },
    },
  }
};

module.exports = config;
