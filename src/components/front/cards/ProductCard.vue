<script>
// import MoreModel from '@/components/helper/MoreModel.vue';

export default {
  props: {
    products: Array,
  },
  components: {
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
    <div class="card-body border-bottom">
      <div class="card-title">訂閱方案</div>
    </div>
    <div class="card-body">
      <div class="sponsor" v-for="p in props.products" :key="p._id">
        <span class="sponsor-title">{{ p.coin }} SD / {{p.effectiveOfMonthNumber}} 月</span>
        <span class="sponsor-subtitle">{{ p.name }}</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
</style>
