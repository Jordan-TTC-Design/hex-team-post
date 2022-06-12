<script>
import { ref, onMounted } from 'vue';
import DiamondPurchaseRecordCard from '@/components/front/DiamondPurchaseRecordCard.vue';
import DiaryRetailRecordCard from '@/components/front/DiaryRetailRecordCard.vue';
import DiaryBuyRecordCard from '@/components/front/DiaryBuyRecordCard.vue';

import walletStore from '@/stores/walletStore';

export default {
  components: {
    DiamondPurchaseRecordCard,
    DiaryRetailRecordCard,
    DiaryBuyRecordCard,
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

    const changeTab = async (newTab) => {
      if (newTab === tabs[0].type) {
        await walletData.getDiaryPurchaseRecord();
      } else if (newTab === tabs[1].type) {
        await walletData.getDiaryRetailRecord();
      } else if (newTab === tabs[2].type) {
        await walletData.getDiamondPurchaseRecord();
      }
      currentTab.value = newTab;
    };

    onMounted(async () => {
      changeTab(currentTab.value);
      await walletData.getDiamond();
    });

    return {
      props,
      walletData,
      currentTab,
      tabs,
      changeTab,
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
        @click="changeTab(t.type)"
      >
        {{ t.text }}
      </div>
    </div>
    <div class="subContent d-flex flex-column gap-3" v-if="currentTab === tabs[0].type">
      <DiaryBuyRecordCard v-for="r in walletData.diaryPurchaseRecord" :key="r.id" :record="r" />

      <div
        v-if="walletData.diaryPurchaseRecord.length === 0"
        class="noContentBox noContentBox--sm"
      >
        <p>您尚未購買任何日記</p>
      </div>
    </div>
    <div class="subContent d-flex flex-column gap-3" v-else-if="currentTab === tabs[1].type">
      <DiaryRetailRecordCard v-for="r in walletData.diaryRetailRecord" :key="r.id" :record="r" />
      <div v-if="walletData.diaryRetailRecord.length === 0" class="noContentBox noContentBox--sm">
        <p>您尚未售出任何日記</p>
      </div>
    </div>
    <div class="subContent d-flex flex-column gap-3" v-else-if="currentTab === tabs[2].type">
      <DiamondPurchaseRecordCard
        v-for="r in walletData.diamondPurchaseRecord"
        :key="r.id"
        :record="r"
      />
      <div
        v-if="walletData.diamondPurchaseRecord.length === 0"
        class="noContentBox noContentBox--sm"
      >
        <p>您尚未購買秘密鑽石</p>
      </div>
    </div>
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
    color: var(--bs-dark);
    background: var(--bs-white);
    border-radius: 0.75rem;
    cursor: pointer;
    &:hover {
      color: var(--bs-primary);
    }
    @media (max-width: 767.98px) {
      font-size: 0.875rem;
    }
    &.active {
      background: var(--bs-secondary);
      color: var(--bs-primary);
    }
  }
}
</style>
