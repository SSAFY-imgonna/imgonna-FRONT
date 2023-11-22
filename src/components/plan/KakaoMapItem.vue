<script setup>
import { ref, watch, onMounted } from "vue";

var map;
const positions = ref([]);
const markers = ref([]);
const overlays = ref([]);

const props = defineProps({ attraction: Object });

watch(
  () => props.attraction.value,
  () => {
    let attr = props.attraction;
    let lat = attr.latitude;
    let long = attr.longtitude;
    var moveLatLon = new kakao.maps.LatLng(lat, long);

    map.panTo(moveLatLon);

    positions.value = [];
    let obj = {};
    obj.latlng = new kakao.maps.LatLng(lat, long);
    obj.title = attr.title;
    obj.zipcode = attr.zipcode;
    obj.firstImage = attr.firstImage;
    obj.addr1 = attr.addr1;
    positions.value.push(obj);
    loadMarkers();
  },
  { deep: true }
);

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

const initMap = () => {
  const container = document.getElementById("detailsMap");
  const options = {
    center: new kakao.maps.LatLng(33.450701, 126.570667),
    level: 4,
  };
  map = new kakao.maps.Map(container, options);
};

const loadMarkers = () => {
  deleteMarkers();
  deleteOverlays();

  markers.value = [];
  overlays.value = [];
  var imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";

  positions.value.forEach((position) => {
    var imageSize = new kakao.maps.Size(24, 35);
    var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

    const marker = new kakao.maps.Marker({
      map: map, // 마커를 표시할 지도
      position: position.latlng, // 마커를 표시할 위치
      title: position.title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됨.
      clickable: true, // // 마커를 클릭했을 때 지도의 클릭 이벤트가 발생하지 않도록 설정합니다
      image: markerImage, // 마커의 이미지
    });
    markers.value.push(marker);
    function closeOverlay() {
      console.log(close);
      overlay.setMap(null);
    }
    let title = position.title;
    let image = "/img/no_image.png";
    if (position.firstImage) {
      image = position.firstImage;
    } else if (position.firstImage2) {
      image = position.firstImage2;
    }
    let addr = position.addr1;
    let tel = !position.tel ? "정보 없음" : position.tel;
    var content =
      '<div class="wrap">' +
      '    <div class="info">' +
      '        <div class="title">' +
      "            " +
      title +
      '        <div class="body">' +
      '            <div class="img">' +
      '                <img src="' +
      image +
      '" width="73" height="70">' +
      "           </div>" +
      '            <div class="desc">' +
      '                <div class="ellipsis">' +
      addr +
      "</div>" +
      '                <div class="jibun ellipsis">전화번호: ' +
      tel +
      "</div>" +
      // '<button class="button add" > 추가 </button> ' +
      "            </div>" +
      "        </div>" +
      "    </div>" +
      "</div>";

    let closeBtns = document.getElementsByClassName("close");
    for (var i = 0; i < closeBtns.length; i++) {
      closeBtns[i].addEventListener("click", closeOverlay);
    }

    var overlay = new kakao.maps.CustomOverlay({
      content: content, // 인포윈도우에 표시할 내용
      map: map, // 마커를 표시할 지도
      position: marker.getPosition(),
    });

    overlays.value.push(overlay);

    kakao.maps.event.addListener(marker, "click", function () {
      overlay.setMap(map);
    });
  });
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
  <div id="detailsMap"></div>
</template>

<style>
#map2 {
  height: 800px;
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
