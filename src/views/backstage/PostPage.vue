<script>
import { ref } from 'vue';
import backStatusStore from '@/stores/backstage/backStatusStore';
import Pagination from '@/components/helper/Pagination.vue';

export default {
  components: {
    Pagination,
  },
  setup() {
    const backstatusData = backStatusStore();
    const pageSubNav = ref('刊登中');
    backstatusData.nowPage = '貼文管理';
    const paginationData = ref({ totalPages: 2, nowPage: 1 });
    return {
      backstatusData,
      pageSubNav,
      paginationData,
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
        <div :class="{ active: pageSubNav === '刊登中' }" class="subNav--row__item">刊登中</div>
        <div :class="{ active: pageSubNav === '已下架' }" class="subNav--row__item">已下架</div>
        <div class="subNav--row__item ms-auto">搜尋, 下拉選單</div>
      </div>
    </div>
  </div>
  <div class="backStageMainContent">
    <div class="row row-cols-3 mb-6">
      <div class="col mb-3">
        <div class="backPostCard h-100" @click="backstatusData.postSilderState = true">
          <div class="d-flex align-items-center p-3 pb-0">
            <div class="user-picture"></div>
            <div class="user-info">
              <span class="user-info-title">卡斯伯</span>
              <span class="user-info-subtitle">2022 / 01 01 12:12</span>
            </div>
          </div>
          <div class="card__body d-flex flex-column gap-3 mb-2 flex-grow-1">
            <p class="backPostCard__txtContent">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Delectus itaque enim quae
              necessitatibus, at, explicabo obcaecati maiores aspernatur, nulla impedit facilis iste
              eaque quis vitae sunt sint eveniet expedita labore? Asperiores commodi totam corrupti
              accusantium! Est tempore nemo placeat! Perferendis fugit itaque culpa saepe.
              Perspiciatis libero nihil tempore enim, quae beatae cum aliquam, officia dolores eos,
              quos cumque expedita inventore.
            </p>
          </div>
          <div class="d-flex justify-content-between ps-3">
            <ul class="iconInfoList">
              <li class="iconInfoList__item"><i class="webIcon--sm bi bi-heart"></i>325</li>
              <li class="iconInfoList__item"><i class="webIcon--sm bi bi-eye"></i>20</li>
              <li class="iconInfoList__item"><i class="webIcon--sm bi bi-chat-left-dots"></i>20</li>
            </ul>
            <button type="button" class="btn"><i class="bi bi-three-dots"></i></button>
          </div>
        </div>
      </div>
      <div class="col mb-3">
        <div class="backPostCard h-100">
          <div class="d-flex align-items-center p-3 pb-0">
            <div class="user-picture"></div>
            <div class="user-info">
              <span class="user-info-title">卡斯伯</span>
              <span class="user-info-subtitle">2022 / 01 01 12:12</span>
            </div>
          </div>
          <div class="card__body d-flex flex-column gap-3 mb-2 flex-grow-1">
            <p class="backPostCard__txtContent backPostCard__txtContent--fold">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Delectus itaque enim quae
              necessitatibus, at, explicabo obcaecati maiores aspernatur, nulla impedit facilis iste
              eaque quis vitae sunt sint eveniet expedita labore? Asperiores commodi totam corrupti
              accusantium! Est tempore nemo placeat! Perferendis fugit itaque culpa saepe.
              Perspiciatis libero nihil tempore enim, quae beatae cum aliquam, officia dolores eos,
              quos cumque expedita inventore.
            </p>
            <img
              class="backPostCard__imgContent"
              src="https://images.unsplash.com/photo-1653515906416-0a4c47eb5d20?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674"
              alt="貼文圖"
            />
          </div>
          <div class="d-flex justify-content-between ps-3">
            <ul class="iconInfoList">
              <li class="iconInfoList__item"><i class="webIcon--sm bi bi-heart"></i>325</li>
              <li class="iconInfoList__item"><i class="webIcon--sm bi bi-eye"></i>20</li>
              <li class="iconInfoList__item"><i class="webIcon--sm bi bi-chat-left-dots"></i>20</li>
            </ul>
            <button type="button" class="btn"><i class="bi bi-three-dots"></i></button>
          </div>
        </div>
      </div>
    </div>
    <div class="d-flex justify-content-center">
      <Pagination
      :pagination-data="paginationData"
      @change-page-number="paginationData.nowPage = $event"
    />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.backStageMainContent {
  padding: 1.5rem 1.125rem;
}
.backPostCard {
  background-color: var(--bs-white);
  border-radius: 0.75rem;
  box-shadow: 0px 1px 2px #00000029;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  .card__body {
    padding: 0.75rem;
  }
  &__txtContent {
    overflow: hidden;
    height: 12rem;
    &--fold {
      max-height: 2.75rem;
    }
  }
  &__imgContent {
    height: 10rem;
    width: 100%;
    object-fit: cover;
    border-radius: 0.5rem;
  }
}
.iconInfoList {
  display: flex;
  gap: 0.75rem;
  &__item {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    &:hover {
      color: var(--bs-primary);
      .webIcon--sm {
        color: var(--bs-primary);
      }
    }
  }
}
</style>
