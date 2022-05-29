<script>
import { ref } from 'vue';
import backStatusStore from '@/stores/backstage/backStatusStore';

export default {
  setup() {
    const backstatusData = backStatusStore();
    const pageSubNav = ref('秘密鑽石');
    backstatusData.nowPage = '銷售管理';
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
        <div :class="{ active: pageSubNav === '秘密鑽石' }" class="subNav--row__item">
          秘密鑽石
        </div>
        <div :class="{ active: pageSubNav === '秘密日記' }" class="subNav--row__item">
          秘密日記
        </div>
        <div :class="{ active: pageSubNav === '日記訂閱' }" class="subNav--row__item">
          日記訂閱
        </div>
      </div>
    </div>
  </div>
  <div class="backStageMainContent">
    <div class="d-flex flex-column gap-4">
      <div class="backUserCard">
        <div class="user-picture"></div>
        <div class="user-info gap-1">
          <p class="user-info-title">卡斯柏</p>
          <p class="user-info-subtitle">2022/12/12 12:12</p>
        </div>
        <div class="infoListItem">
          <p class="infoListItem__title">交易物品</p>
          <p class="infoListItem__content">秘密鑽石</p>
        </div>
        <div class="infoListItem">
          <p class="infoListItem__title">交易狀態</p>
          <p class="infoListItem__content">完成</p>
        </div>
        <div class="infoListItem">
          <p class="infoListItem__title">交易金額</p>
          <p class="infoListItem__content">20SD</p>
        </div>
        <div class="infoListItem">
          <p class="infoListItem__title">交易金額</p>
          <p class="infoListItem__content">NTD 200</p>
        </div>
        <div class="infoListItem">
          <p class="infoListItem__title">交易明細(交易編號)</p>
          <p class="infoListItem__content">#1234567890</p>
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
