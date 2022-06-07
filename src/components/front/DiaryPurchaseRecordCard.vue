<script>
import { ref } from 'vue';
import statusStore from '@/stores/statusStore';

export default {
  props: ['likesList'],
  setup() {
    const statusData = statusStore();
    const listShow = ref(false);
    function openModel() {
      listShow.value = true;
      statusData.noScroll = true;
    }
    function closeModel() {
      listShow.value = false;
      statusData.noScroll = false;
    }
    return { listShow, openModel, closeModel };
  },
};
</script>

<template>
  <div class="sideBox gap-3">
    <div class="sideBox__card card gap-3" :class="{ active: listShow }">
      <div class="p-3 border-bottom d-flex gap-2 align-items-center">
        <button @click="closeModel" type="button" class="btn d-lg-none d-block">
          <i class="bi bi-chevron-left"></i>
        </button>
        <div class="card-title">喜愛的秘密日記</div>
      </div>
      <template v-for="likeItem in likesList" :key="likeItem._id">
        <div class="card-body d-flex flex-column gap-3">
          <div class="d-flex align-items-center gap-3">
            <img class="card__img" :src="likeItem.image" :alt="likeItem.name" />
            <p class="fs-6">
              創作者：<span class="user-info-title">{{likeItem.user.name}}</span>
            </p>
          </div>
        </div>
      </template>
    </div>
    <button @click="openModel" type="button" class="sideBtn d-lg-none d-block">
      <i class="bi bi-person-heart"></i>
    </button>
  </div>
</template>

<style lang="scss" scoped>
.time {
  font-size: 12px;
  color: #979797;
}
.tmp {
  flex-basis: 120px;

  .a {
    font-size: 12px;
    color: #979797;
    margin-bottom: 4px;
  }

  .b {
    font-size: 14px;
    color: #646464;
  }
}
.card__img {
  width: 3rem;
  height: 3rem;
  object-fit: cover;
  border-radius: 0.25rem;
  border: 1px solid #e2e2e2;
}
</style>
