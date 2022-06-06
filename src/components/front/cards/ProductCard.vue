<script>
// import MoreModel from '@/components/helper/MoreModel.vue';
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
    <div class="productCard card" :class="{ active: listShow }">
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
.sideBox {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  z-index: 100;
  @media (max-width: 991.98px) {
    position: fixed;
    bottom: 4rem;
    right: 1.5rem;
    width: 240px;
    align-items: end;
  }
}
.sideBtn {
  height: 4rem;
  width: 4rem;
  border: 1px solid var(--bs-primary);
  border-radius: 50%;
  background: var(--bs-primary);
  color: var(--bs-white);
  font-size: 1.5rem;
  transition: all 0.3s;
  &:hover {
    color: var(--bs-secondary);
    transform: translateY(-10%);
  }
}
.productCard {
  width: 100%;
  z-index: 2500;
  @media (max-width: 991.98px) {
    transform: translateX(100%);
    transition: all 0.3s;
    position: fixed;
    top: 62px;
    left: 0;
    right: 0;
    bottom: 46px;
    border-radius: 0;
    display: flex;
    flex-direction: column;
    padding-bottom: 0.5rem;
    .card-body {
      flex-grow: 1;
      overflow-y: auto;
    }
    &.active {
      transform: translateX(0);
    }
  }
}
</style>
