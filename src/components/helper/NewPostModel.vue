<script>
import { ref } from 'vue';
import postsStore from '@/stores/postsStore';
import statusStore from '@/stores/statusStore';
import userStore from '@/stores/userStore';
import FormArticle from '@/components/helper/FormArticle.vue';

export default {
  components: {
    FormArticle,
  },
  setup() {
    const userData = userStore();
    const postsData = postsStore();
    const statusData = statusStore();
    const imgUploadGetter = ref(null);
    const newPost = ref({
      user: '62729881e8a0d4cba032e7bc',
      postContent: '',
      postImgUrl: '',
    });
    function toogleGetter() {
      const [file] = imgUploadGetter.value.files;
      console.log(file);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        newPost.value.postImgUrl = e.target.result;
      };
    }
    function toogleAddPost() {
      // postsData.targetPost.postContent = newPost.value.postContent;
      // postsData.targetPost.postImgUrl = newPost.value.postImgUrl;
      console.log(newPost.value);
      // postsData.addPost(newPost.value);
    }
    function getPost(ff) {
      console.log(ff);
      // newPost.value.postContent = ff;
    }
    return {
      imgUploadGetter,
      postsData,
      statusData,
      newPost,
      userData,
      toogleGetter,
      toogleAddPost,
      getPost,
    };
  },
};
</script>

<template>
  <div
    class="popModalContainer position-fixed top-0 left-0 z-popModal"
    :class="{ active: statusData.newPostModel === true }"
  >
    <!-- Modal-Overlay -->
    <div class="popModalCover" @click="statusData.newPostModel = false" />

    <!-- Modal-Window -->
    <div class="popModal" :class="{ active: statusData.newPostModel === true }">
      <div class="position-relative border-bottom border-dark p-4 d-flex justify-content-center">
        <h4 class="fs-5 text-center">新增貼文</h4>
        <button
          @click="statusData.newPostModel = false"
          type="button"
          class="btn position-absolute top-50 end-0 translate-middle"
        >
          x
        </button>
      </div>
      <div class="d-flex flex-column gap-2 p-4 h-75 flex-grow-1">
        <div class="d-flex d-flex align-items-center gap-2 py-2">
          <img class="userPhoto" :src="userData.user.photo" :alt="userData.user.name" />
          <p>{{ userData.user.name }}</p>
        </div>
        <div class="newPostContentBox">
          <FormArticle
            input-id="postContent"
            input-name="postContent"
            text-holder="在想什麼呢？"
            v-model="newPost.postContent"
            @targetText="getPost"
          />
          <div v-show="newPost.postImgUrl.length > 0" class="newPost__imgBox">
            <img :src="newPost.postImgUrl" alt="貼文圖片" class="newPost__imgBox__img" />
          </div>
        </div>
        <div class="d-flex flex-column gap-2">
          <label for="imgUploader" class="newPostUpLoader">{{
            newPost.postImgUrl.length > 0 ? '變更圖片' : '新增圖片'
          }}</label>
          <input
            ref="imgUploadGetter"
            id="imgUploader"
            class="d-none"
            type="file"
            @change="toogleGetter"
          />
          <button
            type="button"
            @click="toogleAddPost"
            class="w-100 bg-black text-white rounded py-2 px-3"
          >
            發布
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.z-popModal {
  z-index: 2400;
}
.popModalContainer {
  height: 100vh;
  width: 100vw;
  transition: all 0.3s;
  pointer-events: none;
  .popModalCover {
    background-color: rgba(0, 0, 0, 0);
    transition: all 0.3s;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }
  .popModal {
    opacity: 1;
    z-index: 100;
    position: absolute;
    border-radius: 0.5rem;
    opacity: 0;
    transform: scaleY(0) translate(-50%, -50%);
    left: 50%;
    top: 40%;
    transition: all 0.3s;
    background-color: #fff;
    width: 600px;
    height: 80vh;
    display: flex;
    flex-direction: column;

    @media (max-width: 998.98px) {
      width: 60vw;
    }
    @media (max-width: 767.98px) {
      width: 75vw;
    }
    @media (max-width: 575.98px) {
      width: 100vw;
      height: 100vh;
      border-radius: 0;
    }
  }
}

.popModalContainer.active {
  pointer-events: auto;
  .popModalCover {
    background-color: rgba(0, 0, 0, 0.5);
  }
  .popModal {
    opacity: 1;
    left: 50%;
    top: 50%;
    transform: scaleY(1) translate(-50%, -50%);
  }
}
.userPhoto {
  width: 44px;
  height: 44px;
  border: 2px solid #000400;
  border-radius: 100%;
  object-fit: cover;
  object-position: center;
  background: #e2edfa;
}
.newPostContentBox {
  flex-shrink: 1;
  flex-grow: 1;
  overflow-y: auto;
}
.newPostContentBox::-webkit-scrollbar {
  border: none;
  width: 0.5rem;
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 0.5rem;
}
.newPostContentBox::-webkit-scrollbar-thumb {
  background-color: #dddddd;
  border-radius: 0.5rem;
}
.newPostUpLoader {
  border: 1px solid #e2e2e2;
  padding: 0.5rem;
  border-radius: 0.5rem;
  text-align: center;
  cursor: pointer;
  display: block;
}
.newPost__imgBox {
  max-width: 100%;
  height: 320px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f7f7f7;
  border: 1px solid #e2e2e2;
  border-radius: 0.5rem;
  &__img {
    max-width: 95%;
    max-height: 95%;
  }
}
</style>
