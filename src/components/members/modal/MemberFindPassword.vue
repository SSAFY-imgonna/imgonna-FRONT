<script setup>

</script>

<template>
  <div class="modal fade" id="findPwModal" tabindex="-1"
	aria-labelledby="exampleModalLabel" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">

			<div class="modal-header">
				<h2 class='modal-title fs-5'>비밀번호 찾기</h2>
			</div>

			<div class="modal-body">
				<form action="" method='post' id="findPasswordForm">
					<div class="input-group mb-1" id='input-group'>
						<span class="input-group-text">아이디</span> <input type="text"
							class="form-control" id="findPwId" placeholder="아이디를 입력하세요"
							name="id">
					</div>
					<div class="input-group mb-1" id='input-group'>
						<span class="input-group-text">이메일</span> <input type="text"
							class="form-control" id="findPwEmail" placeholder="이메일을 입력하세요"
							name="email">
					</div>
					<div class="input-group mb-1" id='input-group'>
						<span class="input-group-text">전화번호</span> <input type="text"
							class="form-control" id="findPwPhone" placeholder="전화번호를 입력하세요"
							name="password">
					</div>
					<div id="showMessageElementFindPw" class="mt-5 mb-3"></div>
				</form>
				<div class="modal-footer">
					<button type="button" id="btnFindPassword" class="btn btn-outline-warning">
						비밀번호 찾기</a>
					</button>
					<!-- <button type="button" class="btn btn-outline-success">아이디찾기</button> -->
					<button type="button" class="btn btn-outline-success">
						<a style="text-decoration: none;" data-bs-toggle="modal"
							data-bs-target="#loginModal">로그인</a>
					</button>
					<input type="button" class="btn btn-outline-secondary" value="닫기"
						data-bs-dismiss="modal" aria-label="close">
				</div>

			</div>
		</div>
	</div>
</div>
</template>

<style scoped>

</style>