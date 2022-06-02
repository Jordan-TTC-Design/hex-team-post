<script>
import { reactive, onMounted } from 'vue';
import axios from 'axios';
import userStore from '@/stores/userStore';

import PostFilter from '@/components/front/PostFilter.vue';
import PostCard from '@/components/front/cards/PostCard.vue';
import FormRadioButton from '@/components/helper/FormRadioButton.vue';

export default {
  components: {
    PostFilter,
    PostCard,
    FormRadioButton,
  },
  props: {
    userId: String,
  },
  setup(props) {
    const privates = reactive([]);
    onMounted(async () => {
      const userData = userStore();
      const header = {
        headers: {
          Authorization: `${userData.user.token}`,
        },
      };
      console.log('props.userId', !!props.userId);
      if (props.userId) {
        try {
          const url = `https://hex-post-team-api-server.herokuapp.com/api/posts/private/${props.userId}`;
          const res = await axios.get(url, header);
          privates.push(...res.data.data);
        } catch (err) {
          console.err(err);
        }
      } else {
        try {
          let url = 'https://hex-post-team-api-server';
          url += '.herokuapp.com/api/posts/private';
          const res = await axios.get(url, header);
          console.log(res.data.data);
          privates.push(...res.data.data);
        } catch (err) {
          console.err(err);
        }
      }
    });

    return {
      props,
      privates,
    };
  },
};
</script>

<template>
  <div class="d-flex mb-3">
    <FormRadioButton class="me-3" name="type">全部</FormRadioButton>
    <FormRadioButton class="me-3" name="type">永恆日記</FormRadioButton>
    <PostFilter class="flex-grow-1" />
  </div>
  <PostCard v-for="p in privates" :key="p._id"  :post-item="p"/>
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
