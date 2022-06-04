<script>
export default {
  setup() {
    return {};
  },
};
</script>

<template>
  <div class="card mb-3">
    <div class="card-body border-bottom">
      <div class="card-title">您所購買過的創作者</div>
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
