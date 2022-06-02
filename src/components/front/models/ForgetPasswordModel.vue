<script>
import { ref } from 'vue';
import statusStore from '@/stores/statusStore';
import userStore from '@/stores/userStore';
import FormInput from '@/components/helper/FormInput.vue';

export default {
  components: { FormInput },
  setup() {
    const userData = userStore();
    const statusData = statusStore();
    const forgetData = ref({
      email: '',
    });
    function goToLogIn() {
      statusData.forgetPasswordsModel = false;
      statusData.logInModel = true;
    }
    async function sendForgetPassword() {
      const result = await userData.resetPassword(forgetData.value);
      if (result.status === 'true') {
        statusData.openRemindModel(
          '傳送成功',
          `請前往您的信箱${forgetData.value.email}收取新密碼，並重設密碼`,
        );
      } else {
        statusData.openPopInfoModel('email錯誤');
      }
    }
    return {
      forgetData,
      statusData,
      userData,
      sendForgetPassword,
      goToLogIn,
    };
  },
};
</script>

<template>
  <div
    class="popModalContainer position-fixed top-0 left-0 z-popModal"
    :class="{ active: statusData.forgetPasswordsModel === true }"
  >
    <!-- Modal-Overlay -->
    <div class="popModalCover" @click="statusData.forgetPasswordsModel = false" />
    <!-- Modal-Window -->
    <div class="signUpModel popModal" :class="{ active: statusData.forgetPasswordsModel === true }">
      <button
        @click="statusData.forgetPasswordsModel = false"
        type="button"
        class="btn position-absolute popModel__btn"
      >
        <i class="bi bi-x-lg"></i>
      </button>
      <div class="bg-secondary rounded-top p-6 position-relative overflow-hidden">
        <img src="@/assets/image/logo-row.svg" alt="logo" class="mb-2" />
        <p class="text-primary">忘記密碼</p>
        <img src="@/assets/image/logo-mark.svg" alt="logo-mark" class="signUpModel__logoMark" />
      </div>
      <div class="d-flex flex-column justify-content-between gap-4 p-4 overflow-auto">
        <FormInput v-model="forgetData.email" input-id="userEmail" type="text">
          <template v-slot:default>電子郵件</template>
        </FormInput>
        <button
          type="button"
          @click="sendForgetPassword"
          class="btn btn-primary w-100 text-white rounded py-2 px-3"
        >
          傳送新密碼
        </button>
        <button type="button" @click="goToLogIn" class="btn btn-outline w-100 rounded py-2 px-3">
          返回登入
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.z-popModal {
  z-index: 2400;
}
.popModalContainer {
  height: 100vh;
  width: 100vw;
  transition: all 0.3s;
  pointer-events: none;
  .popModalCover {
    background-color: rgba(0, 0, 0, 0);
    transition: all 0.3s;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }
  .popModal {
    opacity: 1;
    z-index: 100;
    position: absolute;
    border-radius: 0.75rem;
    opacity: 0;
    transform: scaleY(0) translate(-50%, 0%);
    left: 50%;
    top: 40%;
    transition: all 0.3s;
    background-color: #fff;
    width: 30vw;
    max-height: 80vh;
    display: flex;
    flex-direction: column;
    @media (max-width: 1139.98px) {
      width: 60vw;
    }
    @media (max-width: 767.98px) {
      width: 75vw;
    }
    @media (max-width: 575.98px) {
      width: 80vw;
    }
  }
  .signUpModel {
    &__logoMark {
      position: absolute;
      right: 0;
      bottom: 0;
      transform: translate(-12%, 64%);
      opacity: 0.3;
    }
  }
}

.popModalContainer.active {
  pointer-events: auto;
  .popModalCover {
    background-color: rgba(0, 0, 0, 0.5);
  }
  .popModal {
    opacity: 1;
    left: 50%;
    top: 50%;
    transform: scaleY(1) translate(-50%, -50%);
  }
  .popModel__btn {
    top: 0.75rem;
    right: 0.75rem;
    z-index: 900;
    color: #1d1d1d;
  }
}
.formRadio {
  &__input {
    display: none;
  }
  &__label {
    border: 1px solid #e2e2e2;
    padding: 0.5rem;
    border-radius: 0.75rem;
    cursor: pointer;
    &.active {
      background-color: #f2e8fc;
      border: 1px solid #892092;
      color: #892092;
    }
  }
}
</style>
