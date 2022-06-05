<script>
import { ref, computed } from 'vue';
import Cropper from 'cropperjs';
import statusStore from '@/stores/statusStore';
import postsStore from '@/stores/postsStore';
import userStore from '@/stores/userStore';

export default {
  props: ['imgName'],
  emits: ['send-img-data'],
  setup() {
    const postsData = postsStore();
    const userData = userStore();
    const statusData = statusStore();
    const isImg = ref(false);
    const imgUploadGetter = ref(null);
    const tempImg = ref(null);
    const targetImage = ref(null);
    let cropper = {};
    let imgData = { src: '' };
    const cropperImage = ref(null);
    const destination = ref({});
    const targetItem = computed(() => statusData.imgCropperModel.url);

    function putImage(data) {
      const reader = new FileReader();
      if (data) {
        isImg.value = true;
        reader.readAsDataURL(data);
        console.log(reader);
        reader.onload = () => {
          const dataURL = reader.result;
          imgData = cropperImage.value;
          console.log(imgData);
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
    const imgHistory = ref('');
    const editPhoto = ref(false);
    function processToCropImg(data) {
      Object.keys(cropper).forEach((k) => delete cropper[k]);
      setTimeout(() => {
        putImage(data);
      }, 100);
    }
    function getImgBlob(dataUrl) {
      fetch(dataUrl)
        .then((res) => res.blob())
        .then((blob) => {
          const objectURL = URL.createObjectURL(blob);
          const myImage = new Image();
          myImage.src = objectURL;
          console.log(blob);
          processToCropImg(blob);
        });
    }
    getImgBlob(targetItem.value);
    function toogleInput() {
      const [file] = imgUploadGetter.value.files;
      targetImage.value = file;
      console.log(targetImage.value);
      imgHistory.value = statusData.imgCropperModel.url;
      const imgShowData = window.URL || window.webkitURL;
      statusData.imgCropperModel.url = imgShowData.createObjectURL(targetImage.value);
      editPhoto.value = true;
      console.log(statusData.imgCropperModel.url);
      // getImgBlob(targetItem.value);
      processToCropImg(file);
    }
    // watch(targetItem.value, (newValue) => {
    //   console.log(newValue);
    //   if (Object.keys(newValue).length !== 0 && statusData.imgCropperModel.url.file !== null) {
    //     processToCropImg(statusData.imgCropperModel.url.file);
    //   }
    // });
    function closeModal() {
      // statusData.closeImgToCrop();
      Object.keys(cropper).forEach((k) => delete cropper[k]);
      cropper.destroy();
      this.imgCropperModel.open = false;
    }
    function convertCanvasToImage(canvas) {
      const image = new Image();
      console.log(image, canvas);
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
        userData.updateUser();
      }
    }
    function croppingImg() {
      console.log(cropper);

      const canvas = cropper.getCroppedCanvas({
        maxWidth: 4096,
        maxHeight: 4096,
        fillColor: '#fff',
        imageSmoothingEnabled: false,
        imageSmoothingQuality: 'high',
      });
      console.log(canvas);
      imgData = convertCanvasToImage(canvas);
      console.log(imgData);
      uploadmgToDB(imgData);
    }

    return {
      imgUploadGetter,
      tempImg,
      statusData,
      cropperImage,
      destination,
      closeModal,
      croppingImg,
      uploadmgToDB,
      toogleInput,
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
        <div class="d-flex justify-content-center align-items-center">
          <div class="row w-100">
            <div class="col-8">
              <div class="cropperImageBox rounded overflow-hidden">
                <img
                  class="d-none"
                  ref="tempImg"
                  :src="statusData.imgCropperModel.url"
                  alt="原圖"
                />
                <img class="cropperImage" ref="cropperImage" src="" alt="原圖" />
              </div>
            </div>
            <div class="col-4">
              <div class="preViewImgBox bg-gray-100 rounded p-5">
                <div class="w-100 d-flex flex-column align-items-center mb-4">
                  <p class="mb-1">預覽圖</p>
                  <div class="bg-white rounded">
                    <img class="preViewImgBox__img" :src="destination" alt="圖片預覽圖" />
                  </div>
                </div>
              </div>
            </div>
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
            @change="toogleInput"
            accept="image/png, image/jpeg"
          />
          <button type="button" @click="croppingImg" class="btn btn-primary text-white rounded">
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
.myCropper {
  width: 320px;
  height: 320px;
  position: relative;
  background-color: var(--bs-gray-light);
  &__cover {
    position: absolute;
    top: -8px;
    left: -8px;
    width: 336px;
    z-index: 10;
    opacity: 0.85;
    border-radius: 8px;
  }
  &__cropper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}
.background {
  background: white;
}
.imgCropperPopModal {
  transform: translateY(-5%);
}
.cropperImageBox {
  display: block;
  width: 100%;
  height: 100%;
  max-height: 60vh;
  background: color #f7f7f7;
  .cropperImage {
    max-height: 100%;
  }
}
.cropper-container {
  min-height: 360px;
  min-width: 480px;
  img {
    display: block;
    height: 100%;
    image-orientation: 0deg;
    max-height: none;
    max-width: none;
    min-height: 0;
    min-width: 0;
    width: 100%;
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
