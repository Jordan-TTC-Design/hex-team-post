<script>
import userStore from '@/stores/userStore';
import statusStore from '@/stores/statusStore';

export default {
  setup(props) {
    const userData = userStore();
    const statusData = statusStore();
    return {
      props,
      userData,
      statusData,
    };
  },
};
</script>

<template>
  <div class="card" :class="props.class">
    <div class="card-body d-flex justify-content-between align-items-center">
      <div class="d-flex align-items-center gap-2">
        <img :src="userData.user.photo" alt="用戶圖片" class="user-picture" />
        <p>{{ userData.user.name }}</p>
      </div>
      <div class="d-flex align-items-center gap-2">
        <button @click="statusData.newPostModel = true" type="button" class="btn btn-default">
          <i class="webIcon--sm bi bi-plus-lg"></i> 新增貼文
        </button>
        <button @click="statusData.newPostModel = true" type="button" class="btn btn-default">
          <i class="webIcon--sm bi bi-plus-lg"></i> 私密日記
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
