import template from './jokes.html';
import axios from 'axios';

export default {
  template: template,

  data() {
    return {
      config: this.$root.globalConfig.modules.jokes,
      timer: null,
      show: false,
      joke: '',
      endpoints: this.$root.globalConfig.modules.jokes.apiEnpoints,
    };
  },

  mounted() {
    this.bootModule();
  },

  methods: {
    bootModule() {
      if (this.$root.globalConfig.modules.jokes === 'undefined' || this.$root.globalConfig === null) {
        console.error('Global config is missing or the module is missing in the configuration file.');

        return;
      }

      this.fetchJoke();
    },

    fetchJoke() {
      const apiEndpoint = this.endpoints[Math.floor(Math.random() * this.endpoints.length)];

      axios.get(apiEndpoint)
        .then(response => {
          if (response.status === 200) {
            this.show = true;
            this.joke = JSON.stringify(response.data.value.joke).substr(1).slice(0, -1);
          }
        })
        .catch(error => {
          this.show = false;

          // show the stactrace in console
          console.error(error);
        });

      this.rescheduleTimer();
    },

    rescheduleTimer() {
      // Clear the timer first
      clearTimeout(this.timer);

      const self = this;
      // Reschedule the timer
      this.timer = setTimeout(function () {
        self.fetchJoke();
      }, this.config.duration);
    },
  },
}
