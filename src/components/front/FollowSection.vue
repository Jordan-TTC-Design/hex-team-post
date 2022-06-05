<script>
import { reactive, onMounted } from 'vue';
import followStore from '@/stores/followStore';

export default {
  components: {},
  props: {
    userId: String,
  },
  setup(props) {
    const followings = reactive([]);
    const followData = followStore();

    onMounted(async () => {
      console.log(props.userId);
      if (props.userId) {
        try {
          const res = await followData.getUserFollow(props.userId);
          followings.push(...res);
        } catch (err) {
          console.error(err);
        }
      } else {
        const localUser = await JSON.parse(localStorage.getItem('sd-user'));
        try {
          const res = await followData.getMyFollow(localUser.token);
          followings.push(...res.data[0].following);
        } catch (err) {
          console.error(err);
        }
      }
    });

    return {
      props,
      followings,
    };
  },
};
</script>

<template>
  <div class="card mb-3" v-if="followings.length > 0">
    <div class="card-body">
      <div class="d-flex align-items-center mb-3 py-2" v-for="f in followings" :key="f.id">
        <div class="user-picture"></div>
        <div class="user-info">
          <RouterLink :to="`/profile/${f.id}`" class="user-info-title">{{ f.name }}</RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.side-menu-item {
  padding: 10px 0;
  text-align: center;
  font-size: 16px;
  columns: #1d1d1d;
  background: #fff;
  border-radius: 12px;

  &.active {
    background: var(--bs-secondary);
    color: var(--bs-primary);
  }
}
</style>
