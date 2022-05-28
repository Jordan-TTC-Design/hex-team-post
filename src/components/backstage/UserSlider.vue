<script>
import { computed, ref } from 'vue';
import backStatusStore from '@/stores/backstage/backStatusStore';
import FormInput from '@/components/helper/FormInput.vue';

export default {
  props: ['select-item', 'modal-open'],
  emits: ['get-posts', 'clear-item'],
  components: { FormInput },
  setup(props) {
    const backStageData = backStatusStore();
    const modalState = computed(() => props.modalState);
    const listState = ref(1);
    const subBtnState = ref(1);
    function changeListState(num) {
      listState.value = num;
      subBtnState.value = 1;
    }
    const newPassword = ref({
      password: '',
      confirmPassword: '',
    });
    return {
      modalState,
      listState,
      subBtnState,
      backStageData,
      newPassword,
      changeListState,
    };
  },
};
</script>

<template>
  <div
    class="silderBg z-silder"
    :class="{ active: backStageData.userSliderState }"
    @click="backStageData.userSliderState = false"
  ></div>
  <div class="silderBox z-silder" :class="{ active: backStageData.userSliderState === true }">
    <div class="d-flex flex-column posotion-relative h-100">
      <div class="position-absolute d-flex top-2 end-2">
        <button type="button" class="btn">
          <i class="webIcon bi bi-bell-fill"></i>
        </button>
        <button type="button" class="btn" @click="backStageData.userSliderState = false">
          <i class="webIcon bi bi-x-lg"></i>
        </button>
      </div>
      <div class="sliderHeader gap-6">
        <div class="userImgBox m-4 ms-6">
          <img src="@/assets/image/user-picture.png" alt="用戶照片" />
        </div>
        <div class="d-flex flex-column justify-content-between">
          <div class="pt-6">
            <h3 class="title d-flex align-items-center gap-2 mb-2">
              用戶名稱<span class="webTag">一般用戶</span>
            </h3>
            <p class="text--subTxt">#123456789</p>
          </div>
          <ul class="subNav">
            <li
              :class="{ active: listState === 1 }"
              class="subNav__item"
              @click="changeListState(1)"
            >
              基本資料
            </li>
            <li
              :class="{ active: listState === 2 }"
              class="subNav__item"
              @click="changeListState(2)"
            >
              貼文
            </li>
            <li
              :class="{ active: listState === 3 }"
              class="subNav__item"
              @click="changeListState(3)"
            >
              私密日記
            </li>
            <li
              :class="{ active: listState === 4 }"
              class="subNav__item"
              @click="changeListState(4)"
            >
              交易記錄
            </li>
          </ul>
        </div>
      </div>
      <div class="flex-grow-1 overflow-auto bg-gray-light p-6">
        <div class="row" v-if="listState === 1">
          <div class="col-2">
            <ul class="btnNav">
              <li
                class="btnNav__item"
                :class="{ active: subBtnState === 1 }"
                @click="subBtnState = 1"
              >
                個人資料
              </li>
              <li
                class="btnNav__item"
                :class="{ active: subBtnState === 2 }"
                @click="subBtnState = 2"
              >
                變更密碼
              </li>
              <li
                class="btnNav__item"
                :class="{ active: subBtnState === 3 }"
                @click="subBtnState = 3"
              >
                帳戶資料
              </li>
            </ul>
          </div>
          <div class="col-10">
            <div class="bg-white p-6 rounded" v-if="subBtnState === 1">
              <div class="section__title mb-4">
                <p class="section__title__content">個人資料</p>
              </div>
              <div class="infoListItem py-3">
                <p class="infoListItem__title">暱稱</p>
                <p class="infoListItem__content">用戶名稱</p>
              </div>
              <div class="infoListItem py-3">
                <p class="infoListItem__title">性別</p>
                <p class="infoListItem__content">男性</p>
              </div>
              <div class="infoListItem py-3">
                <p class="infoListItem__title">生日</p>
                <p class="infoListItem__content">1992/01/31</p>
              </div>
              <div class="infoListItem py-3">
                <p class="infoListItem__title">Email</p>
                <p class="infoListItem__content">Jordan.ttc.design@gmail.com</p>
              </div>
              <div class="infoListItem py-3">
                <p class="infoListItem__title">電話</p>
                <p class="infoListItem__content">0987654321</p>
              </div>
            </div>
            <form
              class="bg-white p-6 rounded"
              v-if="subBtnState === 2"
              @submit="backStageChangePassword(newPassword)"
            >
              <div class="section__title mb-4">
                <p class="section__title__content">變更密碼</p>
              </div>
              <FormInput
                class="mb-4"
                v-model="newPassword.password"
                input-id="password"
                type="password"
              >
                <template v-slot:default>密碼</template>
              </FormInput>
              <FormInput
                class="mb-4"
                v-model="newPassword.confirmPassword"
                input-id="confirmPassword"
                type="password"
              >
                <template v-slot:default>重複密碼</template>
              </FormInput>
              <button type="submit" class="btn btn-primary">確定變更</button>
            </form>
            <div class="bg-white p-6 rounded" v-if="subBtnState === 3">
              <div class="section__title mb-4">
                <p class="section__title__content">帳戶資料</p>
              </div>
              <div class="border-bottom">
                <div class="infoListItem py-3">
                  <p class="infoListItem__title">用戶級別</p>
                  <p class="infoListItem__content">一般用戶</p>
                </div>
                <div class="infoListItem py-3">
                  <p class="infoListItem__title">用戶狀態</p>
                  <p class="infoListItem__content">使用中</p>
                </div>
                <div class="infoListItem py-3">
                  <p class="infoListItem__title">最後登入</p>
                  <p class="infoListItem__content">1992/01/31 12:12</p>
                </div>
              </div>
              <button type="button" class="btn btn-danger">刪除帳戶</button>
            </div>
          </div>
        </div>
        <div class="row" v-if="listState === 2">
          <div class="col-2">
            <ul class="btnNav">
              <li
                class="btnNav__item"
                :class="{ active: subBtnState === 1 }"
                @click="subBtnState = 1"
              >
                刊登中
              </li>
              <li
                class="btnNav__item"
                :class="{ active: subBtnState === 2 }"
                @click="subBtnState = 2"
              >
                已下架
              </li>
            </ul>
          </div>
          <div class="col-10"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.sliderHeader {
  display: flex;
  border-bottom: 1px solid var(--bs-gray-middle);
  .userImgBox {
    width: 8rem;
    height: 8rem;
    border-radius: 50%;
    border: 1px solid var(--bs-gray-middle);
    background-color: var(--bs-white);
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}
.subNav {
  display: flex;
  &__item {
    position: relative;
    padding: 0.5rem 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    &:hover {
      color: var(--bs-primary);
    }
    &.active {
      color: var(--bs-primary);
      &::before {
        content: '';
        position: absolute;
        width: 50%;
        height: 0.25rem;
        bottom: 0;
        left: 25%;
        background-color: var(--bs-primary);
        opacity: 75%;
        border-radius: 0.25rem 0.25rem 0 0;
      }
    }
    &:not(:last-child) {
      &:after {
        content: '';
        position: absolute;
        width: 1px;
        height: 50%;
        top: 25%;
        right: 0;
        background-color: var(--bs-gray-dark);
        opacity: 75%;
      }
    }
  }
}
.btnNav {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  &__item {
    padding: 0.675rem 0.75rem;
    text-align: center;
    background-color: var(--bs-white);
    border-radius: 0.75rem;
    cursor: pointer;
    &:hover {
      color: var(--bs-primary);
    }
    &.active {
      background-color: var(--bs-secondary);
      color: var(--bs-primary);
    }
  }
}
</style>
