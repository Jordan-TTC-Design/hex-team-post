<script>
import { computed } from 'vue';
import moment from 'moment';

export default {
  props: {
    record: Object,
  },
  setup(props) {
    const targetTime = computed(() => {
      const result = moment(props.record.createdAt).locale('zh-tw').format('YYYY/MM/DD HH:mm:ss ');
      return result;
    });
    return {
      props,
      targetTime,
    };
  },
};
</script>

<template>
  <div class="card">
    <div class="card-body position-relative">
      <div class="status">
        {{ props.record.status ? '交易成功' : '交易失敗' }}
      </div>
      <p class="text-dark mb-1 d-flex align-items-center gap-1">
        {{ props.record.summary }}
        <span class="fs-6">({{ props.record.name }})</span>
      </p>
      <p class="time mb-3">{{ targetTime }}</p>
      <div class="d-flex flex-md-row flex-column gap-1">
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
    </div>
  </div>
</template>

<style lang="scss" scoped>
.time {
  font-size: 12px;
  color: #979797;
}
.tmp {
  flex: 1;
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
  background-color: var(--bs-gray-light);
  font-size: 14px;
  color: #1d1d1d;
  padding: 2px 8px;
  top: 12px;
  right: 12px;
  @media (max-width: 576.98px){
    position: relative;
    top: 0;
    right: 0;
    padding: 0.125rem 0.5rem;
    margin-bottom: 0.5rem;
  }
}
</style>
