<script setup></script>

<template>
  <div id="comment-div" class="mt-0">
    <div class="mb-2 ps-1">
      <span class="comm-title" style="font-size: 15pt">댓글</span>&nbsp;
      <span id="comm-first"><span class="letter-count">50/50</span></span>
    </div>
    <form id="form-comm">
      <div class="inner-text">
        <textarea
          class="form-control comm-content inner-text"
          name="commContent"
          id="commContent"
        ></textarea>
        <button type="submit" class="btn btn-outline-primary" id="inner-submit">
          <font-awesome-icon icon="fa-solid fa-reply" />
        </button>
        <!-- <c:if test="${empty sessionScope.memberDto}">
          <textarea
            class="form-control comm-content inner-text"
            name="commContent"
            id="commContent"
            disabled="disabled"
          >
로그인 후 작성가능합니다</textarea
          > 
          <button type="submit" class="btn btn-outline-primary" id="inner-submit">
            <i class="bi bi-send-fill" style="display: none"></i>
          </button>
         </c:if> -->
      </div>
    </form>
  </div>
</template>

<style>
/* 댓글 부분 */
div.inner-text {
  display: inline-block;
  position: relative;
}
.inner-text {
  display: block;
  height: 130px;
  width: 100%;
  resize: none;
}
#inner-submit {
  position: absolute;
  bottom: 0px;
  right: 0px;
  border: none;
}
#comment-div {
  padding: 20px 10px 20px 10px;
  margin-top: 10px;
  background-color: #fafafa;
  border-radius: 5px;
}
</style>
