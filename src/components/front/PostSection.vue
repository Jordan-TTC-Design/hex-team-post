<script>
import { reactive, onMounted } from 'vue';
// import PostFilter from '@/components/front/PostFilter.vue';
import PostCard from '@/components/front/cards/PostCard.vue';
import axios from 'axios';
import userStore from '@/stores/userStore';
import PostFilter from '@/components/front/PostFilter.vue';

import statusStore from '@/stores/statusStore';

export default {
  components: {
    PostFilter,
    PostCard,
  },
  props: {
    userId: String,
  },
  setup(props) {
    const posts = reactive([]);
    const userData = userStore();
    const statusData = statusStore();

    const search = () => {

    };

    onMounted(async () => {
      statusData.addLoading();
      const header = {
        headers: {
          Authorization: `${userData.user.token}`,
        },
      };
      if (props.userId) {
        try {
          const url = `https://hex-post-team-api-server.herokuapp.com/api/posts/${props.userId}`;
          const res = await axios.get(url, header);
          posts.push(...res.data.data);
        } catch (err) {
          console.err(err);
        }
      } else {
        try {
          let url = 'https://hex-post-team-api-server';
          url += '.herokuapp.com/api/posts/?sort=asc';
          const res = await axios.get(url, header);
          posts.push(...res.data.data);
        } catch (err) {
          console.err(err);
        }
      }
      statusData.shiftLoading();
    });

    return {
      props,
      posts,
      search,
    };
  },
};
</script>

<template>
  <PostFilter class="mb-3" @search="search" header="排序" :items="[
    {
      name: '由新到舊',
      type: 'asc',
    },
  ]"/>
  <div>
    <PostCard v-for="p in posts" :key="p.id"  :post-item="p"/>
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
