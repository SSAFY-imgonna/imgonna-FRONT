<script setup>
import { ref, onMounted, watch } from "vue";
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

// watch(
//   () => props.plan,
//   () => {
//     let attractions = props.plan.courses;
//     positions.value = [];
//     attractions.forEach((attraction) => {
//       console.log(attractions);
//       let obj = {};
//       obj.latlng = new kakao.maps.LatLng(attraction.latitude, attraction.longitude);
//       positions.value.push(obj);
//     });
//     loadMarkers();
//   },
//   { deep: true }
// );
const paths = ref([]);

function initMap() {
  const container = document.getElementById(`planlist${props.plan.planNo}`);
  const options = {
    center: new kakao.maps.LatLng(35.5519, 126.9918), // 지도의 중심좌표
    level: 8,
  };
  map = new kakao.maps.Map(container, options);

  let attractions = props.plan.courses;
  positions.value = [];
  paths.value = [];
  let idx = 1;

  attractions.forEach((attraction) => {
    let obj = {};
    obj.latlng = new kakao.maps.LatLng(attraction.latitude, attraction.longitude);
    obj.title = attraction.title;
    obj.zipcode = attraction.zipcode;
    obj.firstImage = attraction.firstImage;
    obj.addr1 = attraction.addr1;
    obj.markerImg = `/coursemarker/numbers${idx}.png`;
    positions.value.push(obj);
    paths.value.push(obj.latlng);
    idx++;
  });
  loadMarkers();
  drawLine();
}

const loadMarkers = () => {
  deleteMarkers();

  markers.value = [];
  positions.value.forEach((position) => {
    var imageSize = new kakao.maps.Size(15, 15);
    var markerImage = new kakao.maps.MarkerImage(position.markerImg, imageSize);

    const marker = new kakao.maps.Marker({
      map: map, // 마커를 표시할 지도
      position: position.latlng, // 마커를 표시할 위치
      title: position.title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됨.
      clickable: true, // // 마커를 클릭했을 때 지도의 클릭 이벤트가 발생하지 않도록 설정합니다
      image: markerImage, // 마커의 이미지
    });
    markers.value.push(marker);
  });

  // 4. 지도를 이동시켜주기
  // 배열.reduce( (누적값, 현재값, 인덱스, 요소)=>{ return 결과값}, 초기값);
  const bounds = positions.value.reduce(
    (bounds, position) => bounds.extend(position.latlng),
    new kakao.maps.LatLngBounds()
  );

  map.setBounds(bounds);
};

const drawLine = () => {
  var polyline = new kakao.maps.Polyline({
    map: map,
    path: paths.value,
    strokeColor: "#74b359",
    strokeOpacity: 0.8,
    strokeStyle: "solid",
  });
  polyline.setMap(map);
};

const deleteMarkers = () => {
  if (markers.value.length > 0) {
    markers.value.forEach((marker) => marker.setMap(null));
  }
};
</script>

<template>
  <div :id="`planlist${props.plan.planNo}`" style="width: 100%; height: 400px"></div>
</template>

<style scoped></style>
