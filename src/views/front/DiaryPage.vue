<script>
import { ref } from 'vue';
import userStore from '@/stores/userStore';
import postsStore from '@/stores/postsStore';
import PostFilter from '@/components/front/PostFilter.vue';
import FormRadioButton from '@/components/helper/FormRadioButton.vue';
import PostCard from '@/components/front/cards/PostCard.vue';
import DiaryPurchaseRecordCard from '@/components/front/DiaryPurchaseRecordCard.vue';

export default {
  components: {
    PostFilter,
    FormRadioButton,
    PostCard,
    DiaryPurchaseRecordCard,
  },
  setup() {
    const userData = userStore();
    const postsData = postsStore();
    const postSort = ref('asc');
    const postQuery = ref('');
    postsData.getPosts();
    function sortPostsData() {
      postsData.getPosts(postSort.value, postQuery.value);
    }
    function checkLogin() {
      const token = localStorage.getItem('sd-token') || '123';
      console.log(token);
      userData.userToken = token;
    }
    checkLogin();

    return {
      postSort,
      postQuery,
      postsData,
      sortPostsData,
      userData,
    };
  },
};
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col-8 content">
        <div class="d-flex mb-3">
          <FormRadioButton class="me-3" name="type">全部</FormRadioButton>
          <FormRadioButton class="me-3" name="type">永恆日記</FormRadioButton>
          <PostFilter class="flex-grow-1" />
        </div>
        <PostCard class="mb-3" />
        <PostCard class="mb-3" />
      </div>
      <div class="col-4">
        <DiaryPurchaseRecordCard  class="side-sticky-top"/>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.side-sticky-top {
  position:sticky;
  top:5rem;
}</style>
