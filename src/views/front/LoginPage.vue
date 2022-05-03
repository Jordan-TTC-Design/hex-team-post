<script>
export default {
  setup() {
    return {};
  },
};
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-8 col-12 h-100 d-flex align-items-center">
        <div class="border border-dark p-8">
          <div class="row row-cols-2 gx-7">
            <div class="col d-flex align-items-center">
              <img class="mw-100" src="@/assets/image/login-img.svg" alt="登入圖片" />
            </div>
            <div class="col">
              <div class="d-flex flex-column">
                <h2 class="fw-bold text-primary text-center">MetaWall</h2>
                <p class="fw-bold text-dark text-center mb-7">到元宇宙展開全新社交圈</p>
                <div class="input-group inputToolContainer mb-3">
                  <input type="text" class="form-control inputTool" placeholder="Email" />
                </div>
                <div class="input-group inputToolContainer mb-6">
                  <input type="text" class="form-control inputTool" placeholder="Password" />
                </div>
                <button type="submit" class="btn btn-primary">登入</button>
                <RouterLink to="/register" class="btn">註冊帳號</RouterLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
