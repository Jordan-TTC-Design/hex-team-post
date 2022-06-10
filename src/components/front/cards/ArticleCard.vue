<script>
import { ref, computed, watch } from 'vue';
import userStore from '@/stores/userStore';
import postsStore from '@/stores/postsStore';
import followStore from '@/stores/followStore';
import moment from 'moment';

export default {
  props: ['postItem', 'postIndex'],
  setup(props) {
    const userData = userStore();
    const postsData = postsStore();
    const followData = followStore();
    const articalCardTextContent = ref(null);
    let localUser = JSON.parse(localStorage.getItem('sd-user')) || {};
    const textContentShowData = ref({
      needHide: false,
      isShowAll: true,
    });
    const targetItem = computed(() => props.postItem);
    const isFollowed = computed(() => {
      const result = followData.myFollowUser.findIndex(
        (item) => item._id === targetItem.value.user._id,
      );
      return result;
    });
    watch(articalCardTextContent, (newValue) => {
      if (newValue.clientHeight > 96) {
        textContentShowData.value.needHide = true;
        textContentShowData.value.isShowAll = false;
      }
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
    // eslint-disable-next-line max-len
    const targetTime = computed(() => {
      const result = moment(targetItem.value.createdAt)
        .locale('zh-tw')
        .format('YYYY/MM/DD HH:mm:ss ');
      return result;
    });
    return {
      userData,
      postsData,
      isFollowed,
      textContentShowData,
      targetItem,
      articalCardTextContent,
      targetTime,
      toggleFollow,
    };
  },
};
</script>

<template>
  <div class="card border shadow-none" v-if="targetItem !== undefined">
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
              v-if="targetItem.user._id !== userData.user.id && userData.user.token.length > 0"
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
      </div>
    </div>
    <div class="articalCard__body">
      <div class="articalCard__imgBox">
        <img
          v-if="targetItem.image.length > 0"
          :src="targetItem.image"
          :alt="`${targetItem.id}圖片`"
          class="articalCard__imgBox__img"
        />
      </div>
      <!-- <div>
        <div
          v-if="targetItem.content.length > 0"
          ref="articalCardTextContent"
          class="articalCard__txtContent pb-3"
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
      </div> -->
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
.articalCard {
  &__body {
    display: flex;
  }
  &__imgBox {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--bs-gray-light);
    border-radius: 0 0 0.75rem 0.75rem;
    width: 100%;
    height: 360px;
    padding: 0.75rem;
    &__img {
      max-width: 100%;
      max-height: 100%;
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
