// import Vue from 'vue';
import Vue from 'vue/dist/vue.js';
import config from '../config.js';

// Only for debugging
Vue.config.devtools = true;
Vue.config.silent = false;

import weatherComponent from './components/weather/weather';
import jokes from './components/jokes/jokes';
import clock from './components/clock/clock';

const app = new Vue({
  el: '#app',

  data() {
    return {
      globalConfig: config,
    };
  },

  computed: {},

  components: {
    weather: weatherComponent,
    jokes: jokes,
    clock: clock,
  },

  filters: {},

  mounted() {
    // Global mounted
  },

  methods: {}
});
