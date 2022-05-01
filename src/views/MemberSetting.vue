<script>
import { ref } from 'vue';

export default {
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
    return { postList };
  },
};
</script>
<template>
  <div class="container">
    <div class="row d-flex justify-content-center">
      <div class="col-7">
        <div class="pageTitleBox mb-6">
          <h2 class="fs-6 fw-bold">修改個人資料</h2>
        </div>
        <ul class="contentNav">
          <li class="contentNav__item active">暱稱修改</li>
          <li class="contentNav__item">重設密碼</li>
        </ul>
        <div class="border border-dark p-6 d-flex flex-column align-items-center">
          <div class="userImg mb-6">
            <img
              class="userImg__img"
              src="https://images.unsplash.com/photo-1648737155328-0c0012cf2f20?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
              alt="用戶底圖"
            />
          </div>
          <div class="w-75 d-flex flex-column gap-3">
            <div>
              <label for="setting-userName" class="form-label">暱稱</label>
              <input
                type="text"
                class="form-control inputTool"
                placeholder="請輸入您的暱稱"
                id="setting-userName"
                aria-label="Username"
              />
            </div>
            <div>
              <label class="form-label">性別</label>
              <div class="d-flex gap-4">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="setting-gender"
                    id="setting-gender-male"
                  />
                  <label class="form-check-label" for="setting-gender-male"> 男性 </label>
                </div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="setting-gender"
                    id="setting-gender-female"
                    checked
                  />
                  <label class="form-check-label" for="setting-gender-female"> 女性 </label>
                </div>
              </div>
            </div>
            <button type="button" class="btn btn-primary">送出更新</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.pageTitleBox {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem;
  position: relative;
  border: 2px solid #000;
  background-color: white;
  transform-style: preserve-3d;
  &::after {
    content: '';
    height: 100%;
    width: 100%;
    position: absolute;
    border: 2px solid #000;
    top: 0.35rem;
    right: 0.35rem;
    transform: translateZ(-1px);
  }
}
.userImg {
  border-radius: 50%;
  border: 2px solid #000;
  width: 108px;
  height: 108px;
  position: relative;
  &__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }
  &::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 50%;
    transition: all 0.3s;
    cursor: pointer;
  }
  &:hover {
    &::after {
      background-color: rgba(0, 0, 0, 0.5);
    }
  }
}
.contentNav {
  display: flex;
  &__item {
    padding: 0.25rem 1rem;
    border: 2px solid #000;
    border-bottom: 0;
    border-radius: 0.5rem 0.5rem 0 0;
    color: black;
    transition: all 0.3s;
    cursor: pointer;
    &:hover {
      background-color: gray;
    }
    &.active {
      background-color: black;
      color: white;
    }
  }
}
</style>
