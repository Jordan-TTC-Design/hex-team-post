<script>
import { ref, computed, watch } from 'vue';
import userStore from '@/stores/userStore';
import postsStore from '@/stores/postsStore';
import followStore from '@/stores/followStore';
import MoreModel from '@/components/helper/MoreModel.vue';
import moment from 'moment';

export default {
  components: { MoreModel },
  props: ['postItem', 'postIndex'],
  setup(props) {
    const userData = userStore();
    const postsData = postsStore();
    const followData = followStore();
    const newComment = ref('');
    const postCardTextContent = ref(null);
    let localUser = JSON.parse(localStorage.getItem('sd-user')) || {};
    const textContentShowData = ref({
      needHide: false,
      isShowAll: true,
    });
    const commentsShowData = ref({
      needHide: false,
      isShowAll: 2,
    });
    const targetItem = computed(() => props.postItem);
    watch(postCardTextContent, (newValue) => {
      if (newValue.clientHeight > 96) {
        textContentShowData.value.needHide = true;
        textContentShowData.value.isShowAll = false;
      }
    });
    function checkComment() {
      if (props.postItem && props.postItem.comments.length > 1) {
        commentsShowData.value.needHide = true;
      }
    }
    watch(targetItem.value.comments, () => {
      checkComment();
    });
    checkComment();
    async function addComment() {
      localUser = JSON.parse(localStorage.getItem('sd-user'));
      console.log(targetItem.value._id, newComment.value);
      const result = await postsData.addComment(
        newComment.value,
        targetItem.value._id,
        localUser.token,
      );
      if (result.status === 'success') {
        newComment.value = '';
      }
    }
    async function deleteComment(commentId, commentIndex) {
      localUser = JSON.parse(localStorage.getItem('sd-user'));
      const result = await postsData.deleteComment(commentId, localUser.token);
      if (result.status === 'success') {
        postsData.posts[props.postIndex].comments.splice(commentIndex, 1);
      }
    }
    async function deletePost() {
      const result = await postsData.deletePost(targetItem.value._id, userData.user.token);
      console.log(result);
      if (result.status === 'success') {
        postsData.posts.splice(props.postIndex, 1);
      }
    }
    async function editPost() {
      console.log(targetItem.value);
      postsData.newPostModel.action = 'edit';
      postsData.newPostModel.id = targetItem.value._id;
      postsData.targetPost.content = targetItem.value.content;
      postsData.targetPost.image = targetItem.value.image;
      postsData.targetPost.contentType = targetItem.value.contentType;
      postsData.targetPost.tag = targetItem.value.tag || [];
      postsData.openPostModel('group');
    }
    const isFollowed = computed(() => {
      const result = followData.myFollowUser.findIndex(
        (item) => item._id === targetItem.value.user._id,
      );
      return result;
    });
    async function toggleFollow() {
      localUser = JSON.parse(localStorage.getItem('sd-user'));
      if (localUser) {
        if (isFollowed.value + 1 > 0) {
          console.log('刪除');
          followData.deleteFollow(targetItem.value.user._id, userData.user.token);
        } else {
          console.log('新增');
          followData.addFollow(targetItem.value.user._id, userData.user.token);
        }
      }
    }
    async function toogleLike() {
      localUser = JSON.parse(localStorage.getItem('sd-user'));
      if (localUser) {
        const isLiked = targetItem.value.likes.findIndex((item) => item._id === localUser.id);
        if (isLiked + 1 > 0) {
          postsData.deleteLike(targetItem.value._id, localUser.token);
        } else {
          postsData.addLike(targetItem.value._id, localUser.token);
        }
      }
    }
    // eslint-disable-next-line max-len
    const isLiked = computed(() => targetItem.value.likes.findIndex((item) => item._id === localUser.id));
    const targetTime = computed(() => moment(targetItem.value.createdAt).locale('zh-tw').format('YYYY/MM/DD h:mm:ss '));
    return {
      userData,
      postsData,
      isFollowed,
      isLiked,
      textContentShowData,
      commentsShowData,
      newComment,
      targetItem,
      postCardTextContent,
      targetTime,
      addComment,
      deleteComment,
      toogleLike,
      editPost,
      deletePost,
      toggleFollow,
    };
  },
};
</script>

<template>
  <div class="card" v-if="targetItem !== undefined">
    <div class="card-body border-bottom border-gray-middle">
      <div class="d-flex align-items-center">
        <img
          :src="targetItem.user.photo || 'https://i.imgur.com/ZWHoRPi.png'"
          alt="user-picture"
          class="user-picture"
        />
        <div class="user-info">
          <RouterLink :to="`/profile/${targetItem.user.id}`" class="user-info-title">
            {{ targetItem.user.name }}
          </RouterLink>
          <div class="d-flex align-items-center gap-2">
            <button
              v-if="targetItem.user.id !== userData.user.id && userData.user.token.length > 0"
              @click="toggleFollow"
              type="button"
              class="followBtn"
              :class="{ followed: isFollowed >= 0 }"
            >
              {{ isFollowed >= 0 ? '已追蹤' : '追蹤' }}
            </button>
            <p class="user-info-subtitle">
              {{ targetTime }}
            </p>
          </div>
        </div>
        <MoreModel
          v-if="targetItem.user.id === userData.user.id && userData.user.token.length > 0"
          :item-id="targetItem._id"
          :function-list="[
            {
              name: '編輯貼文',
              func: editPost,
            },
            {
              name: '刪除貼文',
              func: deletePost,
            },
          ]"
        />
      </div>
    </div>
    <div class="card-body pb-0">
      <div
        v-if="targetItem.content.length > 0"
        ref="postCardTextContent"
        class="postCard__txtContent pb-3"
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
        <p @click="toogleLike"
        class="d-flex align-items-center gap-1 me-4 handPointer"
        :class="{ 'text-primary': isLiked >= 0 }">
          <i class="webIcon bi bi-heart-fill" ></i>
          {{ targetItem.likes.length }}
        </p>
        <p class="d-flex align-items-center gap-1 handPointer"
         @click="commentsShowData.isShowAll = targetItem.comments.length">
          <i class="webIcon bi bi-chat-fill"></i>
          {{ targetItem.comments.length }}
        </p>
      </div>
      <ul class="commentList" :class="{ 'py-1': targetItem.comments.length > 0 }">
        <template v-for="(commentItem, index) in targetItem.comments" :key="commentItem.id">
          <li v-if="index < commentsShowData.isShowAll" class="commentList__item">
            <RouterLink :to="`/profile/${targetItem.user.id}`" class="fs-6 fw-bolder text-dark">{{
              commentItem.user.name
            }}</RouterLink>
            <p class="fs-6">{{ commentItem.comment }}</p>
            <MoreModel
              v-if="
                postItem.user.id === userData.user.id || commentItem.user.id === userData.user.id
              "
              :item-id="targetItem._id"
              :function-list="[
                {
                  name: '刪除',
                  func() {
                    deleteComment(commentItem.id, index);
                  },
                },
              ]"
            />
          </li>
        </template>
        <li
          v-if="
            commentsShowData.needHide && commentsShowData.isShowAll !== targetItem.comments.length
          "
          @click="commentsShowData.isShowAll = targetItem.comments.length"
          class="text-gray-dark handPointer"
        >
          查看全部<span class="text-gray-dark px-1">{{ targetItem.comments.length }}</span
          >則留言
        </li>
      </ul>
    </div>
    <div class="card-body border-top postCard-response" v-if="userData.user.token.length > 0">
      <input type="text" v-model="newComment" class="form-control" placeholder="回覆..." />
      <button class="btn btn-default" @click="addComment">
        <i class="webIcon bi bi-arrow-right-circle-fill"></i>
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.user-info {
  align-items: flex-start;
  justify-content: center;
}
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
  gap: 0.25rem;
  &__item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    position: relative;
    .commentList__item__btn {
      padding: 0rem 0.25rem;
      opacity: 0;
      transition: all 0.3s;
    }
    &::after {
      content: '';
      position: absolute;
      left: 0;
      bottom: 0;
      width: 1%;
      height: 1px;
      opacity: 0;
      background-color: var(--bs-gray-light);
      transition: all 0.3s;
    }
    &:hover {
      &::after {
        width: 100%;
        opacity: 1;
      }
      .commentList__item__btn {
        opacity: 1;
      }
    }
  }
}
.followBtn {
  padding: 0.125rem 0.25rem;
  border: 1px solid var(--bs-primary);
  color: var(--bs-primary);
  font-size: 0.75rem;
  border-radius: 0.5rem;
  background-color: var(--bs-white);
  transition: all 0.3s;
  cursor: pointer;
  &:hover {
    background-color: var(--bs-secondary);
  }
  &.followed {
    border: 1px solid var(--bs-gray-light);
    background-color: var(--bs-gray-light);
    color: var(--bs-gray-dark);
  }
}
</style>
