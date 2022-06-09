<script>
import { ref } from 'vue';
import userStore from '@/stores/userStore';
import postsStore from '@/stores/postsStore';
import statusStore from '@/stores/statusStore';
import PostFilter from '@/components/front/PostFilter.vue';
import AddPostCard from '@/components/front/cards/AddPostCard.vue';
import PostCard from '@/components/front/cards/PostCard.vue';
import RecommendFollowCard from '@/components/front/cards/RecommendFollowCard.vue';
import followStore from '@/stores/followStore';

export default {
  components: {
    PostFilter,
    AddPostCard,
    PostCard,
    RecommendFollowCard,
  },
  setup() {
    const userData = userStore();
    const followData = followStore();
    const postsData = postsStore();
    const statusData = statusStore();
    const usersList = ref([]);
    const morePostBtn = ref(false);
    const searchFilter = ref({});
    function resetFilter(sort = 'desc', query = '', likes = '') {
      postsData.getPostsData.page = 1;
      searchFilter.value = {
        page: 1,
        sort,
        query,
        likes,
      };
    }
    async function getPosts() {
      const result = await postsData.getPosts(
        searchFilter.value.page,
        searchFilter.value.sort,
        searchFilter.value.query,
        searchFilter.value.likes,
      );
      if (result.data.data.length === 10) {
        morePostBtn.value = true;
      } else {
        morePostBtn.value = false;
      }
    }
    async function search(data) {
      if (data.type === 'like') {
        resetFilter(data.type, data.query, userData?.user?.id);
      } else {
        resetFilter(data.type, data.query, '');
      }
      getPosts();
    }
    async function getMorePost() {
      searchFilter.value.page += 1;
      getPosts();
    }
    async function init() {
      statusData.openPageLoader();
      resetFilter();
      getPosts();
      usersList.value = await followData.getHotUser();
    }
    init();
    return {
      userData,
      postsData,
      usersList,
      morePostBtn,
      search,
      getMorePost,
    };
  },
};
</script>

<template>
  <div class="container position-relative">
    <div class="row justify-content-center">
      <div class="col-xl-6 col-lg-8 col-12 d-flex flex-column gap-4">
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
            {
              name: '按讚的貼文',
              type: 'like',
            },
          ]"
        />
        <AddPostCard v-if="userData.user.token" />
        <template v-for="(postItem, index) in postsData.posts" :key="postItem.id">
          <PostCard :post-item="postItem" :post-index="index" />
        </template>
        <div v-if="morePostBtn" class="getMorePostBtn" @click="getMorePost">
          <p>點擊載入更多貼文...</p>
        </div>
      </div>
      <div class="col-lg-4 col-5 position-relative">
        <RecommendFollowCard :user-list="usersList" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
