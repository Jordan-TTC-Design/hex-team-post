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
    <div class="card-body d-flex flex-column gap-3">
      <template v-for="userItem in followings" :key="userItem._id">
        <RouterLink :to="`/profile/${userItem._id}`" class="followUser">
          <img
            class="user-picture"
            :src="userItem.photo || 'https://i.imgur.com/ZWHoRPi.png'"
            :alt="userItem.name"
          />
          <div class="user-info">
            <span class="user-info-title">{{ userItem.name }}</span>
            <span class="user-info-subtitle"
              >{{ userItem.followers.length }} 人追蹤 | 追蹤 {{ userItem.following.length }} 人 </span
            >
          </div>
        </RouterLink>
      </template>
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
.followUser {
  display: flex;
  align-items: center;
  cursor: pointer;
  position: relative;
  .user-info-title {
    transition: all 0.3s;
  }
  &:not(:last-child) {
    padding-bottom: 0.75rem;
    &::after {
      content: '';
      background-color: var(--bs-gray-middle);
      height: 1px;
      left: 0.25rem;
      right: 0.25rem;
      bottom: 0;
      position: absolute;
    }
  }

  &:hover {
    .user-info-title {
      color: var(--bs-primary);
    }
  }
}
</style>
