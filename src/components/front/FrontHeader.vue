<script>
// eslint-disable-next-line object-curly-newline
import { ref, watch, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import userStore from '@/stores/userStore';
import statusStore from '@/stores/statusStore';
import postsStore from '@/stores/postsStore';
import followStore from '@/stores/followStore';

export default {
  setup() {
    const route = useRoute();
    const router = useRouter();
    const userData = userStore();
    const statusData = statusStore();
    const postsData = postsStore();
    const followData = followStore();
    const modalOpen = ref(false);
    const nowPath = computed(() => route.path);
    watch(nowPath, (newValue, oldValue) => {
      if (newValue !== oldValue) {
        modalOpen.value = false;
        statusData.noScroll = false;
      }
    });
    function openDropModel() {
      modalOpen.value = !modalOpen.value;
    }
    function openTagertModel(target) {
      statusData[target] = true;
      statusData.noScroll = true;
    }
    const userId = computed(() => userData.user.id);
    watch(userId, (newValue, oldValue) => {
      if (newValue !== oldValue && newValue === '') {
        router.push('/');
      }
    });
    onMounted(async () => {
      await userData.getLocalToken();
      if (userData.user.token) {
        await userData.checkLogIn(userData.user.token);
        followData.getMyFollow(userData.user.token);
      }
    });
    return {
      userData,
      statusData,
      postsData,
      route,
      modalOpen,
      openDropModel,
      openTagertModel,
    };
  },
};
</script>

<template>
  <div class="header">
    <RouterLink class="header-logo" to="/">
      <img src="@/assets/image/logo.svg" alt="logo" />
    </RouterLink>
    <div class="menu-navbar">
      <div class="menu-navbar-item" :class="{ active: route.path === `/` }">
        <RouterLink class="menu-navbar-item__link" to="/">
          <i class="bi bi-house-door"></i> 最新動態
        </RouterLink>
      </div>
      <div class="menu-navbar-item" :class="{ active: route.path === `/follow` }">
        <a
          class="menu-navbar-item__link"
          v-if="userData.user.token.length === 0"
          @click.prevent="statusData.logInModel = true"
          href="#"
        >
          <i class="bi bi-bell-fill"></i> 追蹤動態
        </a>
        <RouterLink
          class="menu-navbar-item__link"
          to="/follow"
          v-if="userData.user.token.length > 0"
        >
          <i class="bi bi-bell-fill"></i> 追蹤動態
        </RouterLink>
      </div>
      <div class="menu-navbar-item" :class="{ active: route.path === `/recommend` }">
        <RouterLink class="menu-navbar-item__link" to="/recommend"
          ><i class="bi bi-chat-square-heart"></i> 熱賣推薦</RouterLink
        >
      </div>
      <div class="menu-navbar-item" :class="{ active: route.path === `/diary` }">
        <a
          class="menu-navbar-item__link"
          v-if="userData.user.token.length === 0"
          @click.prevent="statusData.logInModel = true"
          href="#"
        >
          <i class="bi bi-envelope-heart"></i> 私密日記本
        </a>
        <RouterLink
          class="menu-navbar-item__link"
          to="/diary"
          v-if="userData.user.token.length > 0"
        >
          <i class="bi bi-envelope-heart"></i> 私密日記本
        </RouterLink>
      </div>
    </div>
    <div class="menu-function">
      <div class="btn-group" v-if="userData.user.token.length === 0">
        <button @click="statusData.logInModel = true" class="btn btn-outline text-primary">
          登入
        </button>
        <button @click="openTagertModel('signUpModel')" class="btn btn-outline">註冊</button>
      </div>
      <div class="d-flex align-items-center gap-2" v-if="userData.user.token.length > 0">
        <button class="btn btn-secondary ms-2 px-3" @click="postsData.openPostModel('group')">
          <i class="bi bi-plus-lg"></i>
        </button>
        <div class="border d-flex align-items-center gap-2 rounded-pill ps-2">
          <img
            :src="userData.user.photo || 'https://i.imgur.com/ZWHoRPi.png'"
            :alt="userData.user.name"
            class="userPhoto"
          />
          <p class="userName">{{ userData.user.name || '用戶名稱' }}</p>
          <div class="dropDownMenu">
            <button class="btn btn-white px-3 rounded-pill" @click="openDropModel">
              <i
                :class="{
                  'bi-chevron-up': modalOpen === true,
                  'bi-chevron-down': modalOpen === false,
                }"
                class="bi"
              ></i>
            </button>
            <div class="dropDownMenu__dropdown" v-show="modalOpen === true">
              <ul class="list-group">
                <li class="list-group-header d-flex" @click="openTagertModel('diamondModel')">
                  <p class="text-primary">錢包</p>
                  <span class="ms-auto text-primary"
                    >{{ userData.myWallet }} SD <i class="bi bi-gem"></i>
                  </span>
                </li>
                <RouterLink :to="`/profile/${userData.user.id}`" class="list-group-item"
                  >查看個人檔案</RouterLink
                >
                <li @click="openTagertModel('emailModel')" class="list-group-item">客服支援</li>
                <li @click="userData.logOut" class="list-group-item">登出</li>
              </ul>
            </div>
          </div>
          <div v-show="modalOpen === true" class="dropdownBg" @click="openDropModel"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.list-group-item:hover {
  color: var(--bs-primary);
}
.header {
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  box-shadow: 0px 1px 1px #00000029;
  padding: 0 24px;
  @media (max-width: 998.98px) {
    justify-content: space-between;
    padding: 0.5rem 0;
  }
  .header-logo {
    position: absolute;
    left: 24px;
    @media (max-width: 998.98px) {
      position: relative;
    }
  }

  .menu-function {
    position: absolute;
    right: 24px;
    display: flex;
    @media (max-width: 998.98px) {
      position: relative;
    }
  }
}
.menu-navbar {
  display: flex;

  .menu-navbar-item {
    text-align: center;
    position: relative;
    &__link {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 0.5rem;
      padding: 1rem 3rem;
      text-decoration: none;
      font-size: 16px;
      color: #1d1d1d;
      position: relative;
      white-space: nowrap;
      &::after {
        content: '';
        width: 64%;
        height: 0;
        background-color: var(--bs-primary);
        border-radius: 0.25rem 0.25rem 0 0;
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        transition: all 0.3s;
      }
    }
    &:not(:first-child)::before {
      content: '';
      height: 48%;
      left: 0;
      top: 50%;
      border-left: 1px solid #d6d6d6;
      position: absolute;
      transform: translateY(-50%);
    }
    &.active {
      .menu-navbar-item__link {
        color: #892092;
      }
      .menu-navbar-item__link::after {
        height: 0.25rem;
      }
    }
  }
}
@media (max-width: 1199.98px) {
  .menu-navbar {
    .menu-navbar-item {
      .menu-navbar-item__link {
        padding: 1rem 1.5rem;
        gap: 0.25rem;
        font-size: 0.875rem;
        &::after {
          width: 80%;
        }
      }
    }
  }
}
@media (max-width: 991.98px) {
  .menu-navbar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: var(--bs-white);
    justify-content: center;
    border-top: 1px solid var(--bs-gray-middle);
    .menu-navbar-item {
      .menu-navbar-item__link {
        padding: 1rem 0.25rem;
        gap: 1rem;
        font-size: 0.875rem;
        &::after {
          width: 80%;
        }
      }
    }
  }
}
@media (max-width: 991.98px) {
  .menu-navbar {
    &-item {
      flex: 1;
    }
  }
}
@media (max-width: 800px) {
  .menu-navbar {
    .menu-navbar-item {
      .menu-navbar-item__link {
        flex-direction: column;
        padding: 0.5rem 0.25rem;
        gap: 0;
        font-size: 0.75rem;
        &::after {
          width: 80%;
        }
      }
    }
  }
}
@media (max-width: 576.98px) {
  .menu-navbar {
    .menu-navbar-item {
      .menu-navbar-item__link {
        flex-direction: column;
        padding: 0.25rem;
        gap: 0.1255rem;
        font-size: 0.75rem;
        &::after {
          width: 0%;
        }
      }
    }
  }
}
.userPhoto {
  width: 2rem;
  height: 2rem;
  border-radius: 100%;
  object-fit: cover;
  object-position: center;
  background: var(--bs-gray-light);
}
.dropdownBg {
  z-index: 200;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
.dropDownMenu {
  cursor: pointer;
  z-index: 201;
  &__dropdown {
    width: 180px;
    position: absolute;
    top: 48px;
    right: 0;
  }
}
.userName {
  max-width: 6rem;
  overflow: hidden;
  white-space: nowrap;
}
</style>
