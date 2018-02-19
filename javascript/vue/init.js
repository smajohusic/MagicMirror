// import Vue from 'vue';
import Vue from 'vue/dist/vue.js';

import weatherComponent from './components/weather/weather';

new Vue({
  el: '#app',

  components: {
    weatherComponent,
  },
});

// window.addEventListener('load', function () {
//   new Vue({
//     el: '#app',
//
//     components: {
//       weatherComponent,
//     },
//   });
// });


// new Vue({
//   el: '#app',
//
//   data() {
//     //
//   },
//
//   computed: {
//     //
//   },
//
//   components: {
//     weather: weather,
//   },
//
//   filters: {
//     // Global Filters
//   },
//
//   mounted() {
//     console.log('mounted fired');
//     // Global mounted
//   },
//
//   methods: {
//     // Global methods?
//   }
// });