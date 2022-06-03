<script>
import { ref } from 'vue';
import DiamondPurchaseRecordCard from '@/components/front/DiamondPurchaseRecordCard.vue';

export default {
  components: {
    DiamondPurchaseRecordCard,
  },
  props: {
    user: Object,
  },
  setup(props) {
    const tabs = [
      {
        text: '日記購買紀錄',
        type: 'DIARY_PURCHASE',
      },
      {
        text: '日記銷售紀錄',
        type: 'DIARY_RETAIL',
      },
      {
        text: '鑽石購買紀錄',
        type: 'DIAMOND_PURCHASE',
      },
    ];
    const currentTab = ref(tabs[0].type);

    return {
      props,
      currentTab,
      tabs,
    };
  },
};
</script>

<template>
  <div class="d-flex">
    <div class="subSide fix">
      <div
        v-for="t in tabs"
        :key="t.type"
        class="side-menu-item mb-3"
        :class="[currentTab === t.type ? 'active' : '']"
        @click="currentTab = t.type"
      >
        {{ t.text }}
      </div>
    </div>
    <div class="subContent" v-if="currentTab === tabs[0].type">
      <DiamondPurchaseRecordCard />
      <DiamondPurchaseRecordCard />
      <DiamondPurchaseRecordCard />
      <DiamondPurchaseRecordCard />
    </div>
    <div class="subContent" v-else-if="currentTab === tabs[1].type">
      Oops 1 !
    </div>
    <div class="subContent" v-else-if="currentTab === tabs[2].type">
      Oops 2 !
    </div>
  </div>
</template>

<style lang="scss" scoped>
.side-menu-item {
  padding: 10px 0;
  text-align: center;
  font-size: 16px;
  columns: #1d1d1d;
  background: #fff;
  border-radius: 12px;
  cursor: pointer;

  &.active {
    background: var(--bs-secondary);
    color: var(--bs-primary);
  }
}
</style>
