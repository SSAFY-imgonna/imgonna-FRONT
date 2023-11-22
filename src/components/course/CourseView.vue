<script setup>
import { ref, onMounted, watch, nextTick } from "vue";
import {
  getCourse,
  getCourseDetailIntro,
  getCourseDetailInfo,
  getAttractionInfoList,
} from "@/api/attraction";
import { useRoute, useRouter } from "vue-router";
import CourseTimelineItem from "./CourseTimelineItem.vue";
import { storeToRefs } from "pinia";
import { usePlanStore } from "@/stores/plan";
import Swal from "sweetalert2";
const planStore = usePlanStore();

// const serviceKey = import.meta.env.VITE_OPEN_API_SERVICE_KEY;
const { VITE_OPEN_API_SERVICE_KEY } = import.meta.env;

const route = useRoute();
const router = useRouter();

const contentId = route.params.contentId;

onMounted(() => {
  getCourseByContentId();
  // getCourseDetailIntroByContentId();
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
      if (data) {
        course.value = data.response.body.items.item[0];
      }
    },
    (error) => {
      if (error.data) {
        console.log(error);
        course.value = error.data.response.body.items.item[0];
      }
    }
  );
};

const getCourseDetailInfoByContentId = () => {
  detailsParams.value.contentId = contentId;
  getCourseDetailInfo(
    detailsParams.value,
    ({ data }) => {
      if (data) {
        let attractions = data.response.body.items.item;
        let attractionList = [];
        for (var i = 0; i < attractions.length; i++) {
          let attraction = {};
          attraction.firstImage = attractions[i].subdetailimg;
          attraction.firstImage2 = "";
          attraction.title = attractions[i].subname;
          attraction.addr1 = "";
          attraction.addr2 = "";
          attraction.subcontentid = attractions[i].subcontentid;
          attraction.subdetailoverview = attractions[i].subdetailoverview;
          attractionList.push(attraction);
        }
        courseDetail.value.attractions = attractionList;
      }
    },
    (error) => {
      if (error.data) {
        let attractions = error.data.response.body.items.item;
        let attractionList = [];
        for (var i = 0; i < attractions.length; i++) {
          attractionList.push(attractions[i].subcontentid);
        }
        getCourseDetailList(attractionList);
      }
    }
  );
};

const courseDetailList = ref([]);

const getCourseDetailList = (attractions) => {
  getAttractionInfoList(
    attractions,
    ({ data }) => {
      if (data) {
        courseDetailList.value = data;
        updatePlans(courseDetailList.value);
      }
    },
    (error) => {}
  );
};
const getCourseDetailIntroByContentId = () => {
  detailsParams.value.contentId = contentId;
  getCourseDetailIntro(
    detailsParams.value,
    ({ data }) => {
      if (data) {
        let intro = data.response.body.items.item[0];
        courseDetail.value.distance = intro.distance;
        courseDetail.value.taketime = intro.taketime;
      }
    },
    (error) => {
      if (error.data) {
        let intro = error.data.response.body.items.item[0];
        courseDetail.value.distance = intro.distance;
        courseDetail.value.taketime = intro.taketime;
      }
    }
  );
};

const { updatePlans, deletePlans } = planStore;

const setCourses = () => {
  deletePlans();
  let attractionList = [];
  for (var i = 0; i < courseDetail.value.attractions.length; i++) {
    attractionList.push(courseDetail.value.attractions[i].subcontentid);
  }
  getCourseDetailList(attractionList);

  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });
  swalWithBootstrapButtons
    .fire({
      title: "코스 담기 완료",
      text: "방금 담은 코스를 바로 편집할 수 있습니다!",
      icon: "success",
      showCancelButton: true,
      confirmButtonText: "바로 편집하러 가기",
      cancelButtonText: "코스 담기 취소",
      reverseButtons: false,
    })
    .then((result) => {
      if (result.isConfirmed) {
        router.push({ name: "plan-write" });
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        deletePlans();

        swalWithBootstrapButtons.fire({
          title: "코스 담기 취소 완료",
          // text: "Your imaginary file is safe :)",
          icon: "success",
        });
      }
    });

  // Swal.fire({
  //   title: "",
  //   text: "방금 담은 코스를 바로 편집할 수 있습니다!",
  //   icon: "success",
  //   showCancelButton: true,
  //   confirmButtonColor: "#3085d6",
  //   cancelButtonColor: "#d33",
  //   confirmButtonText: "바로 편집하러 가기",
  // }).then((result) => {
  //   if (result.isConfirmed) {
  //     Swal.fire({
  //       title: "코스 담기 취소",
  //       text: "Your file has been deleted.",
  //       icon: "success",
  //     });
  //   }
  // });

  // Swal.fire({
  //   icon: "success",
  //   title: "코스 담기 완료",
  // });
};
</script>

<template>
  <section id="testimonials" class="testimonials section-bg">
    <div class="container text-center" data-aos="fade-up">
      <div class="section-heading">
        <h6>| TRAVEL COURSE</h6>
        <h3>{{ course.title }}</h3>
      </div>

      <div class="testimonial-item mt-5">
        <div class="row gy-4 mb-5 justify-content-center">
          <div class="col-lg-4 text-center">
            <img :src="course.firstimage" class="img-fluid" alt="" />
          </div>
          <div class="col-lg-6">
            <div class="testimonial-content">
              <i class="bi bi-quote quote-icon-left mb-0"></i>
              <p class="mb-0 text-content">
                {{ course.overview }}
              </p>
              <i class="bi bi-quote quote-icon-right mt-0"></i>
              <h3>{{ courseDetail.distance }} - {{ courseDetail.taketime }}</h3>
              <!-- <h4>Ceo &amp; Founder</h4> -->
              <!-- <div class="stars">
                <i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i
                ><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i
                ><i class="bi bi-star-fill"></i>
              </div> -->
              <button class="btn btn-sm btn-dark mt-2" @click="setCourses">코스 담기</button>
            </div>
          </div>
        </div>
      </div>
      <CourseTimelineItem :courses="courseDetail.attractions" />
    </div>
    <!-- End testimonial item -->
  </section>
</template>

<style scoped>
.testimonials .testimonial-item .quote-icon-left {
  display: inline-block;
  left: 0px;
  position: relative;
}
.testimonials .testimonial-item .quote-icon-right {
  display: inline-block;
  right: 0px;
  position: relative;
  top: 10px;
  transform: scale(-1, -1);
}
i.quote-icon-right {
  line-height: 0;
  padding: 0 !important;
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
  background-color: white;
}

.img-fluid {
  border-radius: 3%;
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
</style>
