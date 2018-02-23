import template from './clock.html';
import moment from 'moment';

export default {
  template: template,

  data() {
    return {
      config: this.$root.globalConfig.modules.clock,
      showDate: false,
      showClock: false,
      showSeconds: this.$root.globalConfig.modules.clock.showSeconds,

      clockModuletimer: null,

      clock: {
        hours: null,
        minutes: null,
        seconds: null,
      },

      date: {
        day: null,
        month: null,
        year: null,
      },
    };
  },

  mounted() {
    if (this.$root.globalConfig.modules.clock !== 'undefined') {
      this.showDate = this.config.showDate;
    }

    this.bootModule();
  },

  methods: {
    bootModule() {
      // Set the correct timezone based on locale
      moment.locale(this.$root.globalConfig.defaults.language);

      this.fetchTimeAndDate();
    },

    fetchTimeAndDate() {
      setInterval(() => {
        this.resolveClock(moment());
        this.resolveDate(moment());

        /*
        * This will emit an event with the clock and date every second to the parent
        * By doing this we will be able to access it in the parent, and make it global for all components
         */
        this.$parent.$emit('clock:current-time-and-date', {
          clock: this.clock,
          date: this.date,
        });
      }, 1000);
    },

    resolveClock(time) {
      if (this.clock.hours) {
        this.showClock = true;
      }

      this.clock.hours = time.get('hours');
      this.clock.minutes = time.get('minutes');
      this.clock.seconds = time.get('seconds');

      if (this.clock.hours >= 0 && this.clock.hours <= 9) {
        this.clock.hours = '0' + this.clock.hours;
      }

      if (this.clock.minutes >= 0 && this.clock.minutes <= 9) {
        this.clock.minutes = '0' + this.clock.minutes;
      }

      if (this.clock.seconds >= 0 && this.clock.seconds <= 9) {
        this.clock.seconds = '0' + this.clock.seconds;
      }
    },

    resolveDate(time) {
      this.date.day = time.format('D');
      this.date.month = time.month() + 1; // Months are based on 0 - 11 in moment
      this.date.year = time.year();

      if (this.date.month >= 0 && this.date.month <= 9) {
        this.date.month = '0' + this.date.month;
      }
    },
  },
}
