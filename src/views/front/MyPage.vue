<script>
import { ref } from 'vue';
import PostCard from '@/components/front/PostCard.vue';
import DynamicWall from '@/components/front/DynamicWall.vue';
import userStore from '@/stores/userStore';

export default {
  components: {
    PostCard,
    DynamicWall,
  },
  setup() {
    const userData = userStore();
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
        postImgUrl: '',
      },
      {
        _id: '456',
        userName: '阿爾敏',
        userImgUrl:
          'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
        creatAt: '2022/1/10 12:00',
        postContent: '<p>各位我有一個計畫</p><p>搶到想要的 NFT 啦！ya~~</p>',
        postImgUrl: '',
      },
    ]);
    return { postList, userData };
  },
};
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col-8">
        <div class="personBox mb-3">
          <div class="personImgBox">
            <img class="personImgBox__img" :src="userData.user.photo" alt="用戶照片" />
          </div>
          <div class="flex-grow-1 d-flex justify-content-between align-items-center p-3">
            <div>
              <p class="text--title">{{ userData.user.name }}</p>
              <p class="text--subTxt">9898人追蹤</p>
            </div>
            <button type="button" class="btn btn-outline-dark">設定</button>
          </div>
        </div>
        <div class="d-flex gap-3 mb-4">
          <select class="selectTool form-select">
            <option selected value="最新">最新貼文</option>
          </select>
          <div class="input-group inputToolContainer flex-grow-1">
            <input
              type="text"
              class="form-control inputTool"
              placeholder="搜尋貼文"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
            <button class="btn btn-primary" type="button">
              <i class="bi bi-search text-white"></i>
            </button>
          </div>
        </div>
        <div class="d-flex flex-column gap-4">
          <template v-for="postItem in postList" :key="postItem._id">
            <PostCard :post-item="postItem" />
          </template>
        </div>
      </div>
      <div class="col-4">
        <DynamicWall />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.personBox {
  display: flex;
  position: relative;
  border: 2px solid #000;
  background-color: white;
  border-radius: 0.5rem;
  transform-style: preserve-3d;
  &::after {
    content: '';
    height: 100%;
    width: 100%;
    position: absolute;
    border: 2px solid #000;
    border-radius: 0.5rem;
    top: 0.35rem;
    right: 0.35rem;
    transform: translateZ(-1px);
  }
  .personImgBox {
    width: 80px;
    height: 80px;
    border-right: 2px solid #000;
    &__img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 0.5rem 0 0 0.5rem;
    }
  }
}
</style>
