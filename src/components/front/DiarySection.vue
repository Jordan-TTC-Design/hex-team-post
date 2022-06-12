<script>
import { ref, reactive, onMounted } from 'vue';
// import axios from 'axios';
import userStore from '@/stores/userStore';
import postsStore from '@/stores/postsStore';
import statusStore from '@/stores/statusStore';
import PostFilter from '@/components/front/PostFilter.vue';
import DiaryCard from '@/components/front/cards/DiaryCard.vue';

export default {
  components: {
    PostFilter,
    DiaryCard,
  },
  props: {
    userId: String,
  },
  setup(props) {
    const postsData = postsStore();
    const statusData = statusStore();
    const userData = userStore();
    const isLogin = ref(false);
    const privates = reactive([]);
    const searchFilter = ref({});
    const isLoading = ref(false);
    const morePostBtn = ref(false);
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
      if (isLogin.value && props.userId === userData.user.id) {
        console.log('me');
        const result = await postsData.getMyDiary(
          userData.user.token,
          searchFilter.value.page,
          searchFilter.value.sort,
          searchFilter.value.query,
        );
        console.log(result);
        if (result.status === 'success') {
          if (result.data.data.length === 10) {
            morePostBtn.value = true;
          } else {
            morePostBtn.value = false;
          }
        }
      } else if (isLogin.value && props.userId !== userData.user.id) {
        const result = await postsData.getUserDiary(
          props.userId,
          userData.user.token,
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
      } else {
        const result = await postsData.getUserDiaryNoLogin(
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
      }
      isLoading.value = true;
    }
    async function getMorePost() {
      searchFilter.value.page += 1;
      getPosts();
    }
    async function search(data) {
      resetFilter(data.type, data.query, '');
      await getPosts();
    }
    onMounted(async () => {
      statusData.addLoading();
      await userData.getLocalToken();
      isLogin.value = await userData.checkLogIn(userData.user.token || '');
      await getPosts();
      statusData.shiftLoading();
    });

    return {
      props,
      privates,
      postsData,
      isLoading,
      morePostBtn,
      getMorePost,
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
    <template v-for="(diary, index) in postsData.diaries" :key="diary._id">
      <DiaryCard :post-index="index" :post-item="diary" />
    </template>
    <div v-if="postsData.diaries.length === 0 && isLoading" class="noContentBox noContentBox--sm">
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
