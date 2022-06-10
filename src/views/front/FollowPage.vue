<script>
import { ref } from 'vue';
import userStore from '@/stores/userStore';
import postsStore from '@/stores/postsStore';
import followStore from '@/stores/followStore';
import statusStore from '@/stores/statusStore';
import PostFilter from '@/components/front/PostFilter.vue';
import AddPostCard from '@/components/front/cards/AddPostCard.vue';
import PostCard from '@/components/front/cards/PostCard.vue';
import FollowingCard from '@/components/front/cards/FollowingCard.vue';

export default {
  components: {
    PostFilter,
    AddPostCard,
    PostCard,
    FollowingCard,
  },
  setup() {
    const userData = userStore();
    const postsData = postsStore();
    const statusData = statusStore();
    const followData = followStore();
    const following = ref([]);
    const isLoading = ref(false);
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
      isLoading.value = true;
      const result = await postsData.getMyFollowPosts(
        searchFilter.value.page,
        searchFilter.value.sort,
        searchFilter.value.query,
        userData.user.token,
      );
      if (result.data.data.length === 10) {
        morePostBtn.value = true;
      } else {
        morePostBtn.value = false;
      }
      isLoading.value = false;
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
      const res = await followData.getMyFollow(userData.user.token);
      following.value = [...res.data[0].following];
    }
    init();
    return {
      postsData,
      following,
      morePostBtn,
      isLoading,
      getMorePost,
      userData,
      search,
    };
  },
};
</script>

<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-xl-6 col-lg-8 col-12 d-flex flex-column gap-4">
        <PostFilter
          v-if="postsData.posts.length > 0"
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
        <AddPostCard v-if="userData.userToken" />
        <template v-for="postItem in postsData.posts" :key="postItem.id">
          <PostCard :post-item="postItem" />
        </template>
        <div v-if="morePostBtn" class="getMorePostBtn" @click="getMorePost">
          <p>點擊載入更多貼文...</p>
        </div>
        <div v-if="postsData.posts.length === 0 && !isLoading" class="noContentBox">
          <p>您尚未追蹤任何用戶～</p>
          <p>歡迎追蹤喜歡的用戶，即時了解他們的狀況!</p>
        </div>
      </div>
      <div class="col-lg-4 col-5 position-relative">
        <FollowingCard :following="following" />
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
