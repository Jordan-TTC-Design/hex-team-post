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
    const commentsShowData = ref({
      needHide: false,
      isShowAll: false,
    });
    watch(postCardTextContent, (newValue) => {
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
        // eslint-disable-next-line comma-dangle
        localUser.token
      );
      console.log(result);
    }
    function checkComment() {
      console.log(props.postItem.comments.length);
      if (props.postItem.comments.length > 1) {
        commentsShowData.value.needHide = true;
        console.log(commentsShowData.value);
      }
    }
    checkComment();
    return {
      userData,
      postsData,
      textContentShowData,
      commentsShowData,
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
    <div class="card-body border-bottom border-gray-middle">
      <div class="d-flex align-items-center">
        <img src="@/assets/image/user-picture.png" alt="user-picture" class="user-picture" />
        <div class="user-info">
          <RouterLink to="/profile/628e4bbfad29e4c054c9f380" class="user-info-title">
            {{ targetItem.user.name }}
          </RouterLink>
          <p>
            <span class="user-info-subtitle">{{ targetItem.createdAt }}</span>
          </p>
        </div>
        <div class="btn btn-sm"><i class="webIcon bi bi-three-dots"></i></div>
      </div>
    </div>
    <div class="card-body pb-0">
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
      <div class="postCard__imgBox">
        <img
          v-if="targetItem.image.length > 0"
          :src="targetItem.image"
          :alt="`${targetItem.id}圖片`"
          class="postCard__imgBox__img"
        />
      </div>
    </div>
    <div class="card-body">
      <div class="d-flex align-items-center">
        <p class="d-flex align-items-center gap-1 2 3 me-4">
          <i class="webIcon bi bi-heart-fill"></i>
          {{ targetItem.likes.length }}
        </p>
        <p class="d-flex align-items-center gap-1 2 3">
          <i class="webIcon bi bi-chat-fill"></i>
          {{ targetItem.comments.length }}
        </p>
      </div>
      <ul class="commentList" :class="{ 'py-1': targetItem.comments.length > 0 }">
        <template v-for="(commentItem, index) in targetItem.comments" :key="commentItem.id">
          <li v-if="index <= 2" class="commentList__item">
            <p class="fs-6 fw-bolder text-dark">{{ commentItem.user.name }}</p>
            <p class="fs-6">{{ commentItem.comment }}</p>
          </li>
        </template>
        <li
          v-if="commentsShowData.needHide && !commentsShowData.isShowAll"
          @click="commentsShowData.isShowAll = true"
          class="text-gray-dark handPointer"
        >
          查看全部<span class="text-gray-dark px-1">{{ targetItem.comments.length }}</span
          >則留言
        </li>
      </ul>
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
  text-align: start;
  background-color: #fff;
  padding: 0.5rem 0;
}
.postCard {
  &__imgBox {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--bs-gray-light);
    border-radius: 0.25rem;
    &__img {
      width: 100%;
      border-radius: 0.25rem;
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
.commentList {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  &__item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
}
</style>
