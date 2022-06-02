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
  <div class="container position-relative">
    <div class="row">
      <div class="col-8 d-flex flex-column gap-4">
        <PostFilter />
        <AddPostCard v-if="userData.user.token" />
        <template v-for="(postItem,index) in postsData.posts" :key="postItem.id">
          <PostCard :post-item="postItem" :post-index="index" />
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
  position:sticky;
  top:5rem;
}
</style>
