<script>
import { ref, onMounted } from 'vue';
import DiamondPurchaseRecordCard from '@/components/front/DiamondPurchaseRecordCard.vue';

import walletStore from '@/stores/walletStore';

export default {
  components: {
    DiamondPurchaseRecordCard,
  },
  props: {
    user: Object,
  },
  setup(props) {
    const walletData = walletStore();
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

    onMounted(async () => {
      const diam = await walletData.getDiamond();
      console.log(diam.data);
    });

    return {
      props,
      walletData,
      currentTab,
      tabs,
    };
  },
};
</script>

<template>
  <div class="d-flex gap-4">
    <div class="subSide me-0">
      <div
        v-for="t in tabs"
        :key="t.type"
        class="subSide__item"
        :class="[currentTab === t.type ? 'active' : '']"
        @click="currentTab = t.type"
      >
        {{ t.text }}
      </div>
    </div>
    <div class="subContent d-flex flex-column gap-3" v-if="currentTab === tabs[0].type">
      <DiamondPurchaseRecordCard />
      <DiamondPurchaseRecordCard />
      <DiamondPurchaseRecordCard />
      <DiamondPurchaseRecordCard />
    </div>
    <div class="subContent" v-else-if="currentTab === tabs[1].type">Oops 1 !</div>
    <div class="subContent" v-else-if="currentTab === tabs[2].type">Oops 2 !</div>
  </div>
</template>

<style lang="scss" scoped>
.subSide {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex-shrink: 1;
  &__item {
    padding: 0.5rem 0.75rem;
    text-align: center;
    font-size: 1rem;
    columns: var(--bs-dark);
    background: var(--bs-white);
    border-radius: 0.75rem;
    cursor: pointer;
    @media (max-width: 767.98px) {
      font-size: 0.875rem;
    }
    &.active {
      background: var(--bs-secondary);
      color: var(--bs-primary);
    }
  }
}
.subContent {
}
</style>
