<script>
import { ref, onMounted } from 'vue';
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
    statusData.openPageLoader();
    const following = ref([]);
    const postSort = ref('asc');
    const postQuery = ref('');
    postsData.getPosts();
    function sortPostsData() {
      postsData.getPosts(postSort.value, postQuery.value);
    }
    const search = (data) => {
      console.log(data, data.type, data.type === 'like');
      postsData.getPosts(
        postsData.getPostsData.page,
        data.type === 'like' ? 'asc' : data.type,
        data.query,
        data.type === 'like' ? userData?.user?.id ?? '' : '',
      );
    };
    onMounted(async () => {
      const localUser = await JSON.parse(localStorage.getItem('sd-user'));
      const res = await followData.getMyFollow(localUser.token);
      console.log(res);
      following.value = [...res.data[0].following];
    });
    return {
      postSort,
      postQuery,
      postsData,
      following,
      sortPostsData,
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
        <PostFilter @search="search" header="排序" :items="[
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
        ]"/>
        <AddPostCard v-if="userData.userToken" />
        <template v-for="postItem in postsData.posts" :key="postItem.id">
          <PostCard :post-item="postItem" />
        </template>
      </div>
      <div class="col-lg-4 col-5 position-relative">
        <FollowingCard  :following="following"/>
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
