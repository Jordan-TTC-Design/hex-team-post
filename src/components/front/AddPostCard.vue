<script>
import userStore from '@/stores/userStore';

export default {
  setup(props) {
    const userData = userStore();

    return {
      props,
      userData,
    };
  },
};
</script>

<template>
  <div class="card" :class="props.class">
    <div class="card-body d-flex align-items-center">
      <img :src="userData.user.photo" alt="" class="user-picture" />
      <div class="btn btn-default ms-auto me-3">
        <i class="bi bi-plus-lg"></i> 私密日記
      </div>
      <div class="btn btn-default"><i class="bi bi-plus-lg"></i> 新增貼文</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
</style>
