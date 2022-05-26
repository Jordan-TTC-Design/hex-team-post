<script>
import { ref } from 'vue';
import backStatusStore from '@/stores/backstage/backStatusStore';

export default {
  setup() {
    const backstatusData = backStatusStore();
    const pageSubNav = ref('全部');
    backstatusData.nowPage = '日記作者管理';
    return {
      backstatusData,
      pageSubNav,
    };
  },
};
</script>

<template>
  <div class="backPageHeader border-bottom">
    <div class="backPageHeader__titleBox">
      <h2 class="backPageHeader__titleBox__title">{{ backstatusData.nowPage }}</h2>
    </div>
    <div class="bg-white p-3 border-top">
      <div class="subNav--row gap-3">
        <div :class="{ active: pageSubNav === '全部' }" class="subNav--row__item">全部</div>
        <div :class="{ active: pageSubNav === '排行榜' }" class="subNav--row__item">排行榜</div>
        <div :class="{ active: pageSubNav === '需跟進' }" class="subNav--row__item">需跟進</div>
        <div class="subNav--row__item ms-auto">搜尋, 下拉選單</div>
      </div>
    </div>
  </div>
  <div class="backStageMainContent">
    <div class="d-flex flex-column gap-4">
      <div class="backUserCard">
        <div class="user-picture"></div>
        <div class="user-info gap-1">
          <span class="user-info-title">卡斯柏</span>
          <span class="user-info-subtitle">2022/12/12 12:12</span>
        </div>
        <div class="infoListItem">
          <span class="infoListItem__title">貼文數</span>
          <span class="infoListItem__content">200</span>
        </div>
        <div class="infoListItem">
          <span class="infoListItem__title">秘密日記數</span>
          <span class="infoListItem__content">200</span>
        </div>
        <div class="infoListItem">
          <span class="infoListItem__title">追蹤者數</span>
          <span class="infoListItem__content">20,000</span>
        </div>
        <div class="infoListItem">
          <span class="infoListItem__title">訂閱者數</span>
          <span class="infoListItem__content">20,000</span>
        </div>
        <div class="infoListItem">
          <span class="infoListItem__title">銷售金額</span>
          <span class="infoListItem__content">$20,000</span>
        </div>
        <button type="button" class="btn"><i class="webIcon bi bi-three-dots"></i></button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.backStageMainContent {
  padding: 1.5rem 1.125rem;
}
.backUserCard {
  background-color: var(--bs-white);
  padding: 0.75rem;
  border-radius: 0.75rem;
  box-shadow: 0px 1px 2px #00000029;
  display: flex;
  cursor: pointer;
}
</style>
