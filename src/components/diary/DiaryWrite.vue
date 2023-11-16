<script setup></script>

<template>
  <form action="forms/contact.php" method="post" role="form" class="php-email-form p-3 p-md-4">
    <div class="row">
      <div class="col-xl-6 form-group">
        <input type="text" name="name" class="form-control" id="name" placeholder="날씨" required />
      </div>
      <div class="col-xl-6 form-group">
        <input
          type="email"
          class="form-control"
          name="email"
          id="email"
          placeholder="Your Email"
          required
        />
      </div>
    </div>
    <div class="form-group">
      <input
        type="text"
        class="form-control"
        name="subject"
        id="subject"
        placeholder="제목"
        required
      />
    </div>
    <div class="form-group">
      <textarea
        class="form-control"
        name="message"
        rows="10"
        placeholder="내용"
        required
      ></textarea>
    </div>
    <div class="my-3">
      <div class="loading">Loading</div>
      <div class="error-message"></div>
      <div class="sent-message">Your message has been sent. Thank you!</div>
    </div>
    <div class="text-center"><button type="submit">Send Message</button></div>
  </form>
  <!--End Contact Form -->
</template>

<style scoped></style>
