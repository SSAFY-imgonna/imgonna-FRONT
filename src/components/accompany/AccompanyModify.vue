<script setup>
import AccompanyFormItem from "./item/AccompanyFormItem.vue";
</script>

<template>
  <section class="py-4 text-center container">
    <div class="row">
      <div class="col-lg-6 col-md-8 mx-auto">
        <h1 class="fw-light">동행 글수정</h1>
      </div>
    </div>
  </section>

  <div class="album py-2 bg-body-tertiary">
    <div class="container col-11 col-md-8 col-lg-6">
      <div class="">
        <div class="row">
          <div class="card shadow-sm">
            <div class="card-body">
              <AccompanyFormItem type="modify" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
