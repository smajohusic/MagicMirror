// import Vue from 'vue';
import Vue from 'vue/dist/vue.js';
import config from '../config.js';

// Only for debugging
Vue.config.devtools = true;
Vue.config.silent = false;

import clock from './components/clock/clock';
import weatherComponent from './components/weather/weather';
import jokes from './components/jokes/jokes';
import traffic from './components/traffic/traffic';
import calendar from './components/calendar/calendar';
import iphone from './components/iphone/iphone';

const app = new Vue({
  el: '#app',

  data() {
    return {
      globalConfig: config,
      globalClock: {},
    };
  },

  computed: {},

  components: {
    clock: clock,
    weather: weatherComponent,
    jokes: jokes,
    traffic: traffic,
    calendar: calendar,
    iphone: iphone,
  },

  filters: {},

  mounted() {
    this.registerChildEventListener();
  },

  methods: {
    registerChildEventListener() {
      this.$root.$on('clock:current-time-and-date', (event) => {
        this.setGlobalClockAndDate(event);
      });
    },

    setGlobalClockAndDate(data) {
      this.globalClock = data;
    },
  }
});
