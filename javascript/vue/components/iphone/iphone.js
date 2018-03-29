import template from './iphone.html';
import axios from 'axios';
import events from 'events';

export default {
  template: template,

  data() {
    return {

    };
  },

  mounted() {
    var eventEmitter = new events.EventEmitter();

    eventEmitter.on('iphone:battery', function (data) {
      console.log(data);
    });

  },

  methods: {}
}
