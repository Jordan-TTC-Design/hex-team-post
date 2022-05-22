<script>
export default {
  setup() {},
};
</script>

<template>
  <nav class="menu">
    <div class="menu-logo p-3 border-bottom d-flex align-items-center">
      <div class="logo me-3"></div>
      Backstage
    </div>
    <div>
      <div class="p-3 d-flex align-items-center border-bottom">
        <div class="user-picture"></div>
        <span class="">User Name</span>
      </div>
    </div>
    <div class="item border-bottom">
      <a class="active">總覽</a>
    </div>
    <div class="item border-bottom">
      <a class="active">會員管理</a>
    </div>
    <div class="item border-bottom active">
      <a class="active">日記作者管理</a>
    </div>
    <div class="item border-bottom">
      <a class="active">貼文管理</a>
    </div>
    <div class="item border-bottom">
      <a class="active">私密日記管理</a>
    </div>
    <div class="item border-bottom">
      <a class="active">銷售管理</a>
    </div>
    <div class="item border-bottom">
      <a class="active">設定 ＆ 其他</a>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
.logo {
  display: inline-block;
  width: 42px;
  height: 42px;
  background-color: var(--bs-primary);
}

.item {
  padding: 10px 24px;
  line-height: 1.5;

  a {
    color: #1d1d1d;
    text-decoration: none;
    cursor: pointer;
  }
  &.active {
    background-color: var(--bs-secondary);

    position: relative;
    &::after {
      position: absolute;
      content: '';
      right: 0;
      height: 36px;
      top: 4px;
      border-left: 4px solid var(--bs-primary);
      border-top-left-radius: 12px;
      border-bottom-left-radius: 12px;
    }
    a {
      color: var(--bs-primary);
    }
  }
}

.menu {
  width: 270px;
  left: 270px;
  margin-left: -270px;
  position: fixed;
  top: 0;
  bottom: 0;
  box-shadow: 1px 0px 2px #00000029;
}
</style>
