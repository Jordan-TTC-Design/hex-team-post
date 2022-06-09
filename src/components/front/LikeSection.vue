<script>
import { ref, onMounted } from 'vue';
import postsStore from '@/stores/postsStore';
import userStore from '@/stores/userStore';

import PostCard from '@/components/front/cards/PostCard.vue';

export default {
  components: {
    PostCard,
  },
  props: {
    user: Object,
  },
  setup(props) {
    const postsData = postsStore();
    const userData = userStore();

    const posts = ref([]);
    //       postsData.getPosts(postSort.value, postQuery.value);

    onMounted(async () => {
      const res = await postsData.getPosts(1, 'asc', '', userData.user.id);
      console.log(res.data);
      posts.value = [...res.data];
    });

    return {
      props,
      posts,
    };
  },
};
</script>

<template>
  <div class="d-flex flex-column gap-4">
    <PostCard v-for="postItem in posts" :key="postItem.key" :post-item="postItem" />
    <div v-if="posts.length === 0" class="noContentBox noContentBox--sm">
      <p>您尚未按任何貼文愛心</p>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
