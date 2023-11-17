<script setup>
import { storeToRefs } from "pinia";
import { useMemberStore } from "@/stores/member";
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getAttractionList, createDiary } from "@/api/diary";
import Swal from "sweetalert2";

const memberStore = useMemberStore();
const { userInfo } = storeToRefs(memberStore);
const member = ref(userInfo);

const router = useRouter();
const route = useRoute();

const props = defineProps({ type: String });

const attractions = ref([]);

const diary = ref({
  travelTime: "",
  attactionName: "",
  id: "",
  contentId: "",
  title: "",
  content: "",
  createdTime: "",
  weather: "",
  emotion: "",
  upfile: "",
  isPublic: false,
});

const showWarning = (text) => {
  Swal.fire({
    icon: "warning",
    text: text,
  });
};

function writeDiary() {
  if (!diary.value.travelTime) {
    showWarning("날짜는 필수 입력값입니다!");
  } else if (!diary.value.title) {
    showWarning("제목은 필수 입력값입니다!");
  } else if (!diary.value.content) {
    showWarning("내용은 필수 입력값입니다!");
  } else if (!diary.value.weather) {
    showWarning("날씨는 필수 입력값입니다!");
    return;
  } else if (!diary.value.emotion) {
    showWarning("만족도는 필수 입력값입니다!");
    return;
  } else {
    if (member.value != null) {
      diary.value.id = member.value.id;
    }
    console.log("글등록하자!!", diary.value);
    const formData = new FormData();

    formData.append("travelTime", diary.value.travelTime);
    formData.append("attactionName", diary.value.attactionName);
    formData.append("id", diary.value.id);
    formData.append("contentId", diary.value.contentId);
    formData.append("title", diary.value.title);
    formData.append("content", diary.value.content);
    formData.append("weather", diary.value.weather);
    formData.append("emotion", diary.value.emotion);
    if (diary.value.isPublic == true) {
      formData.append("isPublic", 1);
    } else {
      formData.append("isPublic", 0);
    }

    const upfileInput = document.getElementById("upfile");
    console.log(upfileInput.files[0]);
    if (upfileInput.files.length > 0) {
      // 업로드할 파일이 존재하면, formData에 추가함
      formData.append("upfile", upfileInput.files[0]);
    }
    console.log(formData);
    // API 통신
    createDiary(
      formData,
      ({ data }) => {
        console.log(data);
        alert("글 작성이 완료되었습니다.");
        router.push({ name: "diary-list" });
      },
      (error) => {
        console.log(error);
      }
    );
  }
}

function findAttraction() {
  if (diary.value.attactionName.length == 0) {
    return;
  }
  getAttractionList(
    diary.value.attactionName,
    ({ data }) => {
      console.log(data);
      attractions.value = data;
      console.log(attractions.value);
    },
    (error) => {
      console.log(error);
    }
  );
}

function setAttractionInfo(contentId, title) {
  console.log(contentId, title);
  diary.value.contentId = contentId;
  diary.value.attactionName = title;
  console.log(diary.value);

  const closeBtn = document.querySelector(".btn-close");
  console.log(closeBtn);
  closeBtn.click();
}

// 날씨 선택 관련 처리
const sun = ref(false);
const cloud = ref(false);
const rain = ref(false);
const lightning = ref(false);
const snow = ref(false);
function selectWeather(weather) {
  sun.value = false;
  cloud.value = false;
  rain.value = false;
  lightning.value = false;
  snow.value = false;

  if (weather == "sun") {
    sun.value = true;
    diary.value.weather = "sun";
  } else if (weather == "cloud") {
    cloud.value = true;
    diary.value.weather = "cloud";
  } else if (weather == "rain") {
    rain.value = true;
    diary.value.weather = "rain";
  } else if (weather == "lightning") {
    lightning.value = true;
    diary.value.weather = "lightning";
  } else if (weather == "snow") {
    snow.value = true;
    diary.value.weather = "snow";
  }
  console.log(weather);
}

// 표정 선택 관련 처리
const fun = ref(false);
const great = ref(false);
const soso = ref(false);
const bad = ref(false);
const angry = ref(false);
function selectEmotion(emotion) {
  fun.value = false;
  great.value = false;
  soso.value = false;
  bad.value = false;
  angry.value = false;

  if (emotion == "fun") {
    fun.value = true;
    diary.value.emotion = "fun";
  } else if (emotion == "great") {
    great.value = true;
    diary.value.emotion = "great";
  } else if (emotion == "soso") {
    soso.value = true;
    diary.value.emotion = "soso";
  } else if (emotion == "bad") {
    bad.value = true;
    diary.value.emotion = "bad";
  } else if (emotion == "angry") {
    angry.value = true;
    diary.value.emotion = "angry";
  }
  console.log(emotion);
}
</script>

<template>
  <form id="contact-form" method="post" enctype="multipart/form-data" @submit.prevent="onSubmit">
    <div class="row">
      <div class="col-lg-6">
        <fieldset>
          <label for="name">관광지</label>
          <span class="search-input-container">
            <input
              type="text"
              name="name"
              id="name"
              placeholder="관광지.."
              autocomplete="on"
              v-model="diary.attactionName"
            />
            <i
              class="bi bi-search"
              @click="findAttraction"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasExample"
              aria-controls="offcanvasExample"
            ></i>
          </span>
        </fieldset>
      </div>
      <div
        class="offcanvas offcanvas-start"
        tabindex="-1"
        id="offcanvasExample"
        aria-labelledby="offcanvasExampleLabel"
      >
        <div class="offcanvas-header">
          <h5 class="offcanvas-title" id="offcanvasExampleLabel">관광지 검색 결과</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div class="offcanvas-body">
          <div
            class="card mb-3 attraction-info"
            v-for="attraction in attractions"
            :key="attraction.contentId"
            style="max-width: 540px"
            @click="setAttractionInfo(attraction.contentId, attraction.title)"
          >
            <div class="row g-0" v-if="attraction">
              <div class="col-md-4">
                <img
                  v-if="attraction.firstImage && attraction.firstImage.length > 0"
                  :src="attraction.firstImage"
                  class="img-fluid rounded-start"
                  alt="..."
                />
                <img
                  v-else-if="attraction.firstImage2 && attraction.firstImage2.length > 0"
                  :src="attraction.firstImage"
                  class="img-fluid rounded-start"
                  alt="..."
                />
                <img v-else src="/img/no_image.png" class="img-fluid rounded-start" alt="..." />
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h5 class="card-title">
                    <b>{{ attraction.title }}</b>
                  </h5>
                  <p class="card-text">{{ attraction.addr1 }} {{ attraction.addr2 }}</p>
                  <!-- <p class="card-text">
                            <small class="text-body-secondary">{{ attraction.tel }}</small>
                          </p> -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-6">
        <fieldset>
          <label for="name">날짜</label>
          <input
            type="date"
            name="name"
            id="name"
            placeholder="날짜..."
            autocomplete="on"
            v-model="diary.travelTime"
          />
        </fieldset>
      </div>
      <div class="col-lg-6">
        <fieldset>
          <label for="email">날씨</label>
          <div class="weather">
            <i
              class="bi bi-sun"
              :class="{ 'weather-color': sun }"
              @click="selectWeather('sun')"
            ></i>
            <i
              class="bi bi-clouds"
              :class="{ 'weather-color': cloud }"
              @click="selectWeather('cloud')"
            ></i>
            <i
              class="bi bi-cloud-rain-heavy"
              :class="{ 'weather-color': rain }"
              @click="selectWeather('rain')"
            ></i>
            <i
              class="bi bi-cloud-lightning-rain"
              :class="{ 'weather-color': lightning }"
              @click="selectWeather('lightning')"
            ></i>
            <i
              class="bi bi-cloud-snow"
              :class="{ 'weather-color': snow }"
              @click="selectWeather('snow')"
            ></i>
          </div>
        </fieldset>
      </div>
      <div class="col-lg-6">
        <fieldset>
          <label for="email">만족도</label>
          <div class="emotion">
            <i
              class="bi bi-emoji-grin"
              :class="{ 'emotion-color': fun }"
              @click="selectEmotion('fun')"
            ></i>
            <i
              class="bi bi-emoji-smile"
              :class="{ 'emotion-color': great }"
              @click="selectEmotion('great')"
            ></i>
            <i
              class="bi bi-emoji-neutral"
              :class="{ 'emotion-color': soso }"
              @click="selectEmotion('soso')"
            ></i>
            <i
              class="bi bi-emoji-frown"
              :class="{ 'emotion-color': bad }"
              @click="selectEmotion('bad')"
            ></i>
            <i
              class="bi bi-emoji-angry"
              :class="{ 'emotion-color': angry }"
              @click="selectEmotion('angry')"
            ></i>
          </div>
        </fieldset>
      </div>
      <div class="col-lg-12">
        <fieldset>
          <label for="subject">제목</label>
          <input
            type="subject"
            name="subject"
            id="subject"
            placeholder="제목..."
            autocomplete="on"
            v-model="diary.title"
          />
        </fieldset>
      </div>
      <div class="col-lg-12">
        <fieldset>
          <label for="message">내용</label>
          <textarea
            name="message"
            id="message"
            placeholder="내용"
            v-model="diary.content"
          ></textarea>
        </fieldset>
      </div>

      <div class="col-12">
        <fieldset>
          <label for="upfile">사진</label>
          <input class="form-control" type="file" id="upfile" name="upfile" accept="image/*" />
        </fieldset>
      </div>

      <div class="col-lg-12 mb-3">
        <fieldset>
          <label for="message">공개여부</label>
          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="radio"
              name="inlineRadioOptions"
              id="inlineRadio1"
              value="public"
              checked
              v-model="diary.isPublic"
            />
            <label class="form-check-label" for="inlineRadio1">공개</label>
          </div>
          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="radio"
              name="inlineRadioOptions"
              id="inlineRadio2"
              value="notPublic"
              v-model="diary.isPublic"
            />
            <label class="form-check-label" for="inlineRadio2">비공개</label>
          </div>
        </fieldset>
      </div>
      <div class="col-lg-12">
        <fieldset>
          <button type="submit" id="form-submit" class="orange-button" @click="writeDiary">
            작성하기
          </button>
        </fieldset>
      </div>
    </div>
  </form>
</template>

<style scoped>
/* 관광지 검색 */
.attraction-info {
  cursor: pointer;
  transition: transform 0.5s ease; /* 트랜지션 효과를 추가하여 부드러운 변화를 만듦 */
}
.attraction-info:hover {
  cursor: pointer;
  border: 3px solid #74b359;
  transform: scale(1.05); /* 10% 확대 */
}
.attraction-info div img {
  width: 130px !important;
  height: 130px !important;
}

/* 날씨 */
.weather-color {
  color: #74b359;
}
.weather {
  font-size: 23pt;
  margin-bottom: 30px;
}
.weather i {
  margin-right: 40px;
}

/* 만족도 */
.emotion-color {
  color: #74b359;
}
.emotion {
  font-size: 23pt;
  margin-bottom: 30px;
}
.emotion i {
  margin-right: 40px;
}
/*  */
.contact-content #contact-form .offcanvas-header button {
  background-color: white;
}
.contact-content #contact-form .offcanvas-header button:hover {
  background-color: #74b359;
}

.offcanvas {
  top: 90px;
}

.bi-search {
  margin-right: 10px;
  font-size: 15pt;
}
.search-container {
  display: flex;
  align-items: center;
}

.search-input-container {
  position: relative;
}

.search-input-container input {
  padding-right: 30px; /* 아이콘을 오른쪽에 배치하기 위한 여유 공간 */
}

.search-input-container i {
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  cursor: pointer;
}
/* Extras */
a:visited {
  color: #888;
}
a {
  color: #999;
  text-decoration: none;
}
p {
  margin-bottom: 0.3em;
}

/*  */
/* @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900"); */

* {
  font-family: "Poppins", sans-serif;
}

i:hover {
  color: #74b359;
  cursor: pointer;
}

i:active {
  /* font-size: 30pt; */
  color: #74b359;
}
/*
---------------------------------------------
Contact Style
---------------------------------------------
*/

.contact {
  background-image: url(../images/contact-bg.jpg);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  padding: 100px 0px 250px 0px;
  position: relative;
}

.contact .section-heading h2 {
  color: #fff;
}

.contact-content {
  margin-top: -240px;
  position: relative;
  z-index: 1;
}

.contact-content #map {
  border-radius: 10px;
  margin-bottom: 60px;
}

.contact-content .item {
  border-radius: 10px;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.15);
  padding: 35px 30px;
  background-color: #fff;
}

.contact-content .phone {
  margin-right: 15px;
}

.contact-content .email {
  margin-left: 15px;
}

.contact-content .item img {
  float: left;
  margin-right: 25px;
  vertical-align: middle;
}

.contact-content .item h6 {
  font-size: 20px;
  font-weight: 600;
  vertical-align: middle;
}

.contact-content .item h6 span {
  font-size: 15px;
  color: #aaaaaa;
  font-weight: 400;
}

.contact-content #contact-form {
  /* margin-left: 30px; */
  border-radius: 10px;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.15);
  padding: 35px 30px;
  background-color: #fff;
}

.contact-content #contact-form label {
  font-size: 15px;
  color: #3a3a3a;
  margin-bottom: 15px;
}

.contact-content #contact-form input[type="text"],
.contact-content #contact-form input[type="date"],
.contact-content #contact-form input[type="subject"] {
  width: 100%;
  height: 44px;
  border-radius: 22px;
  background-color: #f6f6f6;
  border: none;
  margin-bottom: 30px;
  font-size: 14px;
  padding: 0px 15px;
}

.contact-content #contact-form input[type="file"] {
  width: 100%;
  height: 37px;
  margin-bottom: 30px;
  border-radius: 22px;
  background-color: #f6f6f6;
  font-size: 16px;
  border: none;
}
/* .contact-content #contact-form input[type="file"] {
  width: 100%;
  border-radius: 22px;
  background-color: #f6f6f6;
  border: none;
  margin-bottom: 30px;
  font-size: 15px;
  padding: 0px 15px;
} */

.contact-content #contact-form .form-check-input {
  margin-left: 0px;
  margin-right: 5px;
}

.contact-content #contact-form textarea {
  width: 100%;
  height: 150px;
  max-height: 500px;
  min-height: 50px;
  border-radius: 22px;
  background-color: #f6f6f6;
  border: none;
  margin-bottom: 40px;
  font-size: 14px;
  padding: 15px 15px;
}

.contact-content #contact-form button {
  background-color: #1e1e1e;
  height: 44px;
  border-radius: 22px;
  padding: 0px 20px;
  color: #fff;
  border: none;
  font-size: 15px;
  font-weight: 500;
  transition: all 0.5s;
}

.contact-content #contact-form button:hover {
  background-color: #74b359;
}
</style>
