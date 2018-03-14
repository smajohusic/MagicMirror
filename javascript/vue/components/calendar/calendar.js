import template from './calendar.html';
import axios from 'axios';

export default {
  template: template,

  data() {
    return {
      config: this.$root.globalConfig.modules.calendar,
      show: false,
    };
  },

  mounted() {
    this.bootModule();
  },

  methods: {
    bootModule() {
      if (this.$root.globalConfig.modules.calendar === 'undefined' || this.$root.globalConfig === null) {
        console.error('Global config is missing or the module is missing in the configuration file.');

        return;
      }

      this.fetchCalendar();
    },

    fetchCalendar() {
      const apiUrl = this.resolveApiCalendarUrl();

      axios.get(apiUrl)
        .then(response => {
          console.log("api response data", response);
        })
        .catch(error => {
          console.log("api error data", error);
        });


      // this.rescheduleTimer();
    },

    resolveApiCalendarUrl() {
      if (this.config.calendarType === '') {
        console.log('You need to set the calendarType in config');

        return;
      }

      // This will return all the info you need to make the api call
      const calendarSettings = this.config[this.config.calendarType];
      const apiUrl = calendarSettings.url;
      const params = calendarSettings.params;

      if (params !== 'undefined' || params !== null ) {

        // Set all the params that the user has defined in the config
        for (let key in params) {
          if (params.hasOwnProperty(key)) {
            apiUrl = apiUrl.concat('&' + key + '=' + params[key]);
          }
        }
      }


      return apiUrl;
    },

    rescheduleTimer() {
      // Clear the timer first
      clearTimeout(this.timer);

      const self = this;
      // Reschedule the timer
      this.timer = setTimeout(function () {
        self.fetchCalendar();
      }, this.config.duration);
    },
  },
}