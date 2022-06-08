<script>
import { ref, watch, computed } from 'vue';
import Cropper from 'cropperjs';
import statusStore from '@/stores/statusStore';
import postsStore from '@/stores/postsStore';
import userStore from '@/stores/userStore';
import 'cropperjs/dist/cropper.min.css';

export default {
  props: ['imgName'],
  emits: ['send-img-data'],
  setup() {
    const postsData = postsStore();
    const userData = userStore();
    const statusData = statusStore();
    const process = ref(1);
    const userImgUploadGetter = ref(null);
    let cropper = {};
    let imgData = {};
    const cropperImage = ref(null);
    const destination = ref({});
    // eslint-disable-next-line no-unused-vars
    const targetItem = computed(() => statusData.imgCropperModel);
    const ogPhoto = computed(() => userData.user.photo);
    function toogleCropper() {
      process.value = 2;
      const [file] = userImgUploadGetter.value.files;
      statusData.imgCropperModel.file = file;
      statusData.imgCropperModel.name = 'upload';
    }
    function putImage(data) {
      const reader = new FileReader();
      if (data) {
        reader.readAsDataURL(data);
        reader.onload = () => {
          const dataURL = reader.result;
          imgData = cropperImage.value;
          imgData.src = dataURL;
          cropper = new Cropper(imgData, {
            aspectRatio: 1 / 1,
            viewMode: 0,
            dragMode: 'move',
            minContainerWidth: 480,
            minContainerHeight: 360,
            zoomable: true,
            scalable: true,
            crop: () => {
              const canvas = cropper.getCroppedCanvas({
                maxWidth: 960,
                maxHeight: 720,
              });
              destination.value = canvas.toDataURL('image/jpeg');
            },
          });
        };
      }
    }
    function processToCropImg(data) {
      if (Object.keys(cropper).length > 0) {
        cropper.destroy();
      }
      // Object.keys(cropper).forEach((k) => delete cropper[k]);
      setTimeout(() => {
        putImage(data);
      }, 100);
    }
    watch(targetItem.value, (newValue) => {
      console.log(newValue);
      if (Object.keys(newValue).length !== 0 && newValue.file !== null) {
        processToCropImg(newValue.file);
      }
    });
    function closeModel() {
      // adminData.closeImgToCrop();
      if (Object.keys(cropper).length > 0) {
        cropper.destroy();
      }
      statusData.imgCropperModel.open = false;
    }
    function convertCanvasToImage(canvas) {
      const image = new Image();
      image.src = canvas.toDataURL('image/jpeg');
      return image;
    }
    function dataURLtoFile(dataurl, filename) {
      const arr = dataurl.split(',');
      const mime = arr[0].match(/:(.*?);/)[1];
      const bstr = atob(arr[1]);
      let n = bstr.length;
      const u8arr = new Uint8Array(n);
      // eslint-disable-next-line no-plusplus
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], filename, { type: mime });
    }
    async function uploadmgToDB(image) {
      const file = dataURLtoFile(image.src, 'file-to-upload.jpeg');
      console.log(file);
      const result = await postsData.upLoadImage(file, userData.user.token);
      console.log(result);
      if (result.status === 'success') {
        userData.user.photo = result.data.imgUrl;
        localStorage.setItem('sd-user', JSON.stringify(userData.user));
        await userData.updateUser(userData.user.token);
        userData.getLocalToken();
      }
    }
    function croppingImg() {
      const canvas = cropper.getCroppedCanvas({
        maxWidth: 4096,
        maxHeight: 4096,
        fillColor: '#fff',
        imageSmoothingEnabled: false,
        imageSmoothingQuality: 'high',
      });
      const tempImage = convertCanvasToImage(canvas);
      uploadmgToDB(tempImage);
      closeModel();
    }

    return {
      statusData,
      process,
      userImgUploadGetter,
      ogPhoto,
      cropperImage,
      destination,
      croppingImg,
      toogleCropper,
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
        <h4 class="title">個人照片</h4>
        <button @click="closeModel" type="button" class="btn position-absolute top-2 end-2">
          <i class="webIcon bi bi-x-lg"></i>
        </button>
      </div>
      <div class="d-flex flex-column gap-2 p-4 h-75 flex-grow-1">
        <div class="ogImgBox" :class="{ 'd-none': process === 2 }">
          <img
            class="ogImgBox__img"
            :src="ogPhoto || 'https://i.imgur.com/ZWHoRPi.png'"
            alt="用戶頭像"
          />
          <label for="userImgUploader" class="ogImgBox__cover">變更圖片</label>
          <input
            ref="userImgUploadGetter"
            id="userImgUploader"
            class="d-none"
            type="file"
            @change="toogleCropper"
            accept="image/png, image/jpeg"
          />
        </div>
        <div
          class="d-flex flex-column gap-3 justify-content-between flex-grow-1"
          :class="{ 'd-none': process === 1 }"
        >
          <div class="cropperImageBox rounded overflow-hidden">
            <img class="cropperImage" ref="cropperImage" src="" alt="原圖" />
          </div>
          <!-- <div class="row w-100">
            <div class="col-8"></div>
            <div class="col-4">
              <div class="preViewImgBox bg-gray-light rounded p-5">
                <div class="w-100 d-flex flex-column align-items-center mb-4">
                  <img class="preViewImgBox__img" :src="destination" alt="圖片預覽圖" />
                </div>
              </div>
            </div>
          </div> -->
          <div class="d-flex flex-column gap-3">
            <label for="userImgUploader" class="newPostUpLoader">變更圖片</label>
            <button type="button" @click="croppingImg" class="btn btn-primary text-white rounded">
              確定
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.ogImgBox {
  width: 100%;
  position: relative;
  background-color: var(--bs-gray-light);
  border-radius: 0.5rem;
  &__cover {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background-color: rgba(0, 0, 0, 0.32);
    border-radius: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s;
    &:hover {
      color: var(--bs-white);
      background-color: rgba(0, 0, 0, 0.5);
    }
  }
  &__img {
    width: 100%;
    height: 100%;
    border-radius: 0.5rem;
  }
}
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
    // height: 80vh;
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
.newPostUpLoader {
  border: 1px solid #e2e2e2;
  padding: 0.5rem;
  border-radius: 0.5rem;
  text-align: center;
  cursor: pointer;
  display: block;
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

.cropperImageBox {
  display: block;
  width: 100%;
  // height: 100%;
  max-height: 360px;
  background: color #f7f7f7;
  .cropperImage {
    max-height: 100%;
  }
}
.preViewImgBox {
  width: 100%;
  min-height: 100%;
  &__img {
    object-fit: contain;
    border-radius: 0.25rem;
    width: 160px;
    height: 90px;
  }
  &__img--circle {
    object-fit: contain;
    border-radius: 50%;
    width: 132px;
    height: 132px;
  }
}
</style>
