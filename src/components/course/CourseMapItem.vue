<script setup>
import { ref, watch, onMounted } from "vue";

var map;
const positions = ref([]);
const markers = ref([]);
const overlays = ref([]);

const props = defineProps({ attractions: Array });

onMounted(() => {
  if (window.kakao && window.kakao.maps) {
    initMap();
  } else {
    const script = document.createElement("script");
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${
      import.meta.env.VITE_KAKAO_MAP_SERVICE_KEY
    }&libraries=services,clusterer`;
    /* global kakao */
    script.onload = () => kakao.maps.load(() => initMap());
    document.head.appendChild(script);
  }
});
const paths = ref([]);
watch(
  () => props.attractions,
  () => {
    console.log(props.attractions);
    initMap();
  },
  { deep: true }
);

const initMap = () => {
  const container = document.getElementById("courseMap");
  const options = {
    center: new kakao.maps.LatLng(33.450701, 126.570667),
    level: 4,
  };
  map = new kakao.maps.Map(container, options);
  if (props.attractions.length != 0) {
    loadMarkers();
    drawLine();
  }
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

const loadMarkers = () => {
  positions.value = [];
  paths.value = [];
  overlays.value = [];
  let idx = 1;
  props.attractions.forEach((attraction) => {
    let obj = {};
    obj.latlng = new kakao.maps.LatLng(attraction.latitude, attraction.longitude);
    obj.title = attraction.title;
    obj.zipcode = attraction.zipcode;
    obj.firstImage = attraction.firstImage;
    obj.addr1 = attraction.addr1;
    obj.contentTypeId = attraction.contentTypeId;
    obj.markerImg = `/coursemarker/numbers${idx}.png`;
    positions.value.push(obj);
    paths.value.push(obj.latlng);
    idx++;
  });

  // 현재 표시되어있는 marker들이 있다면 map에 등록된 marker를 제거한다.
  deleteMarkers();
  deleteOverlays();

  // 마커 이미지를 생성합니다
  //   const imgSrc = require("@/assets/map/markerStar.png");
  // 마커 이미지의 이미지 크기 입니다
  //   const imgSize = new kakao.maps.Size(24, 35);
  //   const markerImage = new kakao.maps.MarkerImage(imgSrc, imgSize);

  // 마커를 생성합니다
  markers.value = [];
  overlays.value = [];

  positions.value.forEach((position) => {
    var imageSize = new kakao.maps.Size(20, 20);
    var markerImage = new kakao.maps.MarkerImage(position.markerImg, imageSize);

    const marker = new kakao.maps.Marker({
      map: map, // 마커를 표시할 지도
      position: position.latlng, // 마커를 표시할 위치
      title: position.title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됨.
      clickable: true, // // 마커를 클릭했을 때 지도의 클릭 이벤트가 발생하지 않도록 설정합니다
      image: markerImage, // 마커의 이미지
    });
    markers.value.push(marker);

    var content =
      '<div class="customoverlay">' +
      "  <a >" +
      `    <span class="title">${position.title}</span>` +
      "  </a>" +
      "</div>";

    // 마커에 표시할 인포윈도우를 생성합니다
    var overlay = new kakao.maps.CustomOverlay({
      content: content, // 인포윈도우에 표시할 내용
      map: map, // 마커를 표시할 지도
      position: marker.getPosition(),
      yAnchor: 1,
    });

    // overlay.setMap(null);

    // overlays.value.push(overlay);

    // kakao.maps.event.addListener(marker, "mouseover", makeOverListener(map, marker, overlay));
    // kakao.maps.event.addListener(marker, "mouseout", makeOutListener(overlay));

    // 커스텀오버레이를 표시하는 함수입니다
    function makeOverListener(map, marker, overlay) {
      return function () {
        overlay.setMap(map);
      };
    }

    // 커스텀오버레이를 닫는 함수입니다
    function makeOutListener(overlay) {
      return function () {
        overlay.setMap(null);
      };
    }
  });

  // 4. 지도를 이동시켜주기
  // 배열.reduce( (누적값, 현재값, 인덱스, 요소)=>{ return 결과값}, 초기값);
  // const bounds = positions.value.reduce(
  //   (bounds, position) => bounds.extend(position.latlng),
  //   new kakao.maps.LatLngBounds()
  // );
  const bounds = positions.value.reduce(
    (bounds, position) => bounds.extend(position.latlng),
    new kakao.maps.LatLngBounds()
  );

  map.setBounds(bounds);
};

const deleteMarkers = () => {
  if (markers.value.length > 0) {
    markers.value.forEach((marker) => marker.setMap(null));
  }
};

const deleteOverlays = () => {
  if (overlays.value.length > 0) {
    overlays.value.forEach((overlay) => overlay.setMap(null));
  }
};
</script>

<template>
  <div id="courseMap"></div>
</template>

<style>
.customoverlay {
  position: relative;
  bottom: 45px;
  border-radius: 6px;
  border: 1px solid #ccc;
  border-bottom: 2px solid #ddd;
  float: left;
}
.customoverlay:nth-of-type(n) {
  border: 0;
  box-shadow: 0px 1px 2px #888;
}
.customoverlay a {
  display: block;
  text-decoration: none;
  color: #000;
  text-align: center;
  border-radius: 6px;
  font-size: 14px;
  font-weight: bold;
  overflow: hidden;
  background: #74b359;
  background: #74b359 no-repeat right 14px center;
}
.customoverlay .title {
  display: block;
  text-align: center;
  background: #fff;
  margin-right: 25px;
  padding: 5px 5px;
  font-size: 12px;
  font-weight: bold;
}
.customoverlay:after {
  content: "";
  position: absolute;
  margin-left: -12px;
  left: 50%;
  bottom: -12px;
  width: 22px;
  height: 12px;
  background: url("https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/vertex_white.png");
}

#courseMap {
  height: 350px;
}
.wrap {
  position: absolute;
  left: 0;
  bottom: 40px;
  width: 288px;
  height: 132px;
  margin-left: -144px;
  text-align: left;
  overflow: hidden;
  font-size: 12px;
  font-family: "Malgun Gothic", dotum, "돋움", sans-serif;
  line-height: 1.5;
}
.wrap * {
  padding: 0;
  margin: 0;
}
.wrap .info {
  width: 286px;
  height: 120px;
  border-radius: 5px;
  border-bottom: 2px solid #ccc;
  border-right: 1px solid #ccc;
  overflow: hidden;
  background: #fff;
}
.wrap .info:nth-child(1) {
  border: 0;
  box-shadow: 0px 1px 2px #888;
}
.info .title {
  padding: 5px 0 0 10px;
  height: 30px;
  background: #eee;
  border-bottom: 1px solid #ddd;
  font-size: 18px;
  font-weight: bold;
}
.info .close {
  position: absolute;
  top: 10px;
  right: 10px;
  color: #888;
  width: 17px;
  height: 17px;
  background: url("https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/overlay_close.png");
}
.info .close:hover {
  cursor: pointer;
}
.info .body {
  position: relative;
  overflow: hidden;
}
.info .desc {
  position: relative;
  margin: 13px 0 0 90px;
  height: 75px;
}
.desc .ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.desc .jibun {
  font-size: 11px;
  color: #888;
  margin-top: -2px;
}
.info .img {
  position: absolute;
  top: 6px;
  left: 5px;
  width: 73px;
  height: 71px;
  border: 1px solid #ddd;
  color: #888;
  overflow: hidden;
}
.info:after {
  content: "";
  position: absolute;
  margin-left: -12px;
  left: 50%;
  bottom: 0;
  width: 22px;
  height: 12px;
  background: url("https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/vertex_white.png");
}
.info .link {
  color: #5085bb;
}
</style>
