<script>
import { ref } from 'vue';
import userStore from '@/stores/userStore';
import postsStore from '@/stores/postsStore';
import PostFilter from '@/components/front/PostFilter.vue';
import AddPostCard from '@/components/front/AddPostCard.vue';
import PostCard from '@/components/front/PostCard.vue';
import RecommendFollowCard from '@/components/front/RecommendFollowCard.vue';

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
    postsData.getPosts(2, 'asc', '');
    function sortPostsData() {
      postsData.getPosts(postSort.value, postQuery.value);
    }
    function checkLogin() {
      const token = localStorage.getItem('sd-token') || '123';
      console.log(token);
      userData.userToken = token;
    }
    checkLogin();
    return {
      postSort,
      postQuery,
      postsData,
      sortPostsData,
      userData,
    };
  },
};
</script>

<template>
  <div class="container d-flex">
    <div class="content">
      <PostFilter class="mb-3" />
      <AddPostCard class="mb-3" v-if="userData.userToken" />
      <PostCard class="mb-3" />
      <PostCard class="mb-3" />
    </div>
    <div class="side fix">
      <RecommendFollowCard />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
