'use strict';

import template from './weather.html';
import moment from 'moment';

export default {
  template,

  mounted() {
    this.init();
  },

  data () {
    return {
      moduleConfig: {},
      firstEvent: false,
      fetchedLocatioName: '',
      windSpeed: null,
      humidity: null,
      windDirection: null,
      windDeg: null,
      sunriseSunsetTime: null,
      sunriseSunsetIcon: null,
      temperature: null,
      indoorTemperature: null,
      indoorHumidity: null,
      weatherType: null,

      visible: false,
    };
  },

  methods: {
    init() {
      if (this.$root.globalConfig.modules.weather === 'undefined' || this.$root.globalConfig === null) {
        console.error('Global config is missing or the module is missing in the configuration file.');
      }

      // Load the config and merge it with the default settings
      this.resolveConfig();

      // Boot the module
      this.bootModule();
    },

    bootModule() {
      // Set locale.
      moment.locale(this.moduleConfig.lang);

      this.scheduleUpdate(this.moduleConfig.initialLoadDelay);
    },

    scheduleUpdate(delay) {
      let nextLoad = this.moduleConfig.updateInterval;

      if (typeof delay !== 'undefined' && delay >= 0) {
        nextLoad = delay;
      }

      setTimeout(() => {
        this.updateWeather();
      }, nextLoad);
    },

    updateWeather() {
      if (this.moduleConfig.appid === "") {
        console.error("CurrentWeather: APPID not set!");
        return;
      }

      var url = this.moduleConfig.apiBase + this.moduleConfig.apiVersion + "/" + this.moduleConfig.weatherEndpoint + this.getParams();
      var self = this;
      var retry = true;

      const weatherRequest = new XMLHttpRequest();
      weatherRequest.open('GET', url, true);

      weatherRequest.onreadystatechange = function() {
        if (this.readyState === 4) {
          if (this.status === 200) {
            self.processWeather(JSON.parse(weatherRequest.response));
          } else if (this.status === 401) {
            self.showModule(self.moduleConfig.animationSpeed);

            console.error(self.name + ": Incorrect APPID.");
            retry = true;
          } else {
            console.error(self.name + ": Could not load weather.");
          }

          if (retry) {
            self.scheduleUpdate((self.loaded) ? -1 : self.moduleConfig.retryDelay);
          }
        }
      };

      weatherRequest.send();
    },

    getParams() {
      let params = "?";

      if (this.moduleConfig.locationID) {
        params += 'id=' + this.moduleConfig.locationID;
      } else if (this.moduleConfig.location) {
        params += 'q=' + this.moduleConfig.location;
      } else if (this.firstEvent && this.firstEvent.geo) {
        params += 'lat=' + this.firstEvent.geo.lat + '&lon=' + this.firstEvent.geo.lon;
      } else if (this.firstEvent && this.firstEvent.location) {
        params += 'q=' + this.firstEvent.location;
      } else {
        // todo: hide the module
      }

      params += '&units=' + this.moduleConfig.units;
      params += '&lang=' + this.moduleConfig.lang;
      params += '&APPID=' + this.moduleConfig.appid;

      return params;
    },

    processWeather(data) {
      if (!data || !data.main || typeof data.main.temp === "undefined") {
        // Did not receive usable new data.
        return;
      }

      this.humidity = parseFloat(data.main.humidity);
      this.temperature = this.roundValue(data.main.temp);

      if (this.moduleConfig.useBeaufort){
        this.windSpeed = this.ms2Beaufort(this.roundValue(data.wind.speed));
      } else {
        this.windSpeed = parseFloat(data.wind.speed).toFixed(0);
      }

      this.fetchedLocatioName = data.name;
      this.windDirection = this.deg2Cardinal(data.wind.deg);
      this.windDeg = data.wind.deg;
      this.weatherType = this.moduleConfig.iconTable[data.weather[0].icon];

      const now = new Date();
      const sunrise = new Date(data.sys.sunrise * 1000);
      const sunset = new Date(data.sys.sunset * 1000);

      // The moment().format('h') method has a bug on the Raspberry Pi.
      // So we need to generate the timestring manually.
      // See issue: https://github.com/MichMich/MagicMirror/issues/181
      const sunriseSunsetDateObject = (sunrise < now && sunset > now) ? sunset : sunrise;
      let timeString = moment(sunriseSunsetDateObject).format("HH:mm");

      if (this.moduleConfig.timeFormat !== 24) {
        //var hours = sunriseSunsetDateObject.getHours() % 12 || 12;
        if (this.moduleConfig.showPeriod) {
          if (this.moduleConfig.showPeriodUpper) {
            //timeString = hours + moment(sunriseSunsetDateObject).format(':mm A');
            timeString = moment(sunriseSunsetDateObject).format("h:mm A");
          } else {
            //timeString = hours + moment(sunriseSunsetDateObject).format(':mm a');
            timeString = moment(sunriseSunsetDateObject).format("h:mm a");
          }
        } else {
          //timeString = hours + moment(sunriseSunsetDateObject).format(':mm');
          timeString = moment(sunriseSunsetDateObject).format("h:mm");
        }
      }

      this.sunriseSunsetTime = timeString;
      this.sunriseSunsetIcon = (sunrise < now && sunset > now) ? "wi-sunset" : "wi-sunrise";

      // todo: add show module logic here

      this.showModule(this.moduleConfig.animationSpeed);
    },

    showModule(animationSpeed) {
      this.visible = true;
    },

    hideModule(animationSpeed) {
      this.visible = false;
    },

    resolveConfig() {
      this.moduleConfig = Object.assign(this.$root.globalConfig.modules.weather, {
        animationSpeed: 1000,
        showPeriod: false,
        showPeriodUpper: false,
        showWindDirection: true,
        showWindDirectionAsArrow: false,
        useBeaufort: true,
        showHumidity: false,
        degreeLabel: false,
        showIndoorTemperature: false,
        showIndoorHumidity: false,

        initialLoadDelay: 0, // 0 seconds delay
        retryDelay: 2500,

        apiVersion: "2.5",
        apiBase: "https://api.openweathermap.org/data/",
        weatherEndpoint: "weather",

        appendLocationNameToHeader: true,
        calendarClass: "calendar",

        onlyTemp: false,
        roundTemp: false,

        iconTable: {
          "01d": "wi-day-sunny",
          "02d": "wi-day-cloudy",
          "03d": "wi-cloudy",
          "04d": "wi-cloudy-windy",
          "09d": "wi-showers",
          "10d": "wi-rain",
          "11d": "wi-thunderstorm",
          "13d": "wi-snow",
          "50d": "wi-fog",
          "01n": "wi-night-clear",
          "02n": "wi-night-cloudy",
          "03n": "wi-night-cloudy",
          "04n": "wi-night-cloudy",
          "09n": "wi-night-showers",
          "10n": "wi-night-rain",
          "11n": "wi-night-thunderstorm",
          "13n": "wi-night-snow",
          "50n": "wi-night-alt-cloudy-windy"
        }
      });
    },

    ms2Beaufort(ms) {
      const kmh = ms * 60 * 60 / 1000;
      const speeds = [1, 5, 11, 19, 28, 38, 49, 61, 74, 88, 102, 117, 1000];

      for (const beaufort in speeds) {
        let speed = speeds[beaufort];

        if (speed > kmh) {
          return beaufort;
        }
      }

      return 12;
    },

    deg2Cardinal(deg) {
      if (deg>11.25 && deg<=33.75){
        return "NNE";
      } else if (deg > 33.75 && deg <= 56.25) {
        return "NE";
      } else if (deg > 56.25 && deg <= 78.75) {
        return "ENE";
      } else if (deg > 78.75 && deg <= 101.25) {
        return "E";
      } else if (deg > 101.25 && deg <= 123.75) {
        return "ESE";
      } else if (deg > 123.75 && deg <= 146.25) {
        return "SE";
      } else if (deg > 146.25 && deg <= 168.75) {
        return "SSE";
      } else if (deg > 168.75 && deg <= 191.25) {
        return "S";
      } else if (deg > 191.25 && deg <= 213.75) {
        return "SSW";
      } else if (deg > 213.75 && deg <= 236.25) {
        return "SW";
      } else if (deg > 236.25 && deg <= 258.75) {
        return "WSW";
      } else if (deg > 258.75 && deg <= 281.25) {
        return "W";
      } else if (deg > 281.25 && deg <= 303.75) {
        return "WNW";
      } else if (deg > 303.75 && deg <= 326.25) {
        return "NW";
      } else if (deg > 326.25 && deg <= 348.75) {
        return "NNW";
      } else {
        return "N";
      }
    },

    roundValue(temperature) {
      const decimals = this.moduleConfig.roundTemp ? 0 : 1;

      return parseFloat(temperature).toFixed(decimals);
    },
  },
};
