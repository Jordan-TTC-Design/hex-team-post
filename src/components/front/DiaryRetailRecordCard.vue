<script>
export default {
  props: {
    record: Object,
  },
  setup(props) {
    return {
      props,
    };
  },
};
</script>
<template>
  <div class="card mb-3">
    <div class="card-body position-relative">
      <div class="card-title mb-1">
        {{ props.record.summary }}
        <span class="postId">({{ props.record.postId }})</span>
      </div>
      <p class="time mb-3">{{ props.record.createdAt.replace('T', ' ').replace('Z', '') }}</p>
      <div class="d-flex">
        <div class="tmp">
          <p class="a">交易金額</p>
          <p class="b">{{ props.record.amountCoin }} SD</p>
        </div>
        <div class="tmp">
          <p class="a">交易對象</p>
          <p class="b">{{ props.record.name }}</p>
        </div>
        <div class="tmp">
          <p class="a">交易明細(交易編號)</p>
          <p class="b">{{ props.record.serialNumber }}</p>
        </div>
      </div>
      <div class="status">
        {{ props.record.postId ? '交易成功' : '交易失敗' }}
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
  .postId {
    font-size: 14;
  }

}
  .status {
    position: absolute;
    border-radius: 4px;
    background-color: #e2e2e2;
    font-size: 14px;
    color: #1d1d1d;
    padding: 2px 8px;
    top: 12px;
    right: 12px;
  }
</style>
