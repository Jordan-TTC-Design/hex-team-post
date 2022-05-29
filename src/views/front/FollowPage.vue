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
    postsData.getPosts();
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
    <div class="side fix">
      <RecommendFollowCard />
    </div>
    <div class="content">
      <PostFilter class="mb-3" />
      <AddPostCard class="mb-3" v-if="userData.userToken" />
      <PostCard class="mb-3" />
      <PostCard class="mb-3" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.thumbUpBox {
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 0px #000400;
  border: 2px solid #000400;
  border-radius: 8px;
  opacity: 1;
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  background-color: white;
  transition: all 0.3s;
  &__img {
    width: 40px;
    height: 40px;
    object-fit: cover;
    border-radius: 50%;
    border: 2px solid #000;
  }
  &:hover {
    background-color: #f7f7f7;
  }
}
</style>
