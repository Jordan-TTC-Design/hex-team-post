<script>
import userStore from '@/stores/userStore';
import statusStore from '@/stores/statusStore';

export default {
  setup() {
    const { user } = userStore();
    const statusData = statusStore();
    return { user, statusData };
  },
};
</script>

<template>
  <div class="dynamic-wall rounded d-flex flex-column gap-2 px-3 py-3">
    <button
      type="button"
      @click="statusData.newPostModel = true"
      class="btn--post btn d-flex align-items-center justify-content-center"
    >
      <p class="text-white">張貼動態</p>
    </button>
    <RouterLink to="/my-page" class="d-flex align-items-center gap-2 py-2">
      <img class="userPhoto" :src="user.photo" :alt="user.name" />
      <p>{{ user.name }}</p>
    </RouterLink>
    <RouterLink to="/follow" class="d-flex align-items-center gap-2 py-2">
      <i class="bi bi-bell"></i>
      <p>追蹤名單</p>
    </RouterLink>
    <RouterLink to="/thumb-up" class="d-flex align-items-center gap-2 py-2">
      <i class="bi bi-hand-thumbs-up"></i>
      <p>我按讚的文章</p>
    </RouterLink>
  </div>
</template>

<style lang="scss" scoped>
.dynamic-wall {
  border: 2px solid #000400;
  .btn--post {
    cursor: pointer;
    display: block;
    border-radius: 8px;
    border: 2px solid #000400;
    background: #03438d 0% 0% no-repeat padding-box;
    box-shadow: -2px 2px 0px #000400;
  }
}
.userPhoto {
  width: 44px;
  height: 44px;
  border: 2px solid #000400;
  border-radius: 100%;
  object-fit: cover;
  object-position: center;
  background: #e2edfa;
}
</style>
