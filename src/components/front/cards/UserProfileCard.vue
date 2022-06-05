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
    text: '追蹤中',
    type: 'FOLLOW',
  },
  {
    text: '喜歡的貼文',
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
    console.log(props.isFollowing);
    watch(() => props.isSelf, (newIsSelf) => {
      currentTabs.value = newIsSelf ? myTabs : userTabs;
    });

    return {
      currentTabs,
      props,
      handleChangeTab,
    };
  },
};
</script>

<template>
  <div class="card userProfileCard   mb-3">
    <div class="p-6 d-flex">
      <img
        :src="props.user?.user?.photo ? props.user.user.photo : 'https://i.imgur.com/ZWHoRPi.png'"
        alt="user-picture"
        class="user-picture user-picture-lg"
      />
      <div class="flex-grow-1 d-flex flex-column position-relative" v-if="props.user?.user?.name">
        <span class="userProfileCard-title">{{
          props.user?.user?.name
        }}</span>
        <div class="d-flex mt-3">
          <p><span class="bold me-1">{{ props.user?.postCounts }}</span> 貼文</p>
          <p class="ms-3"><span class="bold me-1">{{ props.user?.privateposts }}</span> 秘密日記</p>
          <p class="ms-3"><span class="bold me-1">{{ props.user?.follows }}</span> 位追蹤者</p>
          <p class="ms-3"><span class="bold me-1">
            {{ props.user?.following?.length ?? 0 }}
          </span> 追蹤中</p>
        </div>
        <span class="mt-2"
          >{{ props.user?.user?.memo }}</span
        >
        <div class="position-absolute top-0 end-0" v-if="!props.isSelf">
          <button class="btn btn-sm btn-outline text-primary"
              v-if="!props.isFollowing">追蹤</button>
          <button class="btn btn-sm btn-outline text-primary"
              v-else>取消追蹤</button>
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
