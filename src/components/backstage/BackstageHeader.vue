<script>
import backStatusStore from '@/stores/backstage/backStatusStore';

export default {
  setup() {
    const backstatusData = backStatusStore();
    return {
      backstatusData,
    };
  },
};
</script>

<template>
  <nav class="backstageHeader">
    <div class="backstageHeader__logoBox">
      <img class="logo" src="@/assets/image/logo-row.svg" alt="sdlogo" />
      <button type="button" class="btn"><i class="webIcon bi bi-list"></i></button>
    </div>
    <div class="flex-grow-1">
      <div class="px-3 py-6 border-bottom">
        <div class="d-flex align-items-center bg-gray-light rounded p-3 pe-4">
          <div class="user-picture bg-white"></div>
          <p class="d-flex justify-content-between align-items-center flex-grow-1">
            User Name<i class="webIcon bi bi-sliders"></i>
          </p>
        </div>
      </div>
      <div class="backstageHeader__nav">
        <template v-for="navItem in backstatusData.backHeaderNav" :key="navItem.name">
          <RouterLink
            :class="{ active: backstatusData.nowPage === navItem.name }"
            :to="navItem.link"
            class="backstageHeader__nav__item border-bottom"
          >
            {{ navItem.name }}
          </RouterLink>
        </template>
      </div>
    </div>
    <div class="backstageHeader__logoutBox">
      <p>Logout</p>
      <i class="webIcon bi bi-box-arrow-right"></i>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
.backstageHeader {
  width: 270px;
  left: 270px;
  margin-left: -270px;
  position: fixed;
  top: 0;
  bottom: 0;
  box-shadow: 1px 0px 2px #00000029;
  border-right: 1px solid var(--bs-primary);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  &__logoBox {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem;
    border-bottom: 1px solid var(--bs-primary);
    background-color: var(--bs-secondary);
    .webIcon {
      font-size: 1.25rem;
      color: #1d1d1d;
    }
  }
  .logo {
    height: 48px;
  }
  &__logoutBox {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem 0.75rem;
    background-color: var(--bs-gray-light);
    p,
    .webIcon {
      color: var(--bs-black);
    }
  }
}
.backstageHeader__nav__item {
  padding: 10px 24px;
  line-height: 1.5;
  display: block;
  color: #1d1d1d;
  text-decoration: none;
  cursor: pointer;
  &.active {
    background-color: var(--bs-secondary);
    position: relative;
    color: var(--bs-primary);

    &::after {
      position: absolute;
      content: '';
      right: 0;
      height: 36px;
      top: 4px;
      border-left: 4px solid var(--bs-primary);
      border-top-left-radius: 12px;
      border-bottom-left-radius: 12px;
    }
  }
}
</style>
