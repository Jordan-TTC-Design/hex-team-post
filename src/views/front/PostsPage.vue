<script>
import { ref } from 'vue';
import userStore from '@/stores/userStore';
import postsStore from '@/stores/postsStore';
import PostFilter from '@/components/front/PostFilter.vue';
import AddPostCard from '@/components/front/cards/AddPostCard.vue';
import PostCard from '@/components/front/cards/PostCard.vue';
import RecommendFollowCard from '@/components/front/cards/RecommendFollowCard.vue';

export default {
  components: {
    PostFilter,
    AddPostCard,
    PostCard,
    RecommendFollowCard,
  },
  setup() {
    const userData = userStore();
    const postsData = postsStore();
    const postSort = ref('asc');
    const postQuery = ref('');
    postsData.getPosts(1, 'asc', '');
    function sortPostsData() {
      postsData.getPosts(1, postSort.value, postQuery.value);
    }
    return {
      userData,
      postsData,
      postSort,
      postQuery,
      sortPostsData,
    };
  },
};
</script>

<template>
  <div class="container d-flex postition-relative">
    <div class="content d-flex flex-column gap-4">
      <PostFilter />
      <AddPostCard v-if="userData.user.token" />
      <template v-for="postItem in postsData.posts" :key="postItem.id">
        <PostCard :post-item="postItem" />
      </template>
    </div>
    <div class="side fix">
      <RecommendFollowCard />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
