<script>
import { ref } from 'vue';
import statusStore from '@/stores/statusStore';

export default {
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
        <div class="card-title">您所訂閱的創作者</div>
      </div>
      <div class="card-body">
        <input type="text" class="form-control mb-4" placeholder="搜尋關鍵字" />
        <div class="d-flex align-items-center mb-4">
          <div class="user-picture"></div>
          <div class="user-info">
            <span class="user-info-title">用戶名稱</span>
          </div>
        </div>
        <div class="d-flex align-items-center mb-4">
          <div class="user-picture"></div>
          <div class="user-info">
            <span class="user-info-title">用戶名稱</span>
          </div>
        </div>
        <div class="d-flex align-items-center mb-4">
          <div class="user-picture"></div>
          <div class="user-info">
            <span class="user-info-title">用戶名稱</span>
            <span class="user-info-subtitle">2 篇新貼文</span>
          </div>
        </div>
        <div class="d-flex align-items-center mb-4">
          <div class="user-picture"></div>
          <div class="user-info">
            <span class="user-info-title">用戶名稱</span>
            <span class="user-info-subtitle">2 篇新貼文 24 個新日記</span>
          </div>
        </div>
      </div>
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
</style>
