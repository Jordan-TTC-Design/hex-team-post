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
    const editPhoto = ref(false);
    const imgData = ref(null);
    const imgHistory = ref('');
    function closeNewPostModel() {
      imgHistory.value = '';
      editPhoto.value = false;
      postsData.closePostModel();
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
    async function toogleAddPost() {
      if (editPhoto.value) {
        postsData.targetPost.contentType = 'photography';
      } else {
        postsData.targetPost.contentType = 'article';
      }
      if (editPhoto.value === true) {
        try {
          console.log(imgData.value);
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
        closeNewPostModel();
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
        closeNewPostModel();
      }
    }
    const tagTextContent = ref('');
    function addPostTag() {
      console.log(tagTextContent.value);
      postsData.targetPost.tag.push(tagTextContent.value);
      tagTextContent.value = '';
    }
    return {
      imgData,
      imgUploadGetter,
      postsData,
      statusData,
      editPhoto,
      userData,
      tagTextContent,
      toogleGetter,
      toogleAddPost,
      closeNewPostModel,
      addPostTag,
    };
  },
};
</script>

<template>
  <div
    class="popModalContainer position-fixed top-0 left-0 z-popModal"
    :class="{ active: postsData.newPostModel.open === true }"
  >
    <!-- Modal-Overlay -->
    <div class="popModalCover" @click="closeNewPostModel" />

    <!-- Modal-Window -->
    <div class="popModal" :class="{ active: postsData.newPostModel.open === true }">
      <div class="position-relative border-bottom border-gray-middle p-4">
        <h4 class="title">
          {{ postsData.newPostModel.action === 'new' ? '新增' : '編輯'
          }}{{ postsData.targetPost.type === 'group' ? '貼文' : '秘密日記' }}
        </h4>
        <button @click="closeNewPostModel" type="button" class="btn position-absolute top-2 end-2">
          <i class="webIcon bi bi-x-lg"></i>
        </button>
      </div>
      <div class="d-flex flex-column gap-2 p-4 h-75 flex-grow-1">
        <div class="d-flex align-items-center gap-2">
          <img
            class="userPhoto"
            :src="userData.user.photo || 'https://i.imgur.com/ZWHoRPi.png'"
            :alt="userData.user.name"
          />
          <div class="d-flex flex-column gap-1">
            <p>{{ userData.user.name }}</p>
            <div class="formSelecterBox">
              <select v-model="postsData.targetPost.type" class="form-select formSelecter--sm">
                <option :selected="postsData.targetPost.type === 'group'" value="group">
                  一般貼文
                </option>
                <option :selected="postsData.targetPost.type === 'person'" value="person">
                  秘密日記
                </option>
              </select>
              <i class="formSelecterControler webIcon-sm bi bi-arrow-down-up"></i>
            </div>
          </div>
        </div>
        <div class="newPostContentBox">
          <FormArticle
            input-id="postContent"
            input-name="postContent"
            text-holder="在想什麼呢？"
            v-model="postsData.targetPost.content"
          />
          <div v-show="postsData.targetPost.image.length > 0" class="newPost__imgBox">
            <img :src="postsData.targetPost.image" alt="貼文圖片" class="newPost__imgBox__img" />
          </div>
        </div>
        <div class="d-flex flex-column gap-3">
          <ul class="d-flex gap-1 flex-wrap">
            <li><p class="fs-6">文章標籤：</p></li>
            <li v-for="(tagItem, index) in postsData.targetPost.tag" :key="`${tagItem}${index}`">
              <p class="postTag">
                {{ tagItem
                }}<i class="bi bi-x" @click="postsData.targetPost.tag.splice(index, 1)"></i>
              </p>
            </li>
            <li
              class="postTagInput"
              v-show="postsData.targetPost.tag || postsData.targetPost.tag.length < 3"
            >
              <input class="postTagInput__content" type="text" v-model="tagTextContent" />
              <i @click="addPostTag" class="postTagInput__btn bi bi-check"></i>
            </li>
          </ul>
          <label for="imgUploader" class="newPostUpLoader">{{
            postsData.targetPost.image.length > 0 ? '變更圖片' : '新增圖片'
          }}</label>
          <input
            ref="imgUploadGetter"
            id="imgUploader"
            class="d-none"
            type="file"
            @change="toogleGetter"
            accept="image/png, image/jpeg"
          />
          <div
            v-if="postsData.targetPost.type === 'person'"
            class="formRadio w-100 d-flex align-items-center gap-1"
          >
            <p class="fs-6">價格：</p>
            <div class="d-flex gap-2">
              <input
                class="formRadio__input"
                type="radio"
                id="postPrice-5"
                :value="5"
                v-model="postsData.targetPost.pay"
              />
              <label
                :class="{ active: postsData.targetPost.pay === 5 }"
                class="formRadio__label py-1"
                for="postPrice-5"
                >5 SD</label
              >
              <input
                class="formRadio__input"
                type="radio"
                id="postPrice-10"
                :value="10"
                v-model="postsData.targetPost.pay"
              />
              <label
                :class="{ active: postsData.targetPost.pay === 10 }"
                class="formRadio__label py-1"
                for="postPrice-10"
                >10 SD</label
              >
              <input
                class="formRadio__input"
                type="radio"
                id="postPrice-15"
                :value="15"
                v-model="postsData.targetPost.pay"
              />
              <label
                :class="{ active: postsData.targetPost.pay === 15 }"
                class="formRadio__label py-1"
                for="postPrice-15"
                >15 SD</label
              >
            </div>
          </div>
          <button type="button" @click="toogleAddPost" class="btn btn-primary text-white rounded">
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
  width: 3rem;
  height: 3rem;
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
.formSelecterBox {
  position: relative;
  cursor: pointer;
  .formSelecter--sm {
    font-size: 0.75rem;
    padding: 0.125rem 1.5rem 0.125rem 0.25rem;
    border: 2px solid var(--bs-gray-middle);
    border-radius: 0.25rem;
    color: var(--bs-dark);
    -moz-appearance: none;
    -webkit-appearance: none;
    transition: all 0.3s;
    &::-ms-expand {
      display: none;
    }
    &:focus {
      outline: 0;
    }
  }
  .formSelecterControler {
    position: absolute;
    top: 0.4rem;
    right: 0.5rem;
    pointer-events: none;
    font-size: 0.5rem;
    transition: all 0.3s;
  }
  &:hover {
    .formSelecter--sm {
      color: var(--bs-primary);
    }
    .formSelecterControler {
      color: var(--bs-primary);
    }
  }
}
</style>
