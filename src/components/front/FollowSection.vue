<script>
import { reactive, onMounted } from 'vue';
import axios from 'axios';
import userStore from '@/stores/userStore';

export default {
  components: {},
  props: {
    userId: String,
  },
  setup(props) {
    const followings = reactive([]);
    onMounted(async () => {
      const userData = userStore();
      const header = {
        headers: {
          Authorization: `${userData.user.token}`,
        },
      };

      if (props.userId) {
        try {
          const url = `https://hex-post-team-api-server.herokuapp.com/api/follow/${props.userId}`;
          const res = await axios.get(url, header);
          followings.push(...res.data.data[0].following);
        } catch (err) {
          console.err(err);
        }
      } else {
        try {
          const url = 'https://hex-post-team-api-server.herokuapp.com/api/follow/';
          const res = await axios.get(url, header);
          followings.push(...res.data.data[0].following);
        } catch (err) {
          console.err(err);
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
      <div
        class="d-flex align-items-center mb-3 py-2"
        v-for="f in followings"
        :key="f.id"
      >
        <div class="user-picture"></div>
        <div class="user-info">
          <RouterLink :to="`/profile/${f.id}`" class="user-info-title">{{
            f.name
          }}</RouterLink>
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
