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
  <div class="container">
    <div class="row">
      <div class="col-8 d-flex flex-column gap-4">
        <PostFilter />
        <AddPostCard v-if="userData.userToken" />
        <template v-for="postItem in postsData.posts" :key="postItem.id">
          <PostCard :post-item="postItem" />
        </template>
      </div>
      <div class="col-4 position-relative">
        <RecommendFollowCard class="side-sticky-top" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.side-sticky-top {
  position: sticky;
  top: 5rem;
}
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
