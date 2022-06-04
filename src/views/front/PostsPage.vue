<script>
import userStore from '@/stores/userStore';
import postsStore from '@/stores/postsStore';
import statusStore from '@/stores/statusStore';
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
    const statusData = statusStore();
    statusData.openPageLoader();
    function handleScroll() {
      if (window.scrollY + window.screen.height >= document.body.scrollHeight) {
        postsData.getPosts(
          postsData.getPostsData.page + 1,
          postsData.getPostsData.sort,
          postsData.getPostsData.query,
        );
      }
    }
    window.addEventListener('scroll', handleScroll);
    postsData.getPosts(
      postsData.getPostsData.page,
      postsData.getPostsData.sort,
      postsData.getPostsData.query,
    );
    return {
      userData,
      postsData,
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
        <template v-for="(postItem, index) in postsData.posts" :key="postItem.id">
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
  position: sticky;
  top: 5rem;
}
</style>
