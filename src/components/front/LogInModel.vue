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
<<<<<<< HEAD
    const newUser = ref({
      name: 'Ray',
      email: '123@123.com',
      photo: '',
      birthday: '2022-01-01',
      gender: 'male || female',
      password: '12345678',
      confirmPassword: '12345678',
    });
    function goToLogin() {}
    function signUp() {
      userData.signUp(newUser.value);
    }
    return {
      newUser,
      statusData,
      userData,
      signUp,
      goToLogin,
=======
    const loginData = ref({
      email: '',
      password: '',
    });
    function goToSignUp() {}
    async function logIn() {
      const result = await userData.logIn(loginData.value);
      if (result.status === 'success') {
        localStorage.setItem('sd-token', result.user.token);
        userData.userToken = result.user.token;
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
>>>>>>> feature/signup
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
<<<<<<< HEAD
=======

>>>>>>> feature/signup
    <!-- Modal-Window -->
    <div class="signUpModel popModal" :class="{ active: statusData.logInModel === true }">
      <button
        @click="statusData.logInModel = false"
        type="button"
        class="btn position-absolute popModel__btn"
      >
        <i class="bi bi-x-lg"></i>
      </button>
<<<<<<< HEAD
      <div class="d-flex gap-2 h-75 flex-grow-1">
        <div class="w-25 bg-secondary rounded-start p-6 position-relative overflow-hidden">
          <img src="@/assets/image/logo-row.svg" alt="logo" class="mb-2" />
          <p class="text-primary">歡迎加入 Secret Diary 社群平台，分享您生活中的美好</p>
          <img src="@/assets/image/logo-mark.svg" alt="logo-mark" class="signUpModel__logoMark" />
        </div>
        <div class="d-flex flex-column justify-content-between gap-2 w-75 p-4 overflow-auto">
          <div class="d-flex flex-column gap-4">
            <p class="text--subTxt">請完整填寫資訊，以便後續資料驗證</p>
            <FormInput v-model="newUser.name" input-id="userName" type="text">
              <template v-slot:default>暱稱</template>
            </FormInput>
            <FormInput v-model="newUser.email" input-id="userEmail" type="text">
              <template v-slot:default>電子郵件</template>
            </FormInput>
            <div class="d-flex gap-3">
              <FormInput v-model="newUser.password" input-id="userPassword" type="text">
                <template v-slot:default>密碼</template>
              </FormInput>
              <FormInput
                v-model="newUser.confirmPassword"
                input-id="userConfirmPassword"
                type="text"
              >
                <template v-slot:default>重複確認密碼</template>
              </FormInput>
            </div>
            <div class="d-flex flex-column gap-1">
              <label class="ms-3" for="userBirthday">生日</label>
              <input
                class="form-control bg-white border-gray-middle"
                id="userBirthday"
                type="date"
              />
            </div>
            <div class="formRadio w-100 d-flex flex-column gap-1">
              <p class="ms-3">性別</p>
              <div class="d-flex gap-2">
                <input
                  class="formRadio__input"
                  type="radio"
                  id="userMale"
                  value="male"
                  v-model="newUser.gender"
                />
                <label
                  :class="{ active: newUser.gender === 'male' }"
                  class="formRadio__label"
                  for="userMale"
                  >男性</label
                >
                <input
                  class="formRadio__input"
                  type="radio"
                  id="userFemale"
                  value="female"
                  v-model="newUser.gender"
                />
                <label
                  :class="{ active: newUser.gender === 'female' }"
                  class="formRadio__label"
                  for="userFemale"
                  >女性</label
                >
              </div>
            </div>
          </div>
          <div class="d-flex flex-column gap-4">
            <button
              type="button"
              @click="signUp"
              class="btn btn-primary w-100 text-white rounded py-2 px-3"
            >
              註冊
            </button>
            <button
              type="button"
              @click="goToLogin"
              class="btn btn-outline w-100 rounded py-2 px-3"
            >
              登入
            </button>
          </div>
        </div>
=======
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
          ><button type="button" @click="goToSignUp" class="btn rounded py-1 px-3 align-self-start">
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
>>>>>>> feature/signup
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
<<<<<<< HEAD
    transform: scaleY(0) translate(-50%, -50%);
=======
    transform: scaleY(0) translate(-50%, 0%);
>>>>>>> feature/signup
    left: 50%;
    top: 40%;
    transition: all 0.3s;
    background-color: #fff;
<<<<<<< HEAD
    width: 600px;
    height: 80vh;
    display: flex;
    flex-direction: column;

    @media (max-width: 998.98px) {
=======
    width: 30vw;
    max-height: 80vh;
    display: flex;
    flex-direction: column;
    @media (max-width: 1139.98px) {
>>>>>>> feature/signup
      width: 60vw;
    }
    @media (max-width: 767.98px) {
      width: 75vw;
    }
    @media (max-width: 575.98px) {
<<<<<<< HEAD
      width: 100vw;
      height: 100vh;
      border-radius: 0;
=======
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
>>>>>>> feature/signup
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
<<<<<<< HEAD
  .signUpModel {
    width: 75%;
    &__logoMark {
      position: absolute;
      left: 0;
      bottom: 0;
      transform: translate(-24%, 36%);
      opacity: 0.3;
    }
  }
  .popModel__btn {
    top: 0.75rem;
    right: 0.75rem;
=======
  .popModel__btn {
    top: 0.75rem;
    right: 0.75rem;
    z-index: 900;
    color: #1d1d1d;
>>>>>>> feature/signup
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
