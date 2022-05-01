<script>
import { ref } from 'vue';
import PageTitleBox from '@/components/front/PageTitleBox.vue';

export default {
  components: {
    PageTitleBox,
  },
  setup() {
    const pageNavSelect = ref(1);
    return { pageNavSelect };
  },
};
</script>
<template>
  <div class="container">
    <div class="row d-flex justify-content-center">
      <div class="col-7">
        <PageTitleBox class="mb-6" title-content="修改個人資料" />
        <ul class="contentNav">
          <li
            :class="{ active: pageNavSelect === 1 }"
            class="contentNav__item"
            @click="pageNavSelect = 1"
          >
            暱稱修改
          </li>
          <li
            :class="{ active: pageNavSelect === 2 }"
            class="contentNav__item"
            @click="pageNavSelect = 2"
          >
            重設密碼
          </li>
        </ul>
        <div
          v-if="pageNavSelect === 1"
          class="border border-dark p-6 d-flex flex-column align-items-center"
        >
          <div class="userImg mb-6">
            <img
              class="userImg__img"
              src="https://images.unsplash.com/photo-1648737155328-0c0012cf2f20?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
              alt="用戶底圖"
            />
          </div>
          <div class="w-75 d-flex flex-column gap-3">
            <div>
              <label for="setting-userName" class="form-label">暱稱</label>
              <input
                type="text"
                class="form-control inputTool"
                placeholder="請輸入您的暱稱"
                id="setting-userName"
                aria-label="Username"
              />
            </div>
            <div>
              <label class="form-label">性別</label>
              <div class="d-flex gap-4">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="setting-gender"
                    id="setting-gender-male"
                  />
                  <label class="form-check-label" for="setting-gender-male"> 男性 </label>
                </div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="setting-gender"
                    id="setting-gender-female"
                    checked
                  />
                  <label class="form-check-label" for="setting-gender-female"> 女性 </label>
                </div>
              </div>
            </div>
            <button type="button" class="btn btn-primary">送出更新</button>
          </div>
        </div>
        <div
          v-if="pageNavSelect === 2"
          class="border border-dark p-6 d-flex flex-column align-items-center"
        >
          <div class="w-75 d-flex flex-column gap-3">
            <div>
              <label for="setting-newPassword" class="form-label">修改密嗎</label>
              <input
                type="text"
                class="form-control inputTool"
                placeholder="請輸入新密碼"
                id="setting-newPassword"
              />
            </div>
            <div>
              <label for="setting-rePassword" class="form-label">再次輸入</label>
              <input
                type="text"
                class="form-control inputTool"
                placeholder="再次輸入新密碼"
                id="setting-rePassword"
              />
            </div>
            <button type="button" class="btn btn-primary">重設密碼</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.userImg {
  border-radius: 50%;
  border: 2px solid #000;
  width: 108px;
  height: 108px;
  position: relative;
  &__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }
  &::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 50%;
    transition: all 0.3s;
    cursor: pointer;
  }
  &:hover {
    &::after {
      background-color: rgba(0, 0, 0, 0.5);
    }
  }
}
.contentNav {
  display: flex;
  &__item {
    padding: 0.25rem 1rem;
    border: 2px solid #000;
    border-bottom: 0;
    border-radius: 0.5rem 0.5rem 0 0;
    color: black;
    transition: all 0.3s;
    cursor: pointer;
    &:hover {
      background-color: gray;
    }
    &.active {
      background-color: black;
      color: white;
    }
  }
}
</style>
