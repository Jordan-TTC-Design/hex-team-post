<script>
import { ref } from 'vue';
import PostCard from '@/components/front/PostCard.vue';
import DynamicWall from '@/components/front/DynamicWall.vue';
import postsStore from '@/stores/postsStore';

export default {
  components: {
    PostCard,
    DynamicWall,
  },
  setup() {
    const postsData = postsStore();
    const postSort = ref('asc');
    const postQuery = ref('');
    postsData.getPosts();
    function sortPostsData() {
      postsData.getPosts(postSort.value, postQuery.value);
    }

    return {
      postSort,
      postQuery,
      postsData,
      sortPostsData,
    };
  },
};
</script>

<template>
  <div class="posts-page container">
    <div class="row">
      <div class="col-8">
        <div class="d-flex gap-3 mb-4">
          <select class="selectTool form-select" v-model="postSort" @change="sortPostsData">
            <option selected value="asc">最新貼文</option>
            <option selected value="desc">過去貼文</option>
          </select>
          <div class="input-group inputToolContainer flex-grow-1">
            <input
              type="text"
              class="form-control inputTool"
              placeholder="搜尋貼文"
              v-model="postQuery"
            />
            <button class="btn btn-primary" type="button" @click="sortPostsData">
              <i class="bi bi-search text-white"></i>
            </button>
          </div>
        </div>
        <div class="d-flex flex-column gap-4">
          <template v-for="postItem in postsData.posts" :key="postItem._id">
            <PostCard :post-item="postItem" />
          </template>
          <div v-show="postsData.posts.length === 0" class="postBox">
            <div class="postBox__top">
              <div class="postBox__top__dot"></div>
              <div class="postBox__top__dot"></div>
              <div class="postBox__top__dot"></div>
            </div>
            <div class="py-6 text-center">
              <p>目前尚無動態，新增一則貼文吧！</p>
            </div>
          </div>
        </div>
      </div>
      <div class="col-4">
        <DynamicWall />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.postBox {
  display: flex;
  flex-direction: column;
  border-radius: 0.5rem;
  border: 2px solid #000;
  box-shadow: 0px 3px 0px #000400;
}
.postBox__top {
  padding: 1rem;
  display: flex;
  gap: 0.25rem;
  border-bottom: 2px solid #000;
  &__dot {
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    border: 1px solid #000;
    &:nth-child(1) {
      background-color: red;
    }
    &:nth-child(2) {
      background-color: #faa722;
    }
    &:nth-child(3) {
      background-color: green;
    }
  }
}
</style>
