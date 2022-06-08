<script>
import { ref, watch } from 'vue';

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
    const currentTabs = ref(props.isSelf ? myTabs : userTabs);
    const handleChangeTab = (newTab) => {
      emit('change-tab', newTab);
    };

    watch(() => props.isSelf, (newIsSelf) => {
      currentTabs.value = newIsSelf ? myTabs : userTabs;
    });

    console.log(props.user);

    return {
      currentTabs,
      props,
      handleChangeTab,
    };
  },
};
</script>

<template>
  <div class="card userProfileCard">
    <div class="p-4 d-flex gap-4 flex-md-row flex-column align-items-center">
      <img
        :src="props.user?.user?.photo ? props.user.user.photo : 'https://i.imgur.com/ZWHoRPi.png'"
        alt="user-picture"
        class="user-picture user-picture-lg m-0"
      />
      <div class="userContentBox" v-if="props.user?.user?.name">
        <span class="userProfileCard-title">{{
          props.user?.user?.name
        }}</span>
        <div class="userContentBox__info">
          <p  class="userContentBox__info__item">
            <span class="bold">{{ props.user?.postCounts }}</span> 貼文
          </p>
          <p class="userContentBox__info__item">
            <span class="bold">{{ props.user?.privateposts }}</span> 秘密日記
          </p>
          <p class="userContentBox__info__item">
            <span class="bold">{{ props.user?.follows }}</span> 位追蹤者
          </p>
          <p class="userContentBox__info__item"><span class="bold">
            {{ props.user?.user?.following?.length ?? 0 }}
          </span> 追蹤中</p>
        </div>
        <span v-if="props.user?.user?.memo">{{ props.user?.user?.memo }}</span>
        <div class="position-absolute top-0 end-0" v-if="!props.isSelf">
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
</style>
