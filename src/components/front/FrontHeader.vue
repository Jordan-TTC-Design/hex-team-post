<script>
import userStore from '@/stores/userStore';
import statusStore from '@/stores/statusStore';

export default {
  setup() {
    const userData = userStore();
    const statusData = statusStore();
    async function checkLogin() {
      const localUser = JSON.parse(localStorage.getItem('sd-user'));
      if (localUser.token) {
        const checkResult = await userData.checkLogIn(localUser.token);
        if (checkResult.status) {
          localStorage.setItem('sd-user', JSON.stringify(localUser));
          userData.user = localUser;
          console.log(userData.user);
        }
      }
    }
    checkLogin();
    return { userData, statusData };
  },
};
</script>

<template>
  <div class="menu">
    <img src="@/assets/image/logo.svg" alt="logo" class="menu-logo" />
    <div class="menu-navbar">
      <div class="menu-navbar-item active">
        <a href="#"><i class="bi bi-house-door"></i> 最新動態</a>
      </div>
      <div class="menu-navbar-item">
        <a href="#"><i class="bi bi-bell-fill"></i>追蹤動態</a>
      </div>
      <div class="menu-navbar-item">
        <a href="#"><i class="bi bi-chat-square-heart"></i> 熱賣推薦</a>
      </div>
      <div class="menu-navbar-item">
        <a href="#"><i class="bi bi-envelope-heart"></i> 私密日記本</a>
      </div>
    </div>
    <div class="menu-function">
      <div class="btn-group" v-if="userData.user.token.length === 0">
        <button @click="statusData.logInModel = true" class="btn btn-outline text-primary">
          登入
        </button>
        <button @click="statusData.signUpModel = true" class="btn btn-outline">註冊</button>
      </div>
      <div class="d-flex" v-if="userData.user.token.length > 0">
        <button class="btn btn-secondary ms-2 px-3" @click="userData.logOut">
          <i class="bi bi-plus-lg"></i>
        </button>
        <div class="d-flex align-items-center">
          <img src="@/assets/image/user-picture.png" alt="user-picture" class="user-picture ms-4" />
          <span>{{ userData.user.name || '用戶名稱'}}</span>
        </div>
        <div class="ms-2">
          <button class="btn btn-primary px-3">
            <i class="bi bi-chevron-up text-white"></i>
          </button>
          <div class="menu-dropdown">
            <div class="list-group">
              <div class="list-group-header d-flex">
                <span>錢包</span>
                <span class="ms-auto">200 <i class="bi bi-gem"></i> </span>
              </div>
              <a href="#" class="list-group-item">查看個人檔案</a>
              <a href="#" class="list-group-item">消費記錄</a>
              <a href="#" class="list-group-item">客服支援</a>
              <a href="#" class="list-group-item">登出</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.menu-dropdown {
  width: 180px;
  position: absolute;
  top: 48px;
  right: 0;
  display: none;

  &.show {
    display: block;
  }
}

.menu {
  position: static;
  top: 0;
  left: 0;
  right: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  position: relative;

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
        &::before {
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
