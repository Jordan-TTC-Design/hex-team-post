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
    const newUser = ref({
      name: '',
      photo: '',
      email: '',
      password: '',
      confirmPassword: '',
      birthday: '',
      gender: 'male',
    });
    function goToLogin() {
      statusData.signUpModel = false;
      statusData.logInModel = true;
    }
    async function signUp() {
      const result = await userData.signUp(newUser.value);
      if (result.status === 'success') {
        localStorage.setItem('sd-user', JSON.stringify(userData.user));
      } else {
        console.log('使用者帳密錯誤');
      }
    }
    return {
      newUser,
      statusData,
      userData,
      signUp,
      goToLogin,
    };
  },
};
</script>

<template>
  <div
    class="popModalContainer position-fixed top-0 left-0 z-popModal"
    :class="{ active: statusData.signUpModel === true }"
  >
    <!-- Modal-Overlay -->
    <div class="popModalCover" @click="statusData.signUpModel = false" />
    <!-- Modal-Window -->
    <div class="signUpModel popModal" :class="{ active: statusData.signUpModel === true }">
      <button
        @click="statusData.signUpModel = false"
        type="button"
        class="btn position-absolute popModel__btn"
      >
        <i class="webIcon bi bi-x-lg"></i>
      </button>
      <div class="d-flex flex-xl-row flex-column gap-2 h-75 flex-grow-1">
        <div class="signModel__imgBox bg-secondary flex-shrink-0">
          <img src="@/assets/image/logo-row.svg" alt="logo" class="mb-2" />
          <p class="text-primary">歡迎加入 Secret Diary 社群平台，分享您生活中的美好</p>
          <img src="@/assets/image/logo-mark.svg" alt="logo-mark" class="signUpModel__logoMark" />
        </div>
        <div class="signModel__contentBox">
          <div class="d-flex flex-column gap-4">
            <p class="text--subTxt">請完整填寫資訊，以便後續資料驗證</p>
            <FormInput v-model="newUser.name" input-id="signUserName" type="text">
              <template v-slot:default>暱稱</template>
            </FormInput>
            <FormInput v-model="newUser.email" input-id="signUserEmail" type="text">
              <template v-slot:default>電子郵件</template>
            </FormInput>
            <div class="d-flex flex-md-row flex-column gap-3">
              <FormInput v-model="newUser.password" input-id="signUserPassword" type="password">
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
                class="form-control bg-white border border-gray-middle"
                id="userBirthday"
                v-model="newUser.birthday"
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
          <div class="d-flex gap-4 mt-2">
            <button
              type="button"
              @click="goToLogin"
              class="btn btn-outline w-100 rounded py-2 px-3"
            >
              登入
            </button>
            <button
              type="button"
              @click="signUp"
              class="btn btn-primary w-100 text-white rounded py-2 px-3"
            >
              註冊
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.signModel__imgBox {
  position: relative;
  overflow: hidden;
  padding: 1.5rem;
  border-radius: 0.75rem 0rem 0rem 0.75rem;
  width: 25%;
  @media (max-width: 1199.98px) {
    width: 100%;
    padding: 1rem;
    border-radius: 0.75rem 0.75rem 0rem 0rem;
  }
}
.signModel__contentBox {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1rem;
  flex-grow: 1;
  overflow: auto;
}
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
    transform: scaleY(0) translate(-50%, -50%);
    left: 50%;
    top: 40%;
    transition: all 0.3s;
    background-color: #fff;
    width: 600px;
    height: 80vh;
    display: flex;
    flex-direction: column;
    @media (max-width: 1199.98px) {
      height: 90vh;
    }
    @media (max-width: 998.98px) {
      width: 60vw;
      height: 90vh;
    }
    @media (max-width: 767.98px) {
      width: 75vw;
    }
    @media (max-width: 575.98px) {
      width: 100vw;
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
  .signUpModel {
    width: 75%;
    &__logoMark {
      position: absolute;
      left: 0;
      bottom: 0;
      transform: translate(-24%, 36%);
      opacity: 0.3;
      @media (max-width: 1199.98px) {
        transform: translate(180%, 60%);
      }
    }
  }
  .popModel__btn {
    top: 0.75rem;
    right: 0.75rem;
    z-index: 1;
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
