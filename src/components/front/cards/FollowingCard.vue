<script>
import { ref } from 'vue';
import statusStore from '@/stores/statusStore';

export default {
  props: ['following'],
  setup() {
    const statusData = statusStore();
    const listShow = ref(false);
    function openModel() {
      listShow.value = true;
      statusData.noScroll = true;
    }
    function closeModel() {
      listShow.value = false;
      statusData.noScroll = false;
    }
    return {
      listShow,
      openModel,
      closeModel,
    };
  },
};
</script>
<template>
  <div class="sideBox gap-3">
    <div class="sideBox__card card gap-3" :class="{ active: listShow }">
      <div class="p-3 border-bottom d-flex gap-2 align-items-center">
        <button @click="closeModel" type="button" class="btn d-lg-none d-block">
          <i class="bi bi-chevron-left"></i>
        </button>
        <div class="card-title">我的追蹤</div>
      </div>
      <div class="followUserList card-body d-flex flex-column gap-3">
        <template v-for="userItem in following" :key="userItem._id">
          <RouterLink :to="`/profile/${userItem._id}`" class="followUser">
            <img
              class="user-picture"
              :src="userItem.photo || 'https://i.imgur.com/ZWHoRPi.png'"
              :alt="userItem.name"
            />
            <div class="user-info">
              <span class="user-info-title">{{ userItem.name }}</span>
            </div>
            <div class="btn btn-sm"><i class="bi bi-arrow-right-circle"></i></div>
          </RouterLink>
        </template>
        <p
          class="d-flex flex-grow-1 align-items-center justify-content-center text-gray-middle"
          v-if="following.length === 0"
        >
          目前尚未追蹤任何用戶
        </p>
      </div>
    </div>
    <button
      v-if="following.length > 0"
      @click="openModel"
      type="button"
      class="sideBtn d-lg-none d-block"
    >
      <i class="bi bi-person-square"></i>
    </button>
  </div>
</template>
<style lang="scss" scoped>
.followUserList {
  max-height: 50vh;
  overflow: auto;
  @media (max-width: 767.98px) {
    max-height: 100%;
  }
}
.followUser {
  display: flex;
  align-items: center;
  cursor: pointer;
  .btn {
    color: var(--bs-dark);
    transition: all 0.3s;
    &:hover {
      color: var(--bs-primary);
    }
  }
  .user-info-title {
    transition: all 0.3s;
  }
  &:hover {
    .btn {
      color: var(--bs-primary);
    }
    .user-info-title {
      color: var(--bs-primary);
    }
  }
}
</style>
