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
    const morePostBtn = ref(false);
    function resetFilter(sort = 'desc', query = '') {
      postsData.getPostsData.page = 1;
      morePostBtn.value = false;
      searchFilter.value = {
        page: 1,
        sort,
        query,
      };
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
    }

    async function search(data) {
      resetFilter(data.type, data.query, '');
      getPosts();
    }
    onMounted(async () => {
      statusData.addLoading();
      await userData.getLocalToken();
      isLogin.value = await userData.checkLogIn(userData.user.token || '');
      console.log(isLogin.value);
      getPosts();

      // const header = {
      //   headers: {
      //     Authorization: `${userData.user.token}`,
      //   },
      // };
      console.log('props.userId', props.userId);
      // if (props.userId) {
      //   try {
      //     const url = `https://hex-post-team-api-server.herokuapp.com/api/posts/private/${props.userId}`;
      //     const res = await axios.get(url, header);
      //     privates.push(...res.data.data);
      //   } catch (err) {
      //     console.err(err);
      //   }
      // } else {
      //   try {
      //     let url = 'https://hex-post-team-api-server';
      //     url += '.herokuapp.com/api/posts/private';
      //     const res = await axios.get(url, header);
      //     console.log(res.data.data);
      //     privates.push(...res.data.data);
      //   } catch (err) {
      //     console.err(err);
      //   }
      // }
      statusData.shiftLoading();
    });

    return {
      props,
      privates,
      postsData,
      morePostBtn,
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
        name: '最新日記',
        type: 'asc',
      },
    ]"
  />
  <div class="d-flex flex-column gap-4">
    <template v-for="diary in postsData.diaries" :key="diary._id">
      <DiaryCard :post-item="diary" />
    </template>
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
