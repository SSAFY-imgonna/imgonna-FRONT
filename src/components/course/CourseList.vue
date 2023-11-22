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
  sidoList.value.forEach((sido) => {
    sido.active = false;
  });
  val.active = true;

  attractionParams.value.sidoCode = val.value;
  getGugunList(
    { sido: val.value },
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
  currentPage.value = val;
  coursesParams.value.pageNo = val;
  getCourses();
};

const courseList = ref([]);

const getCourses = () => {
  // console.log(coursesParams.value);
  getCourseList(
    coursesParams.value,
    ({ data }) => {
      if (data) {
        courseList.value = data.response.body.items.item;
        console.log(courseList.value);
      }
    },
    (error) => {
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
  <section id="breadcrumbs">
    <div class="container text-center" data-aos="fade-up">
      <div class="section-heading mb-5">
        <h6>| TRAVEL COURSE</h6>
        <h3>여행 코스 살펴보기</h3>
      </div>
      <!-- <div class="breadcrumb-hero" style="padding-bottom: 0px">
          <h2>여행 코스 살펴보기</h2>
          <p>여행 코스를 살펴보세요!</p>
        </div> -->
    </div>

    <section id="portfolio" class="list">
      <div class="row">
        <div class="col-lg-12 d-flex justify-content-center" data-aos="fade-up">
          <ul id="portfolio-flters" class="mb-3">
            <!-- <li data-filter="*" class="filter-active">All</li> -->
            <li
              v-for="sido in sidoList"
              data-filter=".filter-app"
              :key="sido.value"
              :class="{ 'filter-active': sido.active }"
              @click="onChangeSido(sido)"
            >
              {{ sido.text }}
            </li>
          </ul>
        </div>
      </div>
    </section>
  </section>
  <!-- End Breadcrumbs -->
  <hr class="mb-2" style="color: #74b359; border-width: 2px" />
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

    <PageNavigation
      class="mt-3 text-align-center"
      :current-page="currentPage"
      :total-page="totalPage"
      @pageChange="onPageChange"
    />
  </div>
</template>

<style scoped>
@import "@/components/css/indexstyles.css";
.member-img img {
  width: 100%;
  height: 200px;
}
.member-info h4 {
  font-weight: 600 !important;
  margin-bottom: 5px;
  font-size: 17px !important;
  color: var(--color-secondary);
}
.filter-active {
  background-color: #74b359;
  color: #fff;
}
.section-heading h3 {
  /* font-size: 30px; */
  font-weight: 700;
  text-transform: capitalize;
  margin-top: 20px;
  line-height: 56px;
}

.section-heading h6 {
  color: #74b359;
  font-size: 20px;
  text-transform: uppercase;
  font-weight: 700;
}

.section-bg {
  background-color: white !important;
}

.img-fluid {
  border-start-start-radius: 3%;
  max-height: 250px;
}

.testimonial-content {
  height: 250px;
}

p {
  font-weight: 600;
  font-size: 13pt;
  line-height: 22pt;
}

section {
  padding: 0px !important;
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
  color: #fff;
  background: #74b359;
}

mark.purple {
  background: linear-gradient(to top, #c354ff 20%, transparent 30%);
}
</style>
