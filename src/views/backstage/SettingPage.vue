<script>
import { ref } from 'vue';
import backStatusStore from '@/stores/backstage/backStatusStore';

export default {
  setup() {
    const backstatusData = backStatusStore();
    const pageSubNav = ref('平台管理者');
    backstatusData.nowPage = '設定＆其他';
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
        <div :class="{ active: pageSubNav === '平台管理者' }" class="subNav--row__item">
          平台管理者
        </div>
        <button type="button" class="btn btn-primary ms-auto">
          <i class="webIcon bi bi-plus-lg text-white me-1"></i>新增管理員
        </button>
      </div>
    </div>
  </div>
  <div class="backStageMainContent">
    <div class="d-flex flex-column gap-4">
      <div class="backUserCard">
        <div class="user-picture"></div>
        <div class="user-info gap-1">
          <p class="user-info-title">卡斯柏<span class="ms-2 webTag">管理者</span></p>
          <span class="user-info-subtitle">2022/12/12 12:12</span>
        </div>
        <div class="infoListItem">
          <span class="infoListItem__title">Email</span>
          <span class="infoListItem__content">jordan.ttc.design@gmail.com</span>
        </div>
        <div class="infoListItem">
          <span class="infoListItem__title">手機</span>
          <span class="infoListItem__content">0987654321</span>
        </div>
        <div class="infoListItem">
          <span class="infoListItem__title">最後登入時間</span>
          <span class="infoListItem__content">2022/12/12 12:12</span>
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
