<script>
export default {
  setup() {
    return {};
  },
};
</script>

<template>
  <div class="title border-bottom">用戶管理</div>
  <div class="content">
    <div class="d-flex align-items-center mb-3">
      <div class="btn me-3">全部</div>
      <div class="btn me-3">有消費</div>
      <div class="btn me-3">需跟進</div>
      <div class="btn ms-auto">搜尋, 下拉選單</div>
    </div>
    <div class="card mb-3">
      <div class="card-body d-flex align-items-center">
        <div class="user-picture"></div>
        <div class="user-info">
          <span class="user-info-title">卡斯柏</span>
          <span class="user-info-subtitle">2022/12/12 12:12</span>
        </div>
        <div class="user-info">
          <span class="user-info-title">貼文總數</span>
          <span class="user-info-subtitle">200</span>
        </div>
        <div class="user-info">
          <span class="user-info-title">追蹤者總數</span>
          <span class="user-info-subtitle">20,000</span>
        </div>
        <div class="user-info">
          <span class="user-info-title">消費金額</span>
          <span class="user-info-subtitle">$20,000</span>
        </div>
        <div class="user-info">
          <span class="user-info-title">最後操作</span>
          <span class="user-info-subtitle">2022/12/12 12:09</span>
        </div>
        <!-- <div class="tmp">
          <span class="tmp1">最後操作</span>
          <span class="">
            <span class="tmp2">發文 </span>
            <span class="tmp1">2022/12/12 12:09</span>
          </span>
        </div> -->
        <span class="btn ms-auto">more</span>
      </div>
    </div>
    <div class="card mb-3">
      <div class="card-body d-flex align-items-center">
        <div class="user-picture"></div>
        <div class="user-info">
          <span class="user-info-title">卡斯柏</span>
          <span class="user-info-subtitle">2022/12/12 12:12</span>
        </div>
        <div class="user-info">
          <span class="user-info-title">貼文總數</span>
          <span class="user-info-subtitle">200</span>
        </div>
        <div class="user-info">
          <span class="user-info-title">追蹤者總數</span>
          <span class="user-info-subtitle">20,000</span>
        </div>
        <div class="user-info">
          <span class="user-info-title">消費金額</span>
          <span class="user-info-subtitle">$20,000</span>
        </div>
        <div class="user-info">
          <span class="user-info-title">最後操作</span>
          <span class="user-info-subtitle">2022/12/12 12:09</span>
        </div>
        <span class="btn ms-auto">more</span>
      </div>
    </div>
    <div class="card mb-3">
      <div class="card-body d-flex align-items-center">
        <div class="user-picture"></div>
        <div class="user-info">
          <span class="user-info-title">卡斯柏</span>
          <span class="user-info-subtitle">2022/12/12 12:12</span>
        </div>
        <div class="user-info">
          <span class="user-info-title">貼文總數</span>
          <span class="user-info-subtitle">200</span>
        </div>
        <div class="user-info">
          <span class="user-info-title">追蹤者總數</span>
          <span class="user-info-subtitle">20,000</span>
        </div>
        <div class="user-info">
          <span class="user-info-title">消費金額</span>
          <span class="user-info-subtitle">$20,000</span>
        </div>
        <div class="user-info">
          <span class="user-info-title">最後操作</span>
          <span class="user-info-subtitle">2022/12/12 12:09</span>
        </div>
        <span class="btn ms-auto">more</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.content {
  padding: 10px 20px;
}

// .filter {
//   display: flex;
//   margin: 0 -6px;
//   margin-bottom: 12px;
//   .item {
//     padding: 10px 12px;
//     border: 1px solid #ffffff;
//     text-align: center;
//     color: #1d1d1d;
//     background-color: #ffffff;
//     border-radius: 12px;
//     margin: 0 6px;

//     &.active {
//       background-color: #e1ddff;
//       border-color: #3d24ff;
//       color: #3d24ff;
//     }
//   }
// }
</style>
