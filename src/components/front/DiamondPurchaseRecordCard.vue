<script>
export default {
  setup() {
    return {};
  },
};
</script>

<template>
  <div class="card mb-3">
    <div class="card-body">
      <div class="card-title mb-1">購買秘密鑽石</div>
      <p class="time mb-3">2022 / 11 / 01</p>
      <div class="d-flex">
        <div class="tmp">
          <p class="a">交易金額</p>
          <p class="b">20 SD</p>
        </div>
        <div class="tmp">
          <p class="a">台幣總價</p>
          <p class="b">NTD 200</p>
        </div>
        <div class="tmp">
          <p class="a">交易明細(交易編號)</p>
          <p class="b">#1234567890</p>
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
