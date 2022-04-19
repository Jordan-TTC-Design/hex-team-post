<script>
import { ref } from 'vue';
import PostCard from '@/components/PostCard.vue';

export default {
  components: {
    PostCard,
  },
  setup() {
    const postList = ref([
      {
        _id: '123',
        userName: '邊緣小傑',
        userImgUrl:
          'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
        creatAt: '2022/1/10 12:00',
        postContent: '<p>搶到想要的 NFT 啦！ya~~</p><p>搶到想要的 NFT 啦！ya~~</p>',
        postImgUrl:
          'https://images.unsplash.com/photo-1505440484611-23c171ad6e96?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1154&q=80',
      },
      {
        _id: '456',
        userName: '波吉',
        userImgUrl:
          'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
        creatAt: '2022/1/10 12:00',
        postContent: '<p>我一定要成為很棒棒的國王</p><p>搶到想要的 NFT 啦！ya~~</p>',
        postImgUrl:
          '',
      },
      {
        _id: '456',
        userName: '阿爾敏',
        userImgUrl:
          'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
        creatAt: '2022/1/10 12:00',
        postContent: '<p>各位我有一個計畫</p><p>搶到想要的 NFT 啦！ya~~</p>',
        postImgUrl:
          '',
      },
    ]);
    return { postList };
  },
};
</script>
<template>
  <div class="container">
    <div class="row d-flex justify-content-center">
      <div class="col-7">
        <div class="d-flex flex-column gap-4">
          <template v-for="postItem in postList" :key="postItem._id">
            <PostCard :post-item="postItem" />
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.postBox {
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  border-radius: 0.5rem;
  border: 2px solid #000;
  box-shadow: 0px 3px 0px #000400;
}
.userBox {
  display: flex;
  &__pic {
    width: 45px;
    height: 45px;
    border-radius: 50%;
    border: 2px solid #000;
    object-fit: cover;
  }
  &__title {
    font-weight: bold;
    color: #000;
  }
  &__subTxt {
    font-size: 0.75rem;
    color: #9b9893;
  }
}
.postBox__content {
  display: flex;
  flex-direction: column;
  &__img {
    max-height: 10rem;
    width: 100%;
    object-fit: cover;
    border: 2px solid #000;
    border-radius: 0.5rem;
  }
}
</style>
