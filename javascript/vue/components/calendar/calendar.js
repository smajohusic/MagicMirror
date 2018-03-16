import template from './calendar.html';
import axios from 'axios';

export default {
  template: template,

  data() {
    return {
      config: this.$root.globalConfig.modules.calendar,
      show: false,
      timer: null,
      calendarEvents: [],
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
          this.show = true;

          // Google returns an array witch object items
          response.data.items.forEach(item => {
            this.calendarEvents.push(item);
          });
        })
        .catch(error => {
          this.show = true;
          console.log('Error occurred while getting calendar info', error);
        });

      this.rescheduleTimer();
    },

    resolveApiCalendarUrl() {
      if (this.config.calendarType === '') {
        console.log('You need to set the calendarType in config');

        return;
      }

      // This will return all the info you need to make the api call
      const calendarSettings = this.config[this.config.calendarType];
      const params = calendarSettings.queryParams;
      let apiUrl = calendarSettings.url;

      if (params !== 'undefined' || params !== null) {
        let buildParams = '';

        // Set all the params that the user has defined in the config
        for (let key in params) {
          if (params.hasOwnProperty(key)) {
            buildParams = buildParams + '&' + key + '=' + params[key];
          }
        }

        if (this.config.calendarType === 'google') {
          // Only show calendar events from today and to the future
          buildParams = buildParams + '&timeMin=' + this.getCurrentTimestamp();
        }

        apiUrl += buildParams;
      }

      return apiUrl;
    },

    getCurrentTimestamp() {
      const date = new Date;

      return date.getUTCFullYear() + '-' + date.getUTCMonth() + '-' + date.getUTCDate() + 'T' + date.getUTCHours() +
                ':' + date.getUTCMinutes() + ':' + date.getUTCSeconds() + 'Z';
    },

    formatDateString(dateString) {
      return dateString.slice(8, 10) + '/' + dateString.slice(5, 7) + '/' + dateString.slice(0, 4);
    },

    rescheduleTimer() {
      // Clear the timer first
      clearTimeout(this.timer);

      const self = this;
      // Reschedule the timer
      this.timer = setTimeout(function () {
        self.fetchCalendar();
      }, this.config.updateInterval);
    },
  },
}
