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
                <p class="fw-bold text-dark text-center mb-7">註冊</p>
                <div class="input-group inputToolContainer mb-3">
                  <input type="text" class="form-control inputTool" placeholder="暱稱" />
                </div>
                <div class="input-group inputToolContainer mb-3">
                  <input type="text" class="form-control inputTool" placeholder="Email" />
                </div>
                <div class="input-group inputToolContainer mb-6">
                  <input type="text" class="form-control inputTool" placeholder="Password" />
                </div>
                <button type="submit" class="btn btn-light border border-dark">註冊</button>
                <RouterLink to="/login" class="btn">返回登入</RouterLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
