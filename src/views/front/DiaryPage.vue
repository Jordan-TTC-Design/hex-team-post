<script>
import { ref, onMounted, onUnmounted } from 'vue';
import userStore from '@/stores/userStore';
import postsStore from '@/stores/postsStore';
import statusStore from '@/stores/statusStore';
import PostFilter from '@/components/front/PostFilter.vue';
import DiaryCard from '@/components/front/cards/DiaryCard.vue';
import DiaryPurchaseRecordCard from '@/components/front/DiaryPurchaseRecordCard.vue';

export default {
  components: {
    PostFilter,
    DiaryCard,
    DiaryPurchaseRecordCard,
  },
  setup() {
    const userData = userStore();
    const postsData = postsStore();
    const statusData = statusStore();
    statusData.openPageLoader();
    const diariesList = ref([]);
    const pageInfo = ref(null);
    const nowPage = ref(0);
    const filterData = ref({
      type: '',
      query: '',
    });
    const localUser = ref(null);
    const likesList = ref([]);
    async function search(data, page = 1) {
      console.log(data);
      diariesList.value = [];
      const result = await postsData.getBuyDiary(
        page,
        data.type === 'like' ? 'asc' : data.type,
        data.query,
        data.type === 'like' ? userData?.user?.id ?? '' : '',
        localUser.value.token,
      );
      filterData.value.type = data.type;
      filterData.value.query = data.query;
      console.log(result);
      pageInfo.value = { ...result.data.paging };
      if (pageInfo.value) {
        diariesList.value = [...result.data.data];
        postsData.diaries = diariesList.value;
        nowPage.value += 1;
      }
    }
    async function getMoreDiary(page) {
      const result = await postsData.getBuyDiary(
        page,
        filterData.value.type === 'like' ? 'asc' : filterData.value.type,
        filterData.value.type,
        filterData.value.type === 'like' ? userData?.user?.id ?? '' : '',
        localUser.value.token,
      );
      diariesList.value = [...result.data.data];
      postsData.diaries = diariesList.value;
    }
    function handleScroll() {
      if (window.scrollY + window.screen.height >= document.body.scrollHeight) {
        if (nowPage.value < pageInfo.value.total_pages) {
          getMoreDiary(nowPage.value + 1);
        }
      }
    }
    onMounted(async () => {
      window.addEventListener('scroll', handleScroll);
    });
    onUnmounted(() => {
      window.addEventListener('scroll', handleScroll);
    });
    async function init() {
      localUser.value = JSON.parse(localStorage.getItem('sd-user'));
      const tempLikes = await postsData.getBuyDiary(
        1,
        '',
        '',
        localUser.value.id,
        localUser.value.token,
      );
      likesList.value = tempLikes.data.data;
      console.log(likesList.value);
    }
    init();
    return {
      postsData,
      userData,
      nowPage,
      likesList,
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
      </div>
      <div class="col-lg-4 col-5 position-relative">
        <DiaryPurchaseRecordCard :likes-list="likesList" />
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
