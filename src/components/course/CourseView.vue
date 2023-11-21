<script setup>
import { ref, onMounted, watch, nextTick } from "vue";
import { getCourse, getCourseDetailIntro, getCourseDetailInfo } from "@/api/attraction";
import { useRoute, useRouter } from "vue-router";
import CourseTimelineItem from "./CourseTimelineItem.vue";

// const serviceKey = import.meta.env.VITE_OPEN_API_SERVICE_KEY;
const { VITE_OPEN_API_SERVICE_KEY } = import.meta.env;

const route = useRoute();

const contentId = route.params.contentId;

onMounted(() => {
  getCourseByContentId();
  getCourseDetailIntroByContentId();
  getCourseDetailInfoByContentId();
});

const course = ref({});
const courseDetail = ref({});

const courseParams = ref({
  ServiceKey: VITE_OPEN_API_SERVICE_KEY,
  contentTypeId: 25,
  contentId: "",
  MobileOS: "ETC",
  MobileApp: "AppTest",
  defaultYN: "Y",
  firstImageYN: "Y",
  areacodeYN: "Y",
  catcodeYN: "Y",
  addrinfoYN: "Y",
  mapinfoYN: "Y",
  overviewYN: "Y",
  _type: "json",
});

const detailsParams = ref({
  ServiceKey: VITE_OPEN_API_SERVICE_KEY,
  contentTypeId: 25,
  contentId: "",
  MobileOS: "ETC",
  MobileApp: "AppTest",
  _type: "json",
});

const getCourseByContentId = () => {
  courseParams.value.contentId = contentId;
  getCourse(
    courseParams.value,
    ({ data }) => {
      course.value = data.response.body.items.item[0];
      console.log(course.value);
    },
    (error) => {
      console.log(error);
      course.value = error.data.response.body.items.item[0];
      console.log(course.value);
    }
  );
};

const getCourseDetailInfoByContentId = () => {
  detailsParams.value.contentId = contentId;
  getCourseDetailInfo(
    detailsParams.value,
    ({ data }) => {
      let attractions = data.response.body.items.item;
      courseDetail.value.attractions = attractions;
      console.log(courseDetail.value);
    },
    (error) => {
      let attractions = error.data.response.body.items.item;
      courseDetail.value.attractions = attractions;
      console.log(courseDetail.value);
    }
  );
};

const getCourseDetailIntroByContentId = () => {
  detailsParams.value.contentId = contentId;
  getCourseDetailIntro(
    detailsParams.value,
    ({ data }) => {
      let intro = data.response.body.items.item[0];
      courseDetail.value.distance = intro.distance;
      courseDetail.value.taketime = intro.taketime;

      console.log(courseDetail.value);
    },
    (error) => {
      let intro = error.data.response.body.items.item[0];
      courseDetail.value.distance = intro.distance;
      courseDetail.value.taketime = intro.taketime;
    }
  );
};
</script>

<template>
  <section id="testimonials" class="testimonials section-bg">
    <div class="container text-center" data-aos="fade-up">
      <div class="section-header">
        <p>{{ course.title }}</p>
      </div>

      <div class="testimonial-item">
        <div class="row gy-4 mb-5 justify-content-center">
          <div class="col-lg-4 text-center">
            <img :src="course.firstimage" class="img-fluid" alt="" />
          </div>
          <div class="col-lg-6">
            <div class="testimonial-content">
              <p>
                <i class="bi bi-quote quote-icon-left"></i>
                {{ course.overview }}
                <i class="bi bi-quote quote-icon-right"></i>
              </p>
              <h3>{{ courseDetail.distance }} - {{ courseDetail.taketime }}</h3>
              <!-- <h4>Ceo &amp; Founder</h4> -->
              <div class="stars">
                <i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i
                ><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i
                ><i class="bi bi-star-fill"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <CourseTimelineItem :courses="courseDetail.attractions" />
    </div>
    <!-- End testimonial item -->
  </section>
</template>

<style scoped></style>
