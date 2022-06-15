<script>
import { ref, computed, onMounted } from 'vue';

import postsStore from '@/stores/postsStore';
import userStore from '@/stores/userStore';

import PostFilter from '@/components/front/PostFilter.vue';
import PostCard from '@/components/front/cards/PostCard.vue';

export default {
  components: {
    PostFilter,
    PostCard,
  },
  props: {
    user: Object,
  },
  setup(props) {
    const postsData = postsStore();
    const userData = userStore();
    const posts = computed(() => postsData.posts);
    const searchFilter = ref({});
    const morePostBtn = ref(false);
    const isLoading = ref(false);
    function resetFilter(sort = 'desc', query = '') {
      postsData.getPostsData.page = 1;
      isLoading.value = false;
      morePostBtn.value = false;
      searchFilter.value = {
        page: 1,
        sort,
        query,
        likes: userData.user.id,
      };
    }
    async function getPosts() {
      const result = await postsData.getPosts(
        searchFilter.value.page,
        searchFilter.value.sort,
        searchFilter.value.query,
        searchFilter.value.likes,
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
    async function search(data) {
      resetFilter(data.type, data.query);
      await getPosts();
    }
    onMounted(async () => {
      postsData.posts.length = 0;
      resetFilter();
      await getPosts();
    });

    return {
      props,
      posts,
      morePostBtn,
      isLoading,
      search,
    };
  },
};
</script>

<template>
  <div class="d-flex flex-column gap-4">
    <PostFilter
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
    <PostCard v-for="postItem in posts" :key="postItem.key" :post-item="postItem" />
    <div v-if="posts.length === 0 && isLoading" class="noContentBox noContentBox--sm">
      <p>無資料</p>
    </div>
    <div v-if="morePostBtn" class="getMorePostBtn" @click="getMorePost">
      <p>點擊載入更多貼文...</p>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
