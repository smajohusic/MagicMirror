import template from './traffic.html';
import moment from 'moment';

export default {
  template: template,

  data() {
    return {
      moduleConfig: this.$root.globalConfig.modules.traffic,
      map: null,
    };
  },

  mounted() {
    this.init();
  },

  methods: {
    init() {
      if (this.$root.globalConfig.modules.traffic === 'undefined' || this.$root.globalConfig === null) {
        console.error('Global config is missing or the module is missing in the configuration file.');

        return;
      }

      // We wait 1 second before booting the module, because then we know that the google api is ready
      setTimeout(() => {
        this.bootModule();
      }, 1000);
    },

    bootModule() {
      moment.locale(this.$root.globalConfig.defaults.language);

      // If work time has been set, check if its time to show it
      if (this.moduleConfig.work.showTrafficAt.length && this.moduleConfig.work.showTrafficAt !== '') {
        this.resolveMapToShow();
      } else {
        this.showCurrentLocation();
      }
    },

    resolveMapToShow() {
      this.moduleConfig.work.showTrafficAt.forEach(time => {
        const currentTime = moment();
        let showWorkDirectionFrom = moment(time.split(',')[0], this.moduleConfig.work.timeFormat);
        let showWorkDirectionTo = moment(time.split(',')[1], this.moduleConfig.work.timeFormat);

        if (currentTime.isBetween(showWorkDirectionFrom, showWorkDirectionTo)) {
          this.showWorkDirection();
        } else {
          this.showCurrentLocation();
        }
      });

      setInterval(() => {
        this.resolveMapToShow();
      }, this.moduleConfig.updateInterval);
    },

    showWorkDirection() {
      const home = new google.maps.LatLng(this.moduleConfig.lat, this.moduleConfig.lng);
      const work = new google.maps.LatLng(this.moduleConfig.work.lat, this.moduleConfig.work.lng);
      const directionsService = new google.maps.DirectionsService();
      const directionsDisplay = new google.maps.DirectionsRenderer({
        polylineOptions: {
          strokeColor: "hsla(0, 0%, 0%, 0.2)"
        }
      });
      const trafficLayer = new google.maps.TrafficLayer();

      // Init the map with correct locations and setting
      this.map = new google.maps.Map(document.getElementById('map'), {
        zoom: this.moduleConfig.work.zoom,
        center: { lat: this.moduleConfig.work.center.lat, lng: this.moduleConfig.work.center.lng },
        disableDefaultUI: true,
        mapTypeControlOptions: {
          mapTypeIds: google.maps.MapTypeId.ROADMAP,
        },
        styles: this.generateMapStyles(),
        backgroundColor: 'hsla(0, 0%, 0%, 0)',
      });

      directionsDisplay.setMap(this.map);
      directionsDisplay.setPanel(document.getElementById('directionsPanel'));

      directionsService.route({
        origin: home,
        destination: work,
        travelMode: "DRIVING"
      }, function (result, status) {
        if (status == google.maps.DirectionsStatus.OK) {
          directionsDisplay.setDirections(result);
        }
      });

      trafficLayer.setMap(this.map);
    },

    showCurrentLocation() {
      this.map = new google.maps.Map(document.getElementById('map'), {
        zoom: this.moduleConfig.zoom,
        center: { lat: this.moduleConfig.lat, lng: this.moduleConfig.lng },
        disableDefaultUI: true,
        mapTypeControlOptions: {
          mapTypeIds: google.maps.MapTypeId.ROADMAP,
        },
        styles: this.generateMapStyles(),
        backgroundColor: 'hsla(0, 0%, 0%, 0)',
      });

      const trafficLayer = new google.maps.TrafficLayer();

      trafficLayer.setMap(this.map);

      // It seems like this is a common solution to update traffic info
      setInterval(() => {
        this.map.setOptions({
          styles: this.generateMapStyles()
        });
      }, this.moduleConfig.updateInterval);
    },

    generateMapStyles() {
      return [
        {
          "featureType": "administrative",
          "elementType": "all",
          "stylers": [
            {
              "saturation": "-100"
            },
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "administrative.province",
          "elementType": "all",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "landscape",
          "elementType": "labels",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "landscape",
          "elementType": "all",

          "stylers": [
            {
              "saturation": -100
            },
            {
              "lightness": 65
            }
          ]
        },
        {
          "featureType": 'landscape.natural.landcover',
          "elementType": 'geometry.fill',
          "stylers": [
            { "visibility": 'on' },
          ]
        },
        {
          "featureType": "landscape",
          "elementType": "geometry.fill",
          "stylers": [
            {
              "visibility": "off"
            },
          ]
        },
        {
          "featureType": "poi",
          "elementType": "all",
          "stylers": [
            {
              "saturation": -100
            },
            {
              "lightness": "50"
            },
            {
              "visibility": "simplified"
            },
            {
              "color": "#bebebe"
            }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "geometry.fill",
          "stylers": [
            {
              "saturation": "0"
            },
            {
              "weight": "0.81"
            },
            {
              "visibility": "simplified"
            }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "geometry.stroke",
          "stylers": [
            {
              "visibility": "simplified"
            }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "labels.text.stroke",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "labels.icon",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "labels",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "all",
          "stylers": [
            {
              "saturation": "-100"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "all",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "geometry.stroke",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "labels.icon",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "road.arterial",
          "elementType": "all",
          "stylers": [
            {
              "lightness": "30"
            }
          ]
        },
        {
          "featureType": "road.arterial",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "visibility": "simplified"
            },
            {
              "color": "#616161"
            }
          ]
        },
        {
          "featureType": "road.arterial",
          "elementType": "labels.text.stroke",
          "stylers": [
            {
              "visibility": "simplified"
            }
          ]
        },
        {
          "featureType": "road.arterial",
          "elementType": "labels.icon",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "road.local",
          "elementType": "all",
          "stylers": [
            {
              "lightness": "40"
            }
          ]
        },
        {
          "featureType": "road.local",
          "elementType": "geometry",
          "stylers": [
            {
              "visibility": "on"
            }
          ]
        },
        {
          "featureType": "road.local",
          "elementType": "geometry.fill",
          "stylers": [
            {
              "visibility": "on"
            }
          ]
        },
        {
          "featureType": "road.local",
          "elementType": "geometry.stroke",
          "stylers": [
            {
              "visibility": "on"
            }
          ]
        },
        {
          "featureType": "road.local",
          "elementType": "labels.text",
          "stylers": [
            {
              "visibility": "off"
            },
            {
              "color": "#868686"
            }
          ]
        },
        {
          "featureType": "road.local",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "visibility": "off"
            },
            {
              "color": "#757575"
            }
          ]
        },
        {
          "featureType": "road.local",
          "elementType": "labels.icon",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "transit",
          "elementType": "all",
          "stylers": [
            {
              "saturation": -100
            },
            {
              "visibility": "simplified"
            }
          ]
        },
        {
          "featureType": "transit",
          "elementType": "labels.icon",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "transit.station.airport",
          "elementType": "geometry.fill",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "transit.station.airport",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#616161"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "all",
          "stylers": [
            {
              "visibility": "on"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "geometry",
          "stylers": [
            {
              "hue": "#ffff00"
            },
            {
              "lightness": -25
            },
            {
              "saturation": -97
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "geometry.fill",
          "stylers": [
            {
              "color": "#9f9f9f"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "labels",
          "stylers": [
            {
              "lightness": -25
            },
            {
              "saturation": -100
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#8e8e8e"
            }
          ]
        }
      ];
    },
  },
}
