<script setup>
import { ref, onMounted, watch } from "vue";
const props = defineProps({
  attractions: Array,
  mapName: String,
});

var map;
const positions = ref([]);
const markers = ref([]);
const overlays = ref([]);

const attractions = ref();

onMounted(() => {
  if (window.kakao && window.kakao.maps) {
    initMap();
  } else {
    const script = document.createElement("script");
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${
      import.meta.env.VITE_KAKAO_MAP_SERVICE_KEY
    }&libraries=services,clusterer`;
    /* global kakao */
    document.head.appendChild(script);
    script.onload = () => kakao.maps.load(() => initMap());
  }
});

watch(
  () => props.attractions,
  () => {
    positions.value = [];
    overlays.value = [];
    props.attractions.forEach((attraction) => {
      let obj = {};
      obj.latlng = new kakao.maps.LatLng(attraction.latitude, attraction.longitude);
      obj.title = attraction.title;
      obj.zipcode = attraction.zipcode;
      obj.firstImage = attraction.firstImage;
      obj.addr1 = attraction.addr1;
      positions.value.push(obj);
    });
    // initMap();
  },
  { deep: true }
);

const initMap = () => {
  const container = document.getElementById(props.mapName);
  const options = {
    center: new kakao.maps.LatLng(35.5519, 126.9918), // 지도의 중심좌표
    level: 14,
  };
  map = new kakao.maps.Map(container, options);

  attractions.value = props.attractions;
  positions.value = [];
  attractions.value.forEach((attraction) => {
    let obj = {};
    obj.latlng = new kakao.maps.LatLng(attraction.latitude, attraction.longitude);
    obj.title = attraction.title;
    obj.zipcode = attraction.zipcode;
    obj.firstImage = attraction.firstImage;
    obj.addr1 = attraction.addr1;
    obj.contentTypeId = attraction.contentTypeId;
    positions.value.push(obj);
  });
  loadMarkers();
};

const loadMarkers = () => {
  deleteMarkers();

  markers.value = [];
  var imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";

  positions.value.forEach((position) => {
    console.log(position.contentTypeId);
    var imageSrc;
    var imageSize = new kakao.maps.Size(24, 35);
    if (position.contentTypeId == 12) {
      imageSrc = "/img/marker_attraction.png";
    } else if (position.contentTypeId == 14) {
      imageSrc = "/img/marker_culture.png";
    } else if (position.contentTypeId == 28) {
      imageSrc = "/img/marker_sports.png";
    } else if (position.contentTypeId == 32) {
      imageSrc = "/img/marker_house.png";
    } else if (position.contentTypeId == 38) {
      imageSrc = "/img/marker_shopping.png";
    } else if (position.contentTypeId == 39) {
      imageSrc = "/img/marker_restaurant.png";
    } else {
      imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";
    }
    var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

    const marker = new kakao.maps.Marker({
      map: map, // 마커를 표시할 지도
      position: position.latlng, // 마커를 표시할 위치
      title: position.title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됨.
      clickable: true, // // 마커를 클릭했을 때 지도의 클릭 이벤트가 발생하지 않도록 설정합니다
      image: markerImage, // 마커의 이미지
    });

    markers.value.push(marker);
  });

  // const bounds = positions.value.reduce(
  //   (bounds, position) => bounds.extend(position.latlng),
  //   new kakao.maps.LatLngBounds()
  // );

  // map.setBounds(bounds);
};

const deleteMarkers = () => {
  if (markers.value.length > 0) {
    markers.value.forEach((marker) => marker.setMap(null));
  }
};
</script>

<template>
  <div :id="props.mapName" style="width: 100%; height: 400px"></div>
</template>

<style scoped></style>
