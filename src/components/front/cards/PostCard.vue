<script>
import { ref, computed, watch } from 'vue';
import userStore from '@/stores/userStore';
import postsStore from '@/stores/postsStore';

export default {
  props: ['postItem'],
  setup(props) {
    const userData = userStore();
    const postsData = postsStore();
    const newComment = ref('');
    const postCardTextContent = ref(null);
    const textContentShowData = ref({
      needHide: false,
      isShowAll: true,
    });
    watch(postCardTextContent, (newValue, oldValue) => {
      console.log('watch search', newValue.clientHeight, oldValue);
      if (newValue.clientHeight > 96) {
        textContentShowData.value.needHide = true;
        textContentShowData.value.isShowAll = false;
      }
    });
    const targetItem = computed(() => props.postItem);
    async function addComment() {
      const localUser = JSON.parse(localStorage.getItem('sd-user'));
      console.log(targetItem.value.id, newComment.value);
      const result = await postsData.addComment(
        newComment.value,
        targetItem.value.id,
        localUser.token,
      );
      console.log(result);
    }
    return {
      userData,
      postsData,
      textContentShowData,
      newComment,
      targetItem,
      postCardTextContent,
      addComment,
    };
  },
};
</script>

<template>
  <div class="card" v-if="targetItem !== undefined">
    <div class="card-body">
      <div class="d-flex align-items-center mb-3">
        <img src="@/assets/image/user-picture.png" alt="user-picture" class="user-picture" />
        <div class="user-info">
          <RouterLink class="user-info-title" to="/profile/628e4bbfad29e4c054c9f380">
            用戶名稱
          </RouterLink>
          <span class="user-info-subtitle">200 人追蹤</span>
        </div>
        <div class="btn btn-sm">追蹤</div>
      </div>
        <div
        v-if="targetItem.content.length > 0"
        ref="postCardTextContent"
        class="postCard__txtContent"
        :class="{
          showAll: textContentShowData.isShowAll === true,
        }"
        v-html="targetItem.content"
      ></div>
      <p
        v-if="textContentShowData.needHide === true && textContentShowData.isShowAll === false"
        @click="textContentShowData.isShowAll = true"
        class="showMoreBtn"
      >
        ... 顯示更多
      </p>
    </div>
    <div class="postCard__imgBox">
      <img
        v-if="targetItem.image.length > 0"
        :src="targetItem.image"
        :alt="`${targetItem.id}圖片`"
        class="postCard__imgBox__img"
      />
    </div>
    <div class="card-body d-flex align-items-center">
      <div class="icon text-primary">
        <i class="bi bi-heart-fill"></i>
        <span class="ms-2">{{ targetItem.likes.length }}</span>
      </div>
      <div class="icon">
        <i class="bi bi-chat"></i>
      </div>
      <span class="ms-auto">2022 / 01 / 01 12:12</span>
    </div>
    <div class="card-body border-top postCard-response">
      <img :src="userData.user.photo" alt="" class="user-picture" />
      <input type="text" v-model="newComment" class="form-control" placeholder="回覆..." />
      <button class="btn" @click="addComment">
        <i class="bi bi-play-fill"></i>
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.showMoreBtn {
  cursor: pointer;
  color: var(--bs-primary);
  text-align:start;
  background-color: #fff;
  padding: 0.5rem 0;
}
.postCard {
  &__imgBox {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--bs-gray-light);
    &__img {
      width: 100%;
    }
  }
  &__txtContent {
    max-height: 6rem;
    overflow: hidden;
    &.showAll {
      max-height: none;
    }
  }
}
</style>
