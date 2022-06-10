<script>
import { onMounted, ref, watch } from 'vue';
import userStore from '@/stores/userStore';
import followStore from '@/stores/followStore';
import statusStore from '@/stores/statusStore';

// 他人 tab
const userTabs = [
  {
    text: '貼文',
    type: 'POST',
  },
  {
    text: '私密日記',
    type: 'DIARY',
  },
  {
    text: '追蹤',
    type: 'FOLLOW',
  },
];

export default {
  props: {
    tabType: String,
    userId: String,
  },
  setup(props, { emit }) {
    const userData = userStore();
    const followData = followStore();
    const statusData = statusStore();

    const currentTabs = ref(userTabs);
    const handleChangeTab = (newTab) => {
      emit('change-tab', newTab);
    };
    const userMemoTextContent = ref(null);

    const textContentShowData = ref({
      needHide: false,
      isShowAll: true,
    });
    watch(userMemoTextContent, (newValue) => {
      if (newValue.clientHeight > 48) {
        textContentShowData.value.needHide = true;
        textContentShowData.value.isShowAll = false;
      }
    });

    const isFollowing = ref(false);
    watch(
      () => userData.userProfile.followers,
      (newFollowers) => {
        isFollowing.value = newFollowers && newFollowers.some((m) => m === userData.user.id);
      },
    );
    watch(props, (newValue) => {
      if (userData.userProfile.id !== newValue.userId) {
        statusData.openPageLoader();
        userData.getUserProfile(newValue.userId);
      }
    });
    onMounted(async () => {
      statusData.openPageLoader();
      if (userData.userProfile.id !== props.userId) {
        await userData.getUserProfile(props.userId);
      }
    });

    const addFollow = async () => {
      const res = await followData.addFollow(userData.userProfile.id, userData.user.token);
      if (res.data.status === 'success') {
        await userData.getUserProfile(props.userId);
      }
    };

    const deleteFollow = async () => {
      const res = await followData.deleteFollow(userData.userProfile.id, userData.user.token);
      if (res.data.status === 'success') {
        await userData.getUserProfile(props.userId);
      }
    };

    return {
      currentTabs,
      userData,
      followData,
      props,
      textContentShowData,
      userMemoTextContent,
      isFollowing,
      addFollow,
      deleteFollow,
      handleChangeTab,
    };
  },
};
</script>

<template>
  <div class="card userProfileCard position-relative">
    <div class="p-4 d-flex gap-4 flex-md-row flex-column align-items-md-start align-items-center">
      <div class="position-relative">
        <img
          :src="userData.userProfile.photo"
          alt="user-picture"
          class="user-picture user-picture-lg m-0"
        />
      </div>
      <div class="userContentBox" v-if="userData.userProfile.id">
        <span class="userProfileCard-title">{{ userData.userProfile.name }}</span>
        <div class="userContentBox__info">
          <p class="userContentBox__info__item">
            <span class="bold">{{ userData.userProfile.postCounts }}</span> 貼文
          </p>
          <p class="userContentBox__info__item">
            <span class="bold">{{ userData.userProfile.privateposts }}</span> 秘密日記
          </p>
          <p class="userContentBox__info__item">
            <span class="bold">{{ userData.userProfile.follows }}</span> 位追蹤者
          </p>
          <p class="userContentBox__info__item">
            <span class="bold">
              {{ userData.userProfile.following?.length ?? '' }}
            </span>
            追蹤中
          </p>
        </div>
        <div>
          <div
            class="memoTxtBox"
            ref="userMemoTextContent"
            :class="{
              showAll: textContentShowData.isShowAll === true,
            }"
          >
            <div
              v-if="userData.userProfile.memo"
              v-html="userData.userProfile.memo"
              class="b"
            ></div>
          </div>
          <p
            v-if="textContentShowData.needHide === true && textContentShowData.isShowAll === false"
            @click="textContentShowData.isShowAll = true"
            class="showMoreBtn"
          >
            顯示完整簡介
          </p>
        </div>
        <div class="followBox">
          <button class="followBtn btn btn-sm" v-if="!isFollowing" @click="addFollow()">
            追蹤
          </button>
          <button class="followBtn btn btn-sm followed" v-else @click="deleteFollow()">
            取消追蹤
          </button>
        </div>
      </div>
    </div>
    <div class="userProfileCard-footer">
      <div
        v-for="t in currentTabs"
        :key="t.type"
        class="userProfileCard-footer-item"
        :class="[props.tabType === t.type ? 'active' : '']"
        @click="handleChangeTab(t.type)"
      >
        {{ t.text }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.followBox {
  position: absolute;
  top: 1rem;
  right: 1rem;
  .followBtn {
    padding: 0.25rem 0.5rem;
    font-size: 0.875rem;
    border: 1px solid var(--bs-gray-middle);
    border-radius: 0.5rem;
    color: var(--bs-dark);
    &:hover {
      border: 1px solid var(--bs-primary);
      color: var(--bs-primary);
    }
    &.followed {
      border: 1px solid var(--bs-gray-light);
      background-color: var(--bs-gray-light);
      color: var(--bs-gray-dark);
    }
  }
}
.userContentBox {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  flex-grow: 1;
  gap: 1rem;
  @media (max-width: 767.98px) {
    align-items: center;
    width: 100%;
  }
  &__info {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    gap: 1rem;
    &__item {
      display: flex;
      flex-grow: 1;
      gap: 0.25rem;
      white-space: nowrap;
      @media (max-width: 767.98px) {
        justify-content: center;
      }
      @media (max-width: 575.98px) {
        flex-direction: column;
        align-items: center;
      }
    }
  }
}
.user-picture.user-picture-lg {
  width: 120px;
  height: 120px;
  border-radius: 60px;
  margin-right: 16px;
}
.bold {
  font-size: 16px;
  color: #1d1d1d;
  margin-right: 4px;
}
.user-picture_cover {
  cursor: pointer;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.36);
  width: 100%;
  height: 100%;
  border-radius: 50%;
  left: 0;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  color: white;
  opacity: 0;
  transition: all 0.3s;
  &:hover {
    opacity: 1;
  }
}
.memoTxtBox {
  max-height: 3rem;
  overflow: hidden;
  &.showAll {
    max-height: none;
  }
}
.showMoreBtn {
  cursor: pointer;
  color: var(--bs-gray-dark);
  text-align: start;
  background-color: #fff;
  padding: 0.25rem 0;
  font-size: 0.875rem;
}
</style>
