<script>
import { ref } from 'vue';
import postsStore from '@/stores/postsStore';
import statusStore from '@/stores/statusStore';
import userStore from '@/stores/userStore';

export default {
  setup() {
    const userData = userStore();
    const postsData = postsStore();
    const statusData = statusStore();
    const imgUploadGetter = ref(null);
    const editPhoto = ref(false);
    const imgData = ref(null);
    const imgHistory = ref('');
    function closeModel() {
      imgHistory.value = '';
      editPhoto.value = false;
      // postsData.closePostModel();
      statusData.imgCropperModel.open = false;
      statusData.imgCropperModel.url = '';
      statusData.imgCropperModel.newUrl = '';
    }
    function toogleGetter() {
      const [file] = imgUploadGetter.value.files;
      imgData.value = file;
      imgHistory.value = postsData.targetPost.image;
      const imgShow = window.URL || window.webkitURL;
      postsData.targetPost.image = imgShow.createObjectURL(imgData.value);
      editPhoto.value = true;
      console.log(editPhoto.value);
      console.log(postsData.targetPost.image, postsData.targetPost.image.length);
    }
    async function toogleUpdateImg() {
      if (editPhoto.value) {
        postsData.targetPost.contentType = 'photography';
      } else {
        postsData.targetPost.contentType = 'article';
      }
      if (editPhoto.value === true) {
        try {
          const result = await postsData.upLoadImage(imgData.value, userData.user.token);
          console.log(result);
          if (result.status === 'success') {
            postsData.targetPost.image = result.data.imgUrl;
          }
          if (postsData.newPostModel.action === 'new') {
            console.log('新貼文');
            postsData.addPost(postsData.targetPost, userData.user.token);
          } else {
            console.log('更新');
            postsData.updatePost(
              postsData.targetPost,
              postsData.newPostModel.id,
              userData.user.token,
            );
          }
        } catch (e) {
          console.log(e);
        }
        closeModel();
      } else {
        if (postsData.newPostModel.action === 'new') {
          postsData.addPost(postsData.targetPost, userData.user.token);
        } else {
          console.log('更新');
          postsData.updatePost(
            postsData.targetPost,
            postsData.newPostModel.id,
            userData.user.token,
          );
        }
        closeModel();
      }
    }

    return {
      imgUploadGetter,
      postsData,
      statusData,
      toogleGetter,
      toogleUpdateImg,
      closeModel,
    };
  },
};
</script>

<template>
  <div
    class="popModalContainer position-fixed top-0 left-0 z-popModal"
    :class="{ active: statusData.imgCropperModel.open === true }"
  >
    <!-- Modal-Overlay -->
    <div class="popModalCover" @click="closeModel" />

    <!-- Modal-Window -->
    <div class="popModal" :class="{ active: statusData.imgCropperModel.open === true }">
      <div class="position-relative border-bottom border-gray-middle p-4">
        <h4 class="title">變更照片</h4>
        <button @click="closeModel" type="button" class="btn position-absolute top-2 end-2">
          <i class="webIcon bi bi-x-lg"></i>
        </button>
      </div>
      <div class="d-flex flex-column gap-2 p-4 h-75 flex-grow-1">
        <div class="newPostContentBox">
          <div v-show="statusData.imgCropperModel.url.length > 0" class="imgCropper">
            <img :src="statusData.imgCropperModel.url" alt="貼文圖片" class="imgCropper__img" />
          </div>
        </div>
        <div class="d-flex flex-column gap-3">
          <label for="imgUploader" class="newPostUpLoader">{{
            statusData.imgCropperModel.url.length > 0 ? '變更圖片' : '新增圖片'
          }}</label>
          <input
            ref="imgUploadGetter"
            id="imgUploader"
            class="d-none"
            type="file"
            @change="toogleGetter"
            accept="image/png, image/jpeg"
          />
          <button type="button" @click="toogleUpdateImg" class="btn btn-primary text-white rounded">
            確定
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
  width: 2rem;
  height: 2rem;
  border: 1px solid var(--bs-gray-middle);
  border-radius: 100%;
  object-fit: cover;
  object-position: center;
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
.imgCropper {
  width: 100%;
  max-width: 320px;
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
.postTag {
  font-size: 0.875rem;
  padding: 0.125rem 0.25rem;
  border: 1px solid var(--bs-gray-middle);
  border-radius: 0.25rem;
  cursor: pointer;
  &:hover {
    border: 1px solid var(--bs-gray-dark);
    color: var(--bs-dark);
  }
}
.postTagInput {
  font-size: 0.875rem;
  border: 1px solid var(--bs-gray-middle);
  border-radius: 0.25rem;
  &__content {
    padding: 0.125rem;
    border: none;
    width: 4rem;
    &:focus {
      outline: none;
    }
  }
  &__btn {
    padding: 0.25rem 0.5rem;
    background-color: var(--bs-secondary);
    color: var(--bs-primary);
    cursor: pointer;
  }
}
</style>
