<script>
import { ref, watch } from 'vue';
import statusStore from '@/stores/statusStore';

// 本人 tab
const myTabs = [
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
  {
    text: '喜歡',
    type: 'LIKE',
  },
  {
    text: '錢包',
    type: 'WALLET',
  },
  {
    text: '設定',
    type: 'SETTING',
  },
];

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
    user: Object,
    isSelf: Boolean,
    isFollowing: Boolean,
  },
  setup(props, { emit }) {
    const statusData = statusStore();

    const currentTabs = ref(props.isSelf ? myTabs : userTabs);
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
    watch(
      () => props.isSelf,
      (newIsSelf) => {
        currentTabs.value = newIsSelf ? myTabs : userTabs;
      },
    );

    function openEditImg() {
      if (props.isSelf) {
        statusData.openUserImageCropper();
      }
    }
    return {
      currentTabs,
      props,
      textContentShowData,
      userMemoTextContent,
      handleChangeTab,
      openEditImg,
    };
  },
};
</script>

<template>
  <div class="card userProfileCard position-relative">
    <div class="p-4 d-flex gap-4 flex-md-row flex-column align-items-start">
      <div class="position-relative">
        <img
          :src="props.user?.user?.photo ? props.user.user.photo : 'https://i.imgur.com/ZWHoRPi.png'"
          alt="user-picture"
          class="user-picture user-picture-lg m-0"
        />
        <p v-if="props.isSelf" class="user-picture_cover" @click="openEditImg">查看</p>
      </div>
      <div class="userContentBox" v-if="props.user?.user?.name">
        <span class="userProfileCard-title">{{ props.user?.user?.name }}</span>
        <div class="userContentBox__info">
          <p class="userContentBox__info__item">
            <span class="bold">{{ props.user?.postCounts }}</span> 貼文
          </p>
          <p class="userContentBox__info__item">
            <span class="bold">{{ props.user?.privateposts }}</span> 秘密日記
          </p>
          <p class="userContentBox__info__item">
            <span class="bold">{{ props.user?.follows }}</span> 位追蹤者
          </p>
          <p class="userContentBox__info__item">
            <span class="bold">
              {{ props.user?.user?.following?.length ?? 0 }}
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
            <p v-if="props.user?.user?.memo">{{ props.user?.user?.memo }}</p>
          </div>
          <p
            v-if="textContentShowData.needHide === true && textContentShowData.isShowAll === false"
            @click="textContentShowData.isShowAll = true"
            class="showMoreBtn"
          >
            顯示完整簡介
          </p>
        </div>
        <div class="followBox" v-if="!props.isSelf">
          <button class="btn btn-sm btn-outline text-primary" v-if="!props.isFollowing">
            追蹤
          </button>
          <button class="btn btn-sm btn-outline text-primary" v-else>取消追蹤</button>
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
