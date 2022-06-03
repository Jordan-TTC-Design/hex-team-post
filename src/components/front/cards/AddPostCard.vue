<script>
import userStore from '@/stores/userStore';
import postsStore from '@/stores/postsStore';

export default {
  setup(props) {
    const userData = userStore();
    const postsData = postsStore();
    return {
      props,
      userData,
      postsData,
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
        <button @click="postsData.openPostModel('group')" type="button" class="btn btn-default">
          <i class="webIcon--sm bi bi-plus-lg"></i> 新增貼文
        </button>
        <button @click="postsData.openPostModel('person')" type="button" class="btn btn-default">
          <i class="webIcon--sm bi bi-plus-lg"></i> 私密日記
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
