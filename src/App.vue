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
      zoom: 15,
    });

    this.map.addControl(new vietmapgl.NavigationControl(), `top-right`);

    pointLight.forEach(point => {
      const markerElement = this.createCustomMarker();

      const marker = new vietmapgl.Marker({
        element: markerElement,
      })
        .setLngLat([point.lng, point.lat])
        .setOffset([0, 20])
        .addTo(this.map);


      const popup = new vietmapgl.Popup({
        closeButton: false,
        closeOnClick: false,
      });

      markerElement.addEventListener('mouseenter', () => {
        this.map.getCanvas().style.cursor = "pointer";

        const hoverDescription = `<strong>Name: ${point.name}</strong><br>Address: ${point.address}`;

        popup.setLngLat([point.lng, point.lat]).setHTML(hoverDescription).addTo(this.map);
      });

      markerElement.addEventListener('mouseleave', () => {
        this.map.getCanvas().style.cursor = "";
        popup.remove();  
      });

      markerElement.addEventListener('click', () => {
        const clickDescription = `
      <strong>Name: ${point.name}</strong><br>
      Detail: ${point.detail}<br>
      Address: ${point.address}<br>
      Latitude: ${point.lat}<br>
      Longitude: ${point.lng}
    `;

        popup.setLngLat([point.lng, point.lat]).setHTML(clickDescription).addTo(this.map);
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
