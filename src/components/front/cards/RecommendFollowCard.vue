<script>
import { ref } from 'vue';

export default {
  props: ['userList'],
  setup() {
    const listShow = ref(false);
    return { listShow };
  },
};
</script>

<template>
  <div class="sideBox gap-3">
    <div class="sideBox__card card" :class="{ active: listShow }">
      <div class="p-3 border-bottom d-flex gap-2 align-items-center">
        <button @click="listShow = !listShow" type="button" class="btn d-lg-none d-block">
          <i class="bi bi-chevron-left"></i>
        </button>
        <div class="card-title">推薦追蹤</div>
      </div>
      <div class="card-body d-flex flex-column gap-3">
        <template v-for="(userItem, index) in userList" :key="userItem._id">
          <RouterLink :to="`/profile/${userItem._id}`" v-if="index < 5" class="followUser">
            <img
              class="user-picture"
              :src="userItem.photo || 'https://i.imgur.com/ZWHoRPi.png'"
              :alt="userItem.name"
            />
            <div class="user-info">
              <span class="user-info-title">{{ userItem.name }}</span>
              <span class="user-info-subtitle">{{ userItem.followersSize }} 人追蹤</span>
            </div>
            <div class="btn btn-sm"><i class="bi bi-arrow-right-circle"></i></div>
          </RouterLink>
        </template>
      </div>
    </div>
    <button @click="listShow = !listShow" type="button" class="sideBtn d-lg-none d-block">
      <i class="bi bi-binoculars-fill"></i>
    </button>
  </div>
</template>

<style lang="scss" scoped>
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
