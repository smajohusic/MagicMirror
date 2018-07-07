var config = {
  // Server setup
  port: 8080,
  address: '127.0.0.1',
  ipWhitelist: ['127.0.0.1', '::ffff:127.0.0.1', '::1'],

  electron: {
    options: {},
    fullscreen: true,
    autoHideMenuBar: true,
    zoom: 1,
  },

  defaults: {
    language: 'en',
    timeFormat: 24,
    units: 'metric',
    debug: false,
  },

  modules: {
    weather: {
      location: 'Sarpsborg',
      locationID: '3140084',
      appid: '',
      updateInterval: 15 * 60000, // every 15 minutes
      units: 'metric',
      timeFormat: 24,
      lang: 'en',

      apiVersion: "2.5",
      apiBase: "https://api.openweathermap.org/data/",
      weatherEndpoint: "weather",

      appendLocationNameToHeader: true, // todo: is this even used?
      calendarClass: "calendar", // todo: is this even used?

      onlyTemp: false, // todo: is this even used?
      roundTemp: false, // todo: is this even used?
    },

    jokes: {
      apiEnpoints: [
        'http://api.icndb.com/jokes/random'
      ],
      duration: 15 * 60000, // 15 minutes
    },

    clock: {
      showDate: true,
      showSeconds: false,
    },

    traffic: {
      googleApiKey: '',
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

    calendar: {
      calendarType: 'google',
      updateInterval: 60 * 60000, // Every hour

      google: {
        url: 'https://www.googleapis.com/calendar/v3/calendars/{account}/events?key={key}',
        queryParams: {
          singleEvents: true,
          orderBy: 'starttime',
          maxResults: 3,
        },
      },
    },

    bluetooth: {
      iphone: 'e00e9eb160ef4ade820589526365ed7b',
    },
  }
};

module.exports = config;
