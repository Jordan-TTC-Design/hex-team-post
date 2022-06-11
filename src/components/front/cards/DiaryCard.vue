<script>
import { ref, computed, watch } from 'vue';
import userStore from '@/stores/userStore';
import postsStore from '@/stores/postsStore';
import followStore from '@/stores/followStore';
import statusStore from '@/stores/statusStore';
import MoreModel from '@/components/helper/MoreModel.vue';
import moment from 'moment';

export default {
  components: { MoreModel },
  props: ['postItem', 'postIndex'],
  setup(props) {
    const userData = userStore();
    const postsData = postsStore();
    const followData = followStore();
    const statusData = statusStore();
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
    const isFollowed = computed(() => {
      const result = followData.myFollowUser.findIndex(
        (item) => item._id === targetItem.value.user._id,
      );
      return result;
    });
    const isLiked = computed(() => {
      const result = targetItem.value.likes.findIndex((item) => item._id === localUser.id);
      return result;
    });
    const targetTime = computed(() => {
      const result = moment(targetItem.value.createdAt)
        .locale('zh-tw')
        .format('YYYY/MM/DD HH:mm:ss ');
      return result;
    });
    watch(postCardTextContent, (newValue) => {
      if (newValue.clientHeight > 96) {
        textContentShowData.value.needHide = true;
        textContentShowData.value.isShowAll = false;
      }
    });
    async function deletePost() {
      const result = await postsData.deletePost(targetItem.value._id, userData.user.token);
      console.log(result);
      if (result.status === 'success') {
        postsData.diaries.splice(props.postIndex, 1);
      }
    }
    async function editPost() {
      postsData.newPostModel.action = 'edit';
      postsData.newPostModel.id = targetItem.value._id;
      postsData.targetPost = {
        ...postsData.targetPost,
        ...targetItem.value,
        tag: targetItem.value.tag || [],
      };
      postsData.openPostModel(targetItem.value.type);
    }
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
      console.log(isLiked.value);
      if (localUser.token) {
        if (isLiked.value + 1 > 0) {
          postsData.deleteLike(targetItem.value._id, localUser.token);
        } else {
          postsData.addLike(targetItem.value._id, localUser.token);
        }
      }
    }
    async function buyDiary() {
      console.log(targetItem.value._id);
      statusData.openAskModel(
        '是否購買該篇日記',
        `點擊確認後將會扣除${targetItem.value.pay}顆鑽石`,
        async () => {
          const res = await postsData.buyDiary(targetItem.value._id, userData.user.token);
          console.log(res);
          if (res.status === 'error' && res.message === '餘額不足') {
            statusData.openPopInfoModel(res.message);
          }
        },
      );
    }
    return {
      userData,
      postsData,
      isFollowed,
      isLiked,
      textContentShowData,
      commentsShowData,
      newComment,
      targetItem,
      targetTime,
      postCardTextContent,
      toogleLike,
      editPost,
      deletePost,
      toggleFollow,
      buyDiary,
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
          <RouterLink :to="`/profile/${targetItem.user._id}`" class="user-info-title mb-1">
            {{ targetItem.user.name }}
          </RouterLink>
          <div class="d-flex align-items-center gap-2">
            <button
              v-if="targetItem.user._id !== userData.user.id && userData.user.token.length > 0"
              @click="toggleFollow"
              type="button"
              class="followBtn"
              :class="{ followed: isFollowed >= 0 }"
            >
              {{ isFollowed >= 0 ? '已追蹤' : '追蹤' }}
            </button>
            <p class="user-info-subtitle">{{ targetTime }}</p>
          </div>
        </div>
        <MoreModel
          v-if="targetItem.user._id === userData.user.id && userData.user.token.length > 0"
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
      <div class="postCard__imgBox postCard__imgBox--diary">
        <img
          v-if="targetItem.image.length > 0"
          :src="targetItem.image"
          :alt="`${targetItem.id}圖片`"
          class="postCard__imgBox__img"
        />
        <div
          v-if="targetItem.image === 'https://i.imgur.com/EOH3rls.jpeg'"
          @click="buyDiary"
          class="postCard__imgBox--diary__cover"
        >
          <i class="coverLock bi bi-file-lock2"></i>
          <div class="w-75 p-4 rounded bg-gray-light">
            <p class="text-center text-dark fs-5">贊助用戶可以查看貼文，或可以點擊單次購買！</p>
          </div>
        </div>
      </div>
    </div>
    <div class="card-body">
      <div class="d-flex align-items-center">
        <p
          @click="toogleLike"
          class="d-flex align-items-center gap-1 me-4 handPointer"
          :class="{ 'text-primary': isLiked >= 0 }"
        >
          <i class="webIcon bi bi-heart-fill"></i>
          {{ targetItem.likes.length }}
        </p>
      </div>
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
      min-height: 240px;
    }
  }
  &__txtContent {
    max-height: 6rem;
    overflow: hidden;
    &.showAll {
      max-height: none;
    }
  }
  &__imgBox--diary {
    position: relative;
  }
  &__imgBox--diary__cover {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    cursor: pointer;
    transition: all 0.3s;
    .coverLock {
      font-size: 5rem;
      color: var(--bs-white);
    }
    &:hover {
      background-color: rgba(0, 0, 0, 0.5);
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
