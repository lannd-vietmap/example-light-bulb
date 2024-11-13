<template>
  <div ref="mapContainer" class="map"></div>
</template>

<script>
import pointLight from './point.json';
import lightBulbIcon from './assets/light-bulb.png';
export default {
  name: 'Example-Light-Bulb',
  mounted() {
    const VIETMAP_API_KEY = "";

    this.map = new vietmapgl.Map({
      container: this.$refs.mapContainer,
      style: "https://maps.vietmap.vn/mt/tm/style.json?apikey=" + VIETMAP_API_KEY,
      center: [106.69278715425844, 10.777110166759954],
      zoom: 10,
    });
    const popup = new vietmapgl.Popup({
        closeButton: false,
        closeOnClick: false,
      });
    this.map.addControl(new vietmapgl.NavigationControl(), `top-right`);
    this.map.on('load', async () => {
      // Add an image to use as a custom marker
      const image = await this.map.loadImage('https://cdn4.iconfinder.com/data/icons/evil-icons-user-interface/64/location-64.png');
      this.map.addImage('custom-marker', image.data);
      // Add a GeoJSON source with 3 points.
      
      this.map.addSource('points', {
        'type': 'geojson',
        'data': {
          'type': 'FeatureCollection',
          'features': [
            {
              'type': 'Feature',
              'properties': {
                "data": "Your custom data 1"
              },
              'geometry': {
                'type': 'Point',
                'coordinates': [
                  106.76523729226253,
                  10.888743640168022
                ]
              }
            },
            {
              'type': 'Feature',
              'properties': {
                "data": "Your custom data 2"
              },
              'geometry': {
                'type': 'Point',
                'coordinates': [
                  106.62112796896037,
                  10.849706514610569
                ]
              }
            },
            {
              'type': 'Feature',
              'properties': {
                "data": "Your custom data 3"
              },
              'geometry': {
                'type': 'Point',
                'coordinates': [
                  106.6678217280983,
                  10.760176118420599
                ]
              }
            }
          ]
        }
      });

      // Add a symbol layer
      this.map.addLayer({
        'id': 'symbols',
        'type': 'symbol',
        'source': 'points',
        'layout': {
          'icon-image': 'custom-marker'
        }
      });

      // Center the map on the coordinates of any clicked symbol from the 'symbols' layer.
      this.map.on('click', 'symbols', (e) => {
        console.log(e.features[0].properties);
        const hoverDescription = `<strong>Name: ${e.features[0].properties.data}</strong><br>Coordinates: ${e.features[0].geometry.coordinates}`;

        
        popup.setLngLat(e.features[0].geometry.coordinates).setHTML(hoverDescription).addTo(this.map);
        this.map.flyTo({
          center: e.features[0].geometry.coordinates
        });
      });

      // Change the cursor to a pointer when the it enters a feature in the 'symbols' layer.
      this.map.on('mouseenter', 'symbols', () => {
        this.map.getCanvas().style.cursor = 'pointer';
      });

      // Change it back to a pointer when it leaves.
      this.map.on('mouseleave', 'symbols', () => {
        this.map.getCanvas().style.cursor = '';
        popup.remove();  
      });
    });

  },
  beforeDestroy() {
    if (this.map) {
      this.map.remove();
    }
  },
  methods: {
    createCustomMarker() {
      const markerImage = document.createElement('img');
      markerImage.src = this.lightBulbIcon;
      markerImage.style.width = '25px';
      markerImage.style.height = '25px';
      markerImage.style.cursor = 'pointer';
      return markerImage;
    }
  },
  data() {
    return {
      pointLight: pointLight,
      lightBulbIcon: lightBulbIcon,
    };
  }
};
</script>

<style scoped>
html,
body {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  max-width: 100% !important;
  display: flex !important;
  width: 100%;
  height: 100%;
  padding: 0 !important;
}

.map {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  max-width: 100% !important;
}
</style>
