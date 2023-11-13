<script setup></script>

<template>
  <div
    class="modal fade"
    id="registerModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">회원가입</h1>
        </div>
        <div class="modal-body">
          <div class="container mt-3">
            <form method="post" name="registerForm" id="registerForm">
              <%--
              <div class="input-group mb-3">
                <span class="input-group-text">회원 유형</span>
                <span class="mx-auto">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="role"
                    value="general"
                    id="general"
                    checked="checked"
                  />
                  <label class="form-check-label" for="general"> 일반 회원 </label>
                  <input
                    class="form-check-input"
                    type="radio"
                    name="role"
                    value="admin"
                    id="admin"
                  />
                  <label class="form-check-label" for="admin"> 관리자 </label>
                </span>
              </div>
              --%>

              <div class="input-group mb-3">
                <span class="input-group-text">아이디</span>
                <input type="text" class="form-control" id="registerId" name="registerId" />
                <button class="btn btn-outline-secondary" type="button" id="memberIdCheck">
                  중복확인
                </button>
              </div>

              <div id="showMessageElementId" class="mb-3"></div>
              <div class="input-group mb-3">
                <span class="input-group-text">비밀번호</span>
                <input type="password" class="form-control" id="registerPw" name="registerPw" />
              </div>

              <div class="input-group mb-3">
                <span class="input-group-text">비밀번호확인</span>
                <input
                  type="password"
                  class="form-control"
                  id="memberPwCheck"
                  name="memberPwCheck"
                />
              </div>

              <div id="showMessageElementPw" class="mb-3"></div>

              <div class="input-group mb-3">
                <span class="input-group-text">이름</span>
                <input type="text" class="form-control" id="registerName" name="registerName" />
              </div>

              <div class="input-group mb-3">
                <span class="input-group-text">닉네임</span>
                <input
                  type="text"
                  class="form-control"
                  id="registerNickname"
                  name="registerNickname"
                />
              </div>

              <div class="input-group mb-3">
                <span class="input-group-text">연락처</span>
                <input type="text" class="form-control" id="registerPhone" name="registerPhone" />
              </div>

              <div class="input-group mb-3">
                <span class="input-group-text">MBTI</span>
                <input type="text" class="form-control" id="mbti" name="mbti" />
              </div>

              <div class="input-group mb-3">
                <span class="input-group-text">소개글</span>
                <textarea
                  class="form-control"
                  id="introduction"
                  type="text"
                  maxlength="255"
                  rows="3"
                  cols="30"
                  name="introduction"
                ></textarea>
              </div>

              <div class="input-group mb-3" id="input-group">
                <span class="input-group-text">이메일</span>
                <input
                  type="text"
                  class="form-control"
                  placeholder="아이디"
                  id="registerEmail"
                  name="registerEmail"
                />
                <span class="input-group-text">@</span>
                <select class="form-select" id="registerEmailAdd" name="registerEmailAdd">
                  <option value="" selected>선택</option>
                  <option value="@naver.com">네이버</option>
                  <option value="@samsung.com">삼성</option>
                  <option value="@google.com">구글</option>
                </select>
              </div>
              <div id="showMessageElementEmail" class="mb-3"></div>

              <!-- <div class="form-check mb-3">
                  <label class="form-check-label">
                      <input class="form-check-input" type="checkbox" name="showMemberPw"> 비밀번호 보이기
                  </label>
              </div> -->

              <!-- <div class="input-group mb-3" id='select-group'>
                <span class="input-group-text">지역</span>
              <select class="form-select">
                  <option selected>시도선택</option>
                  <option value="@naver.com"></option>
                  <option value="@samsung.com">삼성</option>
                  <option value="@google.com">구글</option>
                </select>
              <select class="form-select">
                  <option selected>구군선택</option>
                  <option value="@naver.com">네이버</option>
                  <option value="@samsung.com">삼성</option>
                  <option value="@google.com">구글</option>
                </select>
            </div> -->
            </form>
          </div>
        </div>
        <div class="modal-footer">
          <input
            type="button"
            class="btn btn-outline-primary"
            id="registerSubmit"
            value="회원가입"
          />
          <!-- <input type="reset" class="btn btn-outline-success" value = "초기화" > -->
          <input
            type="button"
            class="btn btn-outline-secondary"
            value="닫기"
            data-bs-dismiss="modal"
            aria-label="close"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
