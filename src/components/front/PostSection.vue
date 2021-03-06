<script>
import { ref, computed, onMounted } from 'vue';
import PostCard from '@/components/front/cards/PostCard.vue';
import postsStore from '@/stores/postsStore';
import statusStore from '@/stores/statusStore';
import PostFilter from '@/components/front/PostFilter.vue';

export default {
  components: {
    PostFilter,
    PostCard,
  },
  props: {
    userId: String,
  },
  setup(props) {
    const postsData = postsStore();
    const statusData = statusStore();
    const posts = computed(() => postsData.posts);
    const searchFilter = ref({});
    const morePostBtn = ref(false);
    const isLoading = ref(false);
    function resetFilter(sort = 'desc', query = '') {
      isLoading.value = false;
      morePostBtn.value = false;
      searchFilter.value = {
        page: 1,
        sort,
        query,
      };
      searchFilter.value.page = 1;
    }
    async function getPosts() {
      const result = await postsData.getUserPost(
        props.userId,
        searchFilter.value.page,
        searchFilter.value.sort,
        searchFilter.value.query,
      );
      if (result.status === 'success') {
        if (result.data.data.length === 10) {
          morePostBtn.value = true;
        } else {
          morePostBtn.value = false;
        }
      }
      isLoading.value = true;
    }
    async function getMorePost() {
      searchFilter.value.page += 1;
      getPosts();
    }
    async function search(data) {
      resetFilter(data.type, data.query, '');
      getPosts();
    }
    onMounted(async () => {
      statusData.addLoading();
      resetFilter('desc', '', '');
      getPosts();
      statusData.shiftLoading();
    });
    return {
      props,
      posts,
      morePostBtn,
      getMorePost,
      isLoading,
      search,
    };
  },
};
</script>

<template>
  <PostFilter
    class="mb-3"
    @search="search"
    header="排序"
    :items="[
      {
        name: '由新到舊',
        type: 'desc',
      },
      {
        name: '由舊到新',
        type: 'asc',
      },
    ]"
  />
  <div class="d-flex flex-column gap-4">
    <template v-for="(postItem, index) in posts" :key="postItem.id">
      <PostCard :post-index="index" :post-item="postItem" />
    </template>
    <div v-if="posts.length === 0 && isLoading" class="noContentBox noContentBox--sm">
      <p>無資料</p>
    </div>
    <div v-if="morePostBtn" class="getMorePostBtn" @click="getMorePost">
      <p>點擊載入更多貼文...</p>
    </div>
  </div>
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
