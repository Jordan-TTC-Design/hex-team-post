<script>
import { ref } from 'vue';
import userStore from '@/stores/userStore';
import postsStore from '@/stores/postsStore';
import statusStore from '@/stores/statusStore';
import followStore from '@/stores/followStore';
import PostFilter from '@/components/front/PostFilter.vue';
import DiaryCard from '@/components/front/cards/DiaryCard.vue';
import SubscribedCard from '@/components/front/SubscribedCard.vue';
import { useRouter } from 'vue-router';

export default {
  components: {
    PostFilter,
    DiaryCard,
    SubscribedCard,
  },
  setup() {
    const userData = userStore();
    const postsData = postsStore();
    const statusData = statusStore();
    const followData = followStore();
    const router = useRouter();
    const isLoading = ref(false);
    const diariesList = ref([]);
    const morePostBtn = ref(false);
    const searchFilter = ref({
      page: 1,
      sort: 'desc',
      query: '',
    });
    async function getMorePost() {
      searchFilter.value.page += 1;
      const result = await postsData.getBuyDiary(
        searchFilter.value.page,
        searchFilter.value.sort === 'like' ? 'asc' : searchFilter.value.sort,
        searchFilter.value.sort,
        searchFilter.value.sort === 'like' ? userData?.user?.id ?? '' : '',
        userData.user.token,
      );
      diariesList.value = [...result.data.data];
      postsData.diaries = diariesList.value;
      if (result.data.data.length < 10) {
        morePostBtn.value = false;
      }
    }

    function resetFilter(sort = 'desc', query = '') {
      postsData.getPostsData.page = 1;
      searchFilter.value = {
        page: 1,
        sort,
        query,
      };
    }
    const search = async (data) => {
      isLoading.value = true;
      resetFilter();
      const result = await postsData.getBuyDiary(
        postsData.getPostsData.page,
        data.type === 'like' ? 'asc' : data.type,
        data.query,
        data.type === 'like' ? userData?.user?.id ?? '' : '',
        userData.user.token,
      );
      diariesList.value = result.data.data;
      postsData.diaries = diariesList.value;
      if (result.data.data.length === 10) {
        morePostBtn.value = true;
      }
      isLoading.value = false;
    };
    async function init() {
      statusData.openPageLoader();
      const result = await userData.getLocalToken();
      if (!result) {
        router.push('/');
      }
      await postsData.getBuyDiary(postsData.getPostsData.page, 'desc', '', '', userData.user.token);
      await followData.getMySubscribed(userData.user.token);
    }
    init();
    return {
      postsData,
      userData,
      followData,
      isLoading,
      morePostBtn,
      getMorePost,
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
          @search="search"
          header="排序"
          :items="[
            {
              name: '最新購買',
              type: 'desc',
            },
            {
              name: '最初購買',
              type: 'asc',
            },
          ]"
        />
        <template v-for="(diaryItem, index) in postsData.diaries" :key="diaryItem.id">
          <DiaryCard :post-item="diaryItem" :post-index="index" />
        </template>
        <div v-if="morePostBtn" class="getMorePostBtn" @click="getMorePost">
          <p>點擊載入更多貼文...</p>
        </div>
        <div v-if="postsData.diaries.length === 0 && !isLoading" class="noContentBox">
          <p>尚未購買任何秘密日記或訂閱創作者</p>
        </div>
      </div>
      <div class="col-lg-4 col-5 position-relative">
        <SubscribedCard :user-list="followData.mySubscribed" />
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
