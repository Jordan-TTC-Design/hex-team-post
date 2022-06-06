<script>
import { ref } from 'vue';

export default {
  setup() {
    const listShow = ref(false);
    return { listShow };
  },
};
</script>

<template>
  <div class="sideBox gap-3">
    <div class="sideBox__card card gap-3" :class="{ active: listShow }">
      <div class="p-3 border-bottom d-flex gap-2 align-items-center">
        <button @click="listShow = !listShow" type="button" class="btn d-lg-none d-block">
          <i class="bi bi-chevron-left"></i>
        </button>
        <div class="card-title">推薦追蹤</div>
      </div>
      <div class="card-body">
        <div class="d-flex align-items-center mb-3">
          <div class="user-picture"></div>
          <div class="user-info">
            <span class="user-info-title">用戶名稱</span>
            <span class="user-info-subtitle">200 人追蹤</span>
          </div>
          <div class="btn btn-sm text-primary">追蹤</div>
        </div>
        <div class="d-flex align-items-center mb-3">
          <div class="user-picture"></div>
          <div class="user-info">
            <span class="user-info-title">用戶名稱</span>
            <span class="user-info-subtitle">200 人追蹤</span>
          </div>
          <div class="btn btn-sm text-primary">追蹤</div>
        </div>
        <div class="d-flex align-items-center mb-3">
          <div class="user-picture"></div>
          <div class="user-info">
            <span class="user-info-title">用戶名稱</span>
            <span class="user-info-subtitle">200 人追蹤</span>
          </div>
          <div class="btn btn-sm text-primary">追蹤</div>
        </div>
        <div class="d-flex align-items-center mb-3">
          <div class="user-picture"></div>
          <div class="user-info">
            <span class="user-info-title">用戶名稱</span>
            <span class="user-info-subtitle">200 人追蹤</span>
          </div>
          <div class="btn btn-sm text-primary">追蹤</div>
        </div>
        <div class="d-flex align-items-center mb-3">
          <div class="user-picture"></div>
          <div class="user-info">
            <span class="user-info-title">用戶名稱</span>
            <span class="user-info-subtitle">200 人追蹤</span>
          </div>
          <div class="btn btn-sm text-primary">追蹤</div>
        </div>
        <div class="d-flex align-items-center mb-3">
          <div class="user-picture"></div>
          <div class="user-info">
            <span class="user-info-title">用戶名稱</span>
            <span class="user-info-subtitle">200 人追蹤</span>
          </div>
          <div class="btn btn-sm text-primary">追蹤</div>
        </div>
      </div>
    </div>
    <button @click="listShow = !listShow" type="button" class="sideBtn d-lg-none d-block">
      <i class="bi bi-binoculars-fill"></i>
    </button>
  </div>
</template>

<style lang="scss" scoped>
</style>
