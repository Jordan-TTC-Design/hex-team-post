<script>
// import { ref } from 'vue';

export default {
  props: {
    tabType: String,
    userId: String,
  },
  setup(props, { emit }) {
    // 自己 (貼文 私密日記 追蹤中 喜歡的貼文 設定)
    // 別人 (貼文 私密日記 追蹤)
    const TabTypeEnum = {
      POST: 'POST',
      DIARY: 'DIARY',
      FOLLOW: 'FOLLOW',
      LIKE: 'LIKE',
      WALLET: 'WALLET',
      SETTING: 'SETTING',
    };
    const handleChangeTab = (newTab) => {
      emit('change-tab', newTab);
    };

    console.log('inner', props.userId);

    return {
      TabTypeEnum,
      props,
      handleChangeTab,
    };
  },
};
</script>

<template>
  <div class="card userProfileCard mb-3">
    <div class="card-body userProfileCard-body">
      <img
        src="../../assets/image/user-picture.png"
        alt="user-picture"
        class="user-picture"
      />
      <div class="d-flex flex-column justify-content-center">
        <span class="userProfileCard-title">用戶名稱</span>
        <span class="userProfileCard-subtitle">200 人追蹤</span>
        <span class="userProfileCard-subtitle">200 人追蹤</span>
      </div>
      <div class="userProfileCard-more">
        <button class="btn btn-sm btn-outline text-primary">追蹤</button>
        <button class="btn btn-sm text-primary">
          <i class="bi bi-three-dots"></i>
        </button>
      </div>
    </div>
    <div class="userProfileCard-footer" v-if="!props.userId">
      <div
        class="userProfileCard-footer-item"
        :class="[props.tabType === TabTypeEnum.POST ? 'active' : '']"
        @click="handleChangeTab(TabTypeEnum.POST)"
      >
        貼文
      </div>
      <div
        class="userProfileCard-footer-item"
        :class="[props.tabType === TabTypeEnum.DIARY ? 'active' : '']"
        @click="handleChangeTab(TabTypeEnum.DIARY)"
      >
        私密日記
      </div>
      <div
        class="userProfileCard-footer-item"
        :class="[props.tabType === TabTypeEnum.FOLLOW ? 'active' : '']"
        @click="handleChangeTab(TabTypeEnum.FOLLOW)"
      >
        追蹤中
      </div>
      <div
        class="userProfileCard-footer-item"
        :class="[props.tabType === TabTypeEnum.LIKE ? 'active' : '']"
        @click="handleChangeTab(TabTypeEnum.LIKE)"
      >
        喜歡的貼文
      </div>
      <div
        class="userProfileCard-footer-item"
        :class="[props.tabType === TabTypeEnum.WALLET ? 'active' : '']"
        @click="handleChangeTab(TabTypeEnum.WALLET)"
      >
        錢包
      </div>
      <div
        class="userProfileCard-footer-item"
        :class="[props.tabType === TabTypeEnum.SETTING ? 'active' : '']"
        @click="handleChangeTab(TabTypeEnum.SETTING)"
      >
        設定
      </div>
    </div>
    <div class="userProfileCard-footer" v-else>
      <div
        class="userProfileCard-footer-item"
        :class="[props.tabType === TabTypeEnum.POST ? 'active' : '']"
        @click="handleChangeTab(TabTypeEnum.POST)"
      >
        貼文
      </div>
      <div
        class="userProfileCard-footer-item"
        :class="[props.tabType === TabTypeEnum.DIARY ? 'active' : '']"
        @click="handleChangeTab(TabTypeEnum.DIARY)"
      >
        私密日記
      </div>
      <div
        class="userProfileCard-footer-item"
        :class="[props.tabType === TabTypeEnum.FOLLOW ? 'active' : '']"
        @click="handleChangeTab(TabTypeEnum.FOLLOW)"
      >
        追蹤
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
</style>
