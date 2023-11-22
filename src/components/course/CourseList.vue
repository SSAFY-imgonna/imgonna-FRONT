<script setup>
import { ref, onMounted, watch, nextTick } from "vue";
import { getAttractionList, getSidoList, getGugunList } from "@/api/attraction";
import { getCourseList, getCourse } from "@/api/attraction";
import { useRoute, useRouter } from "vue-router";
import PageNavigation from "@/components/common/PageNavigation.vue";

// const serviceKey = import.meta.env.VITE_OPEN_API_SERVICE_KEY;
const { VITE_OPEN_API_SERVICE_KEY } = import.meta.env;

const sidoList = ref([]);
const gugunList = ref([]);
const router = useRouter();

const attractions = ref([]);

const currentPage = ref(1);
const totalPage = ref(10);

const attractionParams = ref({
  sidoCode: 0,
  gugunCode: 0,
  contentTypeId: 25,
});

onMounted(() => {
  loadSidoList();
  getCourses();
});

const loadSidoList = () => {
  getSidoList(
    ({ data }) => {
      let options = [];
      data.forEach((sido) => {
        options.push({ text: sido.sidoName, value: sido.sidoCode });
      });
      sidoList.value = options;
    },
    (err) => {
      console.log(err);
    }
  );
};

const getSidoName = (areaCode) => {
  return sidoList.value.filter((sido) => sido.value == areaCode);
};

const onChangeSido = (val) => {
  attractionParams.value.sidoCode = val;
  getGugunList(
    { sido: val },
    ({ data }) => {
      let options = [];
      data.forEach((gugun) => {
        options.push({ text: gugun.gugunName, value: gugun.gugunCode });
      });
      gugunList.value = options;
    },
    (err) => {
      console.log(err);
    }
  );
};

const onChangeGugun = (val) => {
  attractionParams.value.gugunCode = val;
  console.log(attractionParams.value);

  getAttractionList(
    attractionParams.value,
    ({ data }) => {
      attractions.value = data;
    },
    (err) => {
      console.log(err);
    }
  );
};

const onChangeContents = (val) => {
  attractionParams.value.contentTypeId = val;
  console.log(attractionParams.value);
  getAttractionList(
    attractionParams.value,
    ({ data }) => {
      attractions.value = data;
    },
    (err) => {
      console.log(err);
    }
  );
};

const coursesParams = ref({
  ServiceKey: VITE_OPEN_API_SERVICE_KEY,
  numOfRows: "12",
  pageNo: currentPage.value,
  MobileOS: "ETC",
  MobileApp: "AppTest",
  listYN: "Y",
  arrange: "A",
  contentTypeId: 25,
  areaCode: "",
  sigunguCode: "",
  cat1: "C01",
  cat2: "",
  cat3: "",
  _type: "json",
});

const onPageChange = (val) => {
  console.log(val + "번 페이지로 이동 준비 끝!!!");
  currentPage.value = val;
  coursesParams.value.pageNo = val;
  getCourses();
};

const courseList = ref([]);

const getCourses = () => {
  console.log(coursesParams.value);
  getCourseList(
    coursesParams.value,
    ({ data }) => {
      console.log(data);
      courseList.value = data.response.body.items.item;

      console.log(courseList.value);
    },
    (error) => {
      console.log(error);
      if (error.data) {
        courseList.value = error.data.response.body.items.item;
        console.log(courseList.value);
      }
    }
  );
};

const getCourseByContentId = (contentId) => {
  router.push({ name: "course-view", params: { contentId: contentId } });
};
</script>

<template>
  <!-- ======= Breadcrumbs ======= -->
  <section id="breadcrumbs" class="breadcrumbs">
    <div class="breadcrumb-hero">
      <div class="container">
        <div class="breadcrumb-hero" style="padding-bottom: 0px">
          <h2>여행 코스 살펴보기</h2>
          <p>여행 코스를 살펴보세요!</p>
        </div>
      </div>
    </div>

    <section id="portfolio" class="list" style="background: #94c045">
      <div class="row">
        <div class="col-lg-12 d-flex justify-content-center" data-aos="fade-up">
          <ul id="portfolio-flters">
            <!-- <li data-filter="*" class="filter-active">All</li> -->
            <li
              v-for="sido in sidoList"
              data-filter=".filter-app"
              @click="onChangeSido(sido.value)"
            >
              {{ sido.text }}
            </li>
          </ul>
        </div>
      </div>
    </section>
  </section>
  <!-- End Breadcrumbs -->

  <section id="portfolio" class="portfolio">
    <div class="container">
      <div class="row">
        <div class="col-lg-12 d-flex justify-content-center" data-aos="fade-up">
          <ul id="portfolio-flters">
            <!-- <li data-filter="*" class="filter-active">All</li> -->
            <li
              v-for="gugun in gugunList"
              data-filter=".filter-app"
              @click="onChangeGugun(gugun.value)"
            >
              {{ gugun.text }}
            </li>
            <!-- <li
              v-for="content in contentsList"
              data-filter=".filter-app"
              @click="onChangeContents(content.value)"
            >
              #{{ content.text }}
            </li> -->
          </ul>
        </div>
      </div>
    </div>
  </section>

  <div class="container">
    <section id="chefs" class="chefs section-bg">
      <div class="container" data-aos="fade-up">
        <div class="row gy-4">
          <div
            class="col-lg-3 col-md-4 d-flex align-items-stretch"
            data-aos="fade-up"
            data-aos-delay="100"
            v-for="course in courseList"
            @click="getCourseByContentId(course.contentid)"
          >
            <div class="chef-member m-2" style="width: 100%">
              <div class="member-img">
                <img v-if="course.firstimage" :src="course.firstimage" alt="" class="img-fluid" />
                <img v-else-if="course.firstimage2" :src="course.firstimage2" class="img-fluid" />
                <img v-else src="/no_image.png" alt="" class="img-fluid" width="180" />
                <!-- <div class="social">
                  <a href=""><i class="bi bi-twitter"></i></a>
                  <a href=""><i class="bi bi-facebook"></i></a>
                  <a href=""><i class="bi bi-instagram"></i></a>
                  <a href=""><i class="bi bi-linkedin"></i></a>
                </div> -->
              </div>
              <div class="member-info">
                <h4>{{ course.title }}</h4>
                <span>{{ getSidoName(course.areaCode).text }}</span>
                <!-- <p>
                Velit aut quia fugit et et. Dolorum ea voluptate vel tempore tenetur ipsa quae aut.
                Ipsum exercitationem iure minima enim corporis et voluptate.
              </p> -->
              </div>
            </div>
          </div>
          <!-- End Chefs Member -->
        </div>
      </div>
    </section>
  </div>

  <PageNavigation :current-page="currentPage" :total-page="totalPage" @pageChange="onPageChange" />
</template>

<style scoped>
@import "@/components/css/indexstyles.css";
section {
  padding: 20px;
}
.list #portfolio-flters li {
  cursor: pointer;
  display: inline-block;
  padding: 8px 15px 10px 15px;
  font-size: 14px;
  font-weight: 600;
  line-height: 1;
  color: #444444;
  transition: all 0.3s ease-in-out;
  border-radius: 3px;
}

.list #portfolio-flters li:hover,
.list #portfolio-flters li.filter-active {
  color: #444444;
  background: #fff;
}

mark.purple {
  background: linear-gradient(to top, #c354ff 20%, transparent 30%);
}
</style>
