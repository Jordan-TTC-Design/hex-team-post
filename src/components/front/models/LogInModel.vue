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
    const loginData = ref({
      email: '',
      password: '',
    });
    function goToForgetPassword() {
      statusData.logInModel = false;
      statusData.forgetPasswordsModel = true;
    }
    function goToSignUp() {
      statusData.logInModel = false;
      statusData.signUpModel = true;
    }
    async function logIn() {
      const result = await userData.logIn(loginData.value);
      if (result.status === 'success') {
        userData.user = {
          name: result.user.name,
          token: result.user.token,
          photo: result.user.photo,
        };
        localStorage.setItem('sd-user', JSON.stringify(userData.user));
        statusData.logInModel = false;
      } else {
        console.log('使用者帳密錯誤');
      }
    }
    return {
      loginData,
      statusData,
      userData,
      logIn,
      goToSignUp,
      goToForgetPassword,
    };
  },
};
</script>

<template>
  <div
    class="popModalContainer position-fixed top-0 left-0 z-popModal"
    :class="{ active: statusData.logInModel === true }"
  >
    <!-- Modal-Overlay -->
    <div class="popModalCover" @click="statusData.logInModel = false" />
    <!-- Modal-Window -->
    <div class="signUpModel popModal" :class="{ active: statusData.logInModel === true }">
      <button
        @click="statusData.logInModel = false"
        type="button"
        class="btn position-absolute popModel__btn"
      >
        <i class="bi bi-x-lg"></i>
      </button>
      <div class="bg-secondary rounded-top p-6 position-relative overflow-hidden">
        <img src="@/assets/image/logo-row.svg" alt="logo" class="mb-2" />
        <p class="text-primary">歡迎回來</p>
        <img src="@/assets/image/logo-mark.svg" alt="logo-mark" class="signUpModel__logoMark" />
      </div>
      <div class="d-flex flex-column justify-content-between gap-4 p-4 overflow-auto">
        <FormInput v-model="loginData.email" input-id="userEmail" type="text">
          <template v-slot:default>電子郵件</template>
        </FormInput>
        <div>
          <FormInput v-model="loginData.password" input-id="userPassword" type="text">
            <template v-slot:default>密碼</template> </FormInput
          ><button
            type="button"
            @click="goToForgetPassword"
            class="btn rounded py-1 px-3 align-self-start"
          >
            <p class="text-danger">忘記密碼?</p>
          </button>
        </div>

        <button
          type="button"
          @click="logIn"
          class="btn btn-primary w-100 text-white rounded py-2 px-3"
        >
          登入
        </button>
        <button type="button" @click="goToSignUp" class="btn btn-outline w-100 rounded py-2 px-3">
          註冊
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
