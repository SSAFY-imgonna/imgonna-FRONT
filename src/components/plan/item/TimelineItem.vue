<script setup>

</script>

<template>
<div class="timeline">
  <div class="container left">
    <div class="date">15 Dec</div>
    <i class="icon bi bi-airplane-fill"></i>
    <div class="content left">
        <div class="col-lg-4">
        <img
          src="/img/house.jpg"
          class="img-fluid"
          alt="..."
        />
        </div>
        <div class="col-lg-12">
            <h2>관광지명</h2>
            <p class="card-text">서울 특별시 송파구 문정동</p>
        </div>
    </div>
  </div>
  <div class="container right">
    <div class="date">22 OCT</div>
    <i class="icon bi bi-backpack2-fill"></i>
    <div class="content right">
        <div class="col-lg-4">
        <img
          src="/img/ocean.png"
          class="img-fluid"
          alt="..."
        />
        </div>
        <div class="col-lg-12">
            <h2>관광지명</h2>
            <p class="card-text">서울 특별시 송파구 문정동</p>
        </div>
    </div>
  </div>
  <!-- 좌우 반복 -->
  <div class="container left">
    <div class="date">15 Dec</div>
    <i class="icon bi bi-airplane-fill"></i>
    <div class="content left">
        <div class="col-lg-4">
        <img
          src="/img/house.jpg"
          class="img-fluid"
          alt="..."
        />
        </div>
        <div class="col-lg-12">
            <h2>관광지명</h2>
            <p class="card-text">서울 특별시 송파구 문정동</p>
        </div>
    </div>
  </div>
  <div class="container right">
    <div class="date">22 OCT</div>
    <i class="icon bi bi-backpack2-fill"></i>
    <div class="content right">
        <div class="col-lg-4">
        <img
          src="/img/ocean.png"
          class="img-fluid"
          alt="..."
        />
        </div>
        <div class="col-lg-12">
            <h2>관광지명</h2>
            <p class="card-text">서울 특별시 송파구 문정동</p>
        </div>
    </div>
  </div>
</div>
</template>

<style scoped>
img {
  width: 100%;
  height: 150px;
  float: left;
  margin-right: 25px;
  margin-bottom: 15px;
  vertical-align: middle;
}

.bi::before {
  vertical-align: 2em;
}
body {
    margin: 0;
    font-family: Arial, Helvetica, sans-serif;
    background: #ffffff;
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
  background: #ffffff;
}

.timeline {
  position: relative;
  width: 100%;
  max-width: 1140px;
  margin: 50px auto;
  padding: 15px 0;
}

.timeline::after {
  content: '';
  position: absolute;
  width: 2px;
  background: #74b359;
  top: 0;
  bottom: 0;
  left: 50%;
  margin-left: -1px;
}

.container {
  padding: 15px 30px;
  position: relative;
  background: inherit;
  width: 50%;
  margin-left: 0 !important;
}

.container.left {
  left: 0;
}

.container.right {
  left: 50%;
}

.container::after {
  content: '';
  position: absolute;
  width: 16px;
  height: 16px;
  top: calc(50% - 8px);
  right: -8px;
  background: #ffffff;
  border: 2px solid #74b359;
  border-radius: 16px;
  z-index: 1;
}

.container.right::after {
  left: -8px;
}

.container::before {
  content: '';
  position: absolute;
  width: 50px;
  height: 2px;
  top: calc(50% - 1px);
  right: 8px;
  background: #74b359;
  z-index: 1;
}

.container.right::before {
  left: 8px;
}

.container .date {
  position: absolute;
  display: inline-block;
  top: calc(50% - 8px);
  text-align: center;
  font-size: 14px;
  font-weight: bold;
  color: #006E51;
  text-transform: uppercase;
  letter-spacing: 1px;
  z-index: 1;
}

.container.left .date {
  right: -75px;
}

.container.right .date {
  left: -75px;
}

.container .icon {
  position: absolute;
  display: inline-block;
  width: 40px;
  height: 40px;
  padding: 9px 0;
  top: calc(50% - 20px);
  background: #fff4ced7;
  border: 2px solid #74b359;
  border-radius: 40px;
  text-align: center;
  font-size: 18px;
  color: #74b359;
  z-index: 1;
}

.container.left .icon {
  right: 56px;
}

.container.right .icon {
  left: 56px;
}

.container .content.left {
  min-height: 180px;
  padding: 15px 90px 30px 15px;
  background: #fff4ced7;
  position: relative;
  border-radius: 0 500px 500px 0;
}

.container .content.right {
  min-height: 180px;
  padding: 15px 15px 30px 90px;
  background: #fff4ced7;
  position: relative;
  border-radius: 0 500px 500px 0;
}

.container .content {
  min-height: 180px;
  padding: 15px 90px 30px 30px;
  background: #fff4ced7;
  position: relative;
  border-radius: 0 500px 500px 0;
}

.container.right .content {
  padding-left: 30px 30px 30px 90px;
  border-radius: 500px 0 0 500px;
}

.container .content h2 {
  margin: 10px 0 10px 0;
  font-size: 20px;
  font-weight: normal;
  color: #006E51;
}

.container .content p {
  margin: 0;
  font-size: 16px;
  line-height: 22px;
  color: #000000;
}

@media (max-width: 767.98px) {
  .timeline::after {
    left: 90px;
  }

  .container {
    width: 100%;
    padding-left: 120px;
    padding-right: 30px;
  }

  .container.right {
    left: 0%;
  }

  .container.left::after, 
  .container.right::after {
    left: 82px;
  }

  .container.left::before,
  .container.right::before {
    left: 100px;
    border-color: transparent #74b359 transparent transparent;
  }

  .container.left .date,
  .container.right .date {
    right: auto;
    left: 15px;
  }

  .container.left .icon,
  .container.right .icon {
    right: auto;
    left: 146px;
  }

  .container.left .content,
  .container.right .content {
    padding: 30px 30px 30px 90px;
    border-radius: 500px 0 0 500px;
  }
}
</style>