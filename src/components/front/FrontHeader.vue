<script>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import userStore from '@/stores/userStore';
import statusStore from '@/stores/statusStore';

export default {
  setup() {
    const route = useRoute();
    const userData = userStore();
    const statusData = statusStore();
    const dropDownMenuStatus = ref(false);
    async function checkLogin() {
      const localUser = JSON.parse(localStorage.getItem('sd-user'));
      if (localUser) {
        const checkResult = await userData.checkLogIn(localUser.token);
        if (checkResult.status) {
          localStorage.setItem('sd-user', JSON.stringify(localUser));
          userData.user = localUser;
        }
      }
    }
    function openDropModel() {
      dropDownMenuStatus.value = !dropDownMenuStatus.value;
    }
    checkLogin();
    return {
      userData,
      statusData,
      route,
      dropDownMenuStatus,
      openDropModel,
    };
  },
};
</script>

<template>
  <div class="menu">
    <img src="@/assets/image/logo.svg" alt="logo" class="menu-logo" />
    <div class="menu-navbar">
      <div class="menu-navbar-item" :class="{ active: route.path === `/` }">
        <RouterLink to="/"> <i class="bi bi-house-door"></i> 最新動態 </RouterLink>
      </div>
      <div class="menu-navbar-item" :class="{ active: route.path === `/Follow` }">
        <RouterLink to="/Follow"> <i class="bi bi-bell-fill"></i> 追蹤動態 </RouterLink>
      </div>
      <div class="menu-navbar-item" :class="{ active: route.path === `/Recommend` }">
        <RouterLink to="/Recommend"> <i class="bi bi-chat-square-heart"></i> 熱賣推薦 </RouterLink>
      </div>
      <div class="menu-navbar-item" :class="{ active: route.path === `/Diary` }">
        <RouterLink to="/Diary"> <i class="bi bi-envelope-heart"></i> 私密日記本 </RouterLink>
      </div>
    </div>
    <div class="menu-function">
      <div class="btn-group" v-if="userData.user.token.length === 0">
        <button @click="statusData.logInModel = true" class="btn btn-outline text-primary">
          登入
        </button>
        <button @click="statusData.signUpModel = true" class="btn btn-outline">註冊</button>
      </div>
      <div class="d-flex align-items-center gap-2" v-if="userData.user.token.length > 0">
        <button class="btn btn-secondary ms-2 px-3" @click="statusData.newPostModel = true">
          <i class="bi bi-plus-lg"></i>
        </button>
        <div class="border d-flex align-items-center gap-2 rounded-pill" @click="openDropModel">
          <img
            src="@/assets/image/user-picture.png"
            alt="user-picture"
            class="user-picture m-0 border-0"
          />
          <span>{{ userData.user.name || '用戶名稱' }}</span>
          <div class="dropDownMenu">
            <button class="btn btn-white px-3 rounded-pill">
              <i
                :class="{
                  'bi-chevron-up': dropDownMenuStatus === true,
                  'bi-chevron-down': dropDownMenuStatus === false,
                }"
                class="bi "
              ></i>
            </button>
            <div class="dropDownMenu__dropdown" v-show="dropDownMenuStatus">
              <ul class="list-group">
                <li class="list-group-header d-flex">
                  <p class="text-primary">錢包</p>
                  <span class="ms-auto text-primary">200 <i class="bi bi-gem"></i> </span>
                </li>
                <RouterLink to="/profile" class="list-group-item">查看個人檔案</RouterLink>
                <RouterLink to="/profile" class="list-group-item">消費記錄</RouterLink>
                <li class="list-group-item">客服支援</li>
                <li @click="userData.logOut" class="list-group-item">登出</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.dropDownMenu {
  cursor: pointer;
  &__dropdown {
    width: 180px;
    position: absolute;
    top: 48px;
    right: 0;
  }
}

.menu {
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  box-shadow: 0px 1px 1px #00000029;
  padding: 0 24px;
  .menu-logo {
    position: absolute;
    left: 24px;
  }

  .menu-navbar {
    display: flex;
    .menu-navbar-item {
      width: 186px;
      text-align: center;
      padding-top: 22px;
      padding-bottom: 18px;
      position: relative;
      &.active {
        &::after {
          content: '';
          width: 120px;
          height: 1px;
          border-top: 4px solid #892092;
          border-top-left-radius: 12px;
          border-top-right-radius: 12px;
          position: absolute;
          bottom: 0;
          left: 33px;
        }
        & a {
          color: #892092;
        }
      }
      & a {
        text-decoration: none;
        font-size: 16px;
        color: #1d1d1d;
      }
      & + .menu-navbar-item::before {
        content: '';
        height: 36px;
        left: 0;
        top: 14px;
        border-left: 1px solid #d6d6d6;
        position: absolute;
      }
    }
  }

  .menu-function {
    position: absolute;
    right: 24px;

    display: flex;
  }
}
</style>
