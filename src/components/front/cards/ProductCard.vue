<script>
import { ref } from 'vue';

export default {
  props: {
    products: Array,
  },
  components: {},
  setup(props) {
    const listShow = ref(false);
    return {
      props,
      listShow,
    };
  },
};
</script>
<template>
  <div class="sideBox gap-3">
    <div class="sideBox__card card" :class="{ active: listShow }">
      <div class="p-3 border-bottom d-flex gap-2 align-items-center">
        <button @click="listShow = !listShow" type="button" class="btn d-lg-none d-block">
          <i class="bi bi-chevron-left"></i>
        </button>
        <div class="card-title">訂閱方案</div>
      </div>
      <div class="card-body">
        <div class="sponsor" v-for="p in props.products" :key="p._id">
          <span class="sponsor-title">{{ p.coin }} SD / {{ p.effectiveOfMonthNumber }} 月</span>
          <span class="sponsor-subtitle">{{ p.name }}</span>
        </div>
      </div>
    </div>
    <button @click="listShow = !listShow" type="button" class="sideBtn d-lg-none d-block">
      <i class="bi bi-patch-plus-fill"></i>
    </button>
  </div>
</template>

<style lang="scss" scoped>
</style>
