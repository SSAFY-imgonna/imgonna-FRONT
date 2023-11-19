<script setup>
import { ref, watch, defineProps, onMounted } from "vue";

var map;
// const position = ref();

const props = defineProps({
  latitude: {
    required: true,
  },
  longitude: {
    required: true,
  },
});

onMounted(() => {
  const script = document.createElement("script");
  script.src = `//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${
    import.meta.env.VITE_KAKAO_MAP_SERVICE_KEY
  }&libraries=services,clusterer`;
  /* global kakao */
  script.onload = () => kakao.maps.load(() => initMap());
  document.head.appendChild(script);
});

const initMap = () => {
  const container = document.getElementById("map");
  const options = {
    center: new kakao.maps.LatLng(props.latitude, props.longitude),
    level: 5,
  };
  map = new kakao.maps.Map(container, options);
  loadMarkers();
};

const loadMarkers = () => {
  const markerPosition = new window.kakao.maps.LatLng(props.latitude, props.longitude);
  // 마커를 생성합니다
  var marker = new kakao.maps.Marker({
    // map: map, // 마커를 표시할 지도
    position: markerPosition,
  });

  marker.setMap(map);
};
</script>

<template>
  <div id="map" style="width: 100%; height: 300px"></div>
</template>

<style scoped></style>
