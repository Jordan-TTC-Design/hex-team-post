<script>
import { ref } from 'vue';

// import PostCard from '@/components/front/PostCard.vue';
import UserCard from '@/components/front/UserCard.vue';
import ArticleCard from '@/components/front/ArticleCard.vue';
import postsStore from '@/stores/postsStore';

export default {
  components: {
    UserCard,
    ArticleCard,
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
  <div class="container d-flex">
    <div class="content">
      <div class="mb-3">
        <div class="title mb-3">熱門關鍵字</div>
        <div>
          <span class="btn btn-xs btn-white me-3 mb-3">標籤文字</span>
          <span class="btn btn-xs btn-white me-3 mb-3">標籤文字</span>
          <span class="btn btn-xs btn-white me-3 mb-3">標籤文字</span>
          <span class="btn btn-xs btn-white me-3 mb-3">標籤文字</span>
          <span class="btn btn-xs btn-white me-3 mb-3">標籤文字</span>
          <span class="btn btn-xs btn-white me-3 mb-3">標籤文字</span>
          <span class="btn btn-xs btn-white me-3 mb-3">標籤文字</span>
        </div>
      </div>
      <div class="mb-3">
        <div class="title mb-3">本週熱門創作者</div>
        <div class="row gy-5">
          <div class="col-auto">
            <UserCard />
          </div>
          <div class="col-auto">
            <UserCard />
          </div>
          <div class="col-auto">
            <UserCard />
          </div>
          <div class="col-auto">
            <UserCard />
          </div>
          <div class="col-auto">
            <UserCard />
          </div>
          <div class="col-auto">
            <UserCard />
          </div>
          <div class="col-auto">
            <UserCard />
          </div>
          <div class="col-auto">
            <UserCard />
          </div>
        </div>
      </div>
      <div class="mb-3">
        <div class="title mb-3">本週熱門文章</div>
        <div class="row row-cols-2 gx-5">
          <div class="col">
            <ArticleCard />
          </div>
          <div class="col">
            <ArticleCard />
          </div>
        </div>
      </div>
      <div class="mb-3">
        <div class="title mb-3">熱門攝影創作者</div>
        <div class="row gy-5">
          <div class="col-auto">
            <UserCard />
          </div>
          <div class="col-auto">
            <UserCard />
          </div>
          <div class="col-auto">
            <UserCard />
          </div>
          <div class="col-auto">
            <UserCard />
          </div>
          <div class="col-auto">
            <UserCard />
          </div>
          <div class="col-auto">
            <UserCard />
          </div>
          <div class="col-auto">
            <UserCard />
          </div>
          <div class="col-auto">
            <UserCard />
          </div>
        </div>
      </div>
      <div class="mb-3">
        <div class="title mb-3">熱門文學創作者</div>
        <div class="row gy-5">
          <div class="col-auto">
            <UserCard />
          </div>
          <div class="col-auto">
            <UserCard />
          </div>
          <div class="col-auto">
            <UserCard />
          </div>
          <div class="col-auto">
            <UserCard />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.tmp {
  width: 300px;
  height: 300px;
}
</style>
