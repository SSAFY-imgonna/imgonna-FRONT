<script setup>
import { ref, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const { planNo } = route.params;

const props = defineProps({
  plan: Object,
});

var map;
const positions = ref([]);
const markers = ref([]);

onMounted(() => {
  if (window.kakao && window.kakao.maps) {
    initMap();
  } else {
    // console.log(props.plan);
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
  () => props.plan.courses,
  () => {
    let attractions = props.plan.courses;
    console.log(attractions);
    positions.value = [];
    if (attractions) {
      attractions.forEach((attraction) => {
        let obj = {};
        obj.latlng = new kakao.maps.LatLng(attraction.latitude, attraction.longitude);
        obj.title = attraction.title;
        obj.zipcode = attraction.zipcode;
        obj.firstImage = attraction.firstImage;
        obj.addr1 = attraction.addr1;
        positions.value.push(obj);
      });
      loadMarkers();
    }
  },
  { deep: true }
);

function initMap() {
  console.log(`planlist${props.plan.planNo}`);
  const container = document.getElementById(`planDetails${planNo}`);
  const options = {
    center: new kakao.maps.LatLng(35.5519, 126.9918), // 지도의 중심좌표
    level: 14,
  };
  map = new kakao.maps.Map(container, options);
}

const loadMarkers = () => {
  deleteMarkers();

  markers.value = [];
  var imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";

  positions.value.forEach((position) => {
    var imageSize = new kakao.maps.Size(24, 35);
    var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

    const marker = new kakao.maps.Marker({
      map: map, // 마커를 표시할 지도
      position: position.latlng, // 마커를 표시할 위치
      clickable: false, // // 마커를 클릭했을 때 지도의 클릭 이벤트가 발생하지 않도록 설정합니다
      image: markerImage, // 마커의 이미지
    });

    markers.value.push(marker);
  });
};

const deleteMarkers = () => {
  if (markers.value.length > 0) {
    markers.value.forEach((marker) => marker.setMap(null));
  }
};
</script>

<template>
  <div :id="`planDetails${planNo}`" style="width: 100%; height: 400px"></div>
</template>

<style scoped></style>
