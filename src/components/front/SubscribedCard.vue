<script>
import { ref } from 'vue';
import statusStore from '@/stores/statusStore';
import moment from 'moment';

export default {
  props: ['userList'],
  setup() {
    const statusData = statusStore();
    const listShow = ref(false);
    function expiredTime(time) {
      const result = moment(time).locale('zh-tw').format('YYYY/MM/DD');
      return result;
    }
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
      expiredTime,
      openModel,
      closeModel,
    };
  },
};
</script>

<template>
  <div class="sideBox gap-3">
    <div class="sideBox__card card" :class="{ active: listShow }">
      <div class="p-3 border-bottom d-flex gap-2 align-items-center">
        <button @click="closeModel" type="button" class="btn d-lg-none d-block">
          <i class="bi bi-chevron-left"></i>
        </button>
        <div class="card-title">我的訂閱名單</div>
      </div>
      <div class="card-body d-flex flex-column gap-3">
        <template v-for="(userItem, index) in userList" :key="userItem.id">
          <RouterLink :to="`/profile/${userItem.id}`" v-if="index < 5" class="followUser">
            <img
              class="user-picture"
              :src="userItem.photo || 'https://i.imgur.com/ZWHoRPi.png'"
              :alt="userItem.name"
            />
            <div class="user-info">
              <span class="user-info-title">{{ userItem.name }}</span>
              <span class="user-info-subtitle"
                >{{ expiredTime(userItem.effectiveOfEnd) }} 訂閱到期</span
              >
            </div>
            <div class="btn btn-sm"><i class="bi bi-arrow-right-circle"></i></div>
          </RouterLink>
        </template>
        <p
          class="d-flex flex-grow-1 align-items-center justify-content-center text-gray-middle"
          v-if="userList.length === 0"
        >
          目前尚未訂閱任何創作者
        </p>
      </div>
    </div>
    <button
      v-if="userList.length > 0"
      @click="openModel"
      type="button"
      class="sideBtn d-lg-none d-block"
    >
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
