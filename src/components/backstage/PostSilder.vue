<script>
import { computed, ref } from 'vue';
import backStatusStore from '@/stores/backstage/backStatusStore';

export default {
  props: ['select-item', 'modal-open'],
  emits: ['get-posts', 'clear-item'],
  setup(props) {
    const backStageData = backStatusStore();
    const modalOpen = ref(false);
    const modalState = computed(() => props.modalState);
    const listState = ref(1);
    // function closeModal() {
    //   modalOpen.value = false;
    //   emit('get-article');
    //   emit('clear-item');
    // }
    const postItem = ref({
      title: '',
    });
    return {
      modalState,
      modalOpen,
      listState,
      postItem,
      backStageData,
    };
  },
};
</script>

<template>
  <div
    class="silderBg--x z-silder"
    :class="{ active: backStageData.postSilderState }"
    @click="backStageData.postSilderState = false"
  ></div>
  <div class="silderBox--x z-silder" :class="{ active: backStageData.postSilderState === true }">
    <div class="d-flex flex-column postion-relative h-100">
      <div class="sliderHeader">
        <h3 class="title">貼文</h3>
        <button
          type="button"
          class="btn rounded py-1.5 px-2"
          @click="backStageData.postSilderState = false"
        >
          <i class="webIcon bi bi-x-lg"></i>
        </button>
      </div>
      <div class="flex-grow-1 overflow-auto">
        <div class="row row-cols-2 px-4">
          <div class="col py-3">
            <div class="infoListItem">
              <p class="infoListItem__title">秘密日記ID</p>
              <p class="infoListItem__content">#1234567</p>
            </div>
          </div>
          <div class="col py-3">
            <div class="infoListItem">
              <p class="infoListItem__title">日記狀態</p>
              <p class="infoListItem__content">刊登中</p>
            </div>
          </div>
          <div class="col py-3">
            <div class="infoListItem">
              <p class="infoListItem__title">總銷售</p>
              <p class="infoListItem__content">150Sd</p>
            </div>
          </div>
          <div class="col py-3">
            <div class="infoListItem">
              <p class="infoListItem__title">總販賣數量</p>
              <p class="infoListItem__content">240</p>
            </div>
          </div>
          <div class="col py-3">
            <div class="infoListItem">
              <p class="infoListItem__title">銷售排行</p>
              <p class="infoListItem__content">23</p>
            </div>
          </div>
          <div class="col py-3">
            <div class="infoListItem">
              <p class="infoListItem__title">發布日期</p>
              <p class="infoListItem__content">2022/11/11 11:11</p>
            </div>
          </div>
        </div>
        <ul class="silderNav sticky-top">
          <li class="silderNav__item active">貼文內容</li>
          <li class="silderNav__item">貼文回覆</li>
          <li class="silderNav__item">販售記錄</li>
          <li class="silderNav__item">訂閱地錄</li>
          <li class="silderNav__item">按讚紀錄</li>
        </ul>
        <div class="sliderContentBox">
          <div>
            <p class="mb-4">
              今天臺北市新增本土確診病例逼近萬人，很快地，染疫人數可能會超過PCR量能，造成確診人數失準。但根據各種模型推算，
              臺北的疫情洪峰將在5月16日到23日之間，我們必須再調整戰略。現階段最重要的事就是做到
              #輕重分流，保留最大醫療量能處理中重症病患。因此今天我記者會結束，立刻與臺北市各大醫院的院長視訊，商討接下來的
              #防疫策略。 #防疫專責病房要增加到30%，但各醫院還有其他重症病患，所以授權各醫院自行調整，只要總體達到30%目標就可以。我也拜託各大醫院都要儘速開設
              #防疫急門診，並提高作業量，輕症確診者最好在防疫急門診就處理掉，防止急診、醫院被擠垮，導致類似香港急診外，一堆病患躺在擔架上的狀況發生。……
              顯示更多
            </p>
            <img
              src="https://images.unsplash.com/photo-1520011597487-ebdd1ea20ab0?ixlib=rb-1.2.1&raw_url=true&q=80&fm=jpg&crop=entropy&cs=tinysrgb&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.sliderHeader {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 72px;
  border-bottom: 1px solid var(--bs-gray-middle);
  padding: 1rem 0.75rem;
}
.silderNav {
  display: flex;
  background-color: var(--bs-gray-light);
  border-bottom: 1px solid var(--bs-gray-middle);
  &__item {
    flex: 1;
    position: relative;
    padding: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    &:hover {
      color: var(--bs-primary);
    }
    &.active {
      color: var(--bs-primary);
      &::before {
        content: '';
        position: absolute;
        width: 50%;
        height: 0.25rem;
        bottom: 0;
        left: 25%;
        background-color: var(--bs-primary);
        opacity: 75%;
        border-radius: 0.25rem 0.25rem 0 0;
      }
    }
    &:not(:last-child) {
      &:after {
        content: '';
        position: absolute;
        width: 1px;
        height: 50%;
        top: 25%;
        right: 0;
        background-color: var(--bs-gray-dark);
        opacity: 75%;
      }
    }
  }
}
.sliderContentBox {
  padding: 1rem;
  img {
    max-width: 100%;
  }
}
</style>
