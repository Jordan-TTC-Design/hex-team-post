<script>
import { ref } from 'vue';
import userStore from '@/stores/userStore';
import postsStore from '@/stores/postsStore';
import PostFilter from '@/components/front/PostFilter.vue';
import DiaryCard from '@/components/front/cards/DiaryCard.vue';
import DiaryPurchaseRecordCard from '@/components/front/DiaryPurchaseRecordCard.vue';

export default {
  components: {
    PostFilter,
    DiaryCard,
    DiaryPurchaseRecordCard,
  },
  setup() {
    const userData = userStore();
    const postsData = postsStore();
    const diariesList = ref([]);
    async function getdiariesData() {
      const result = await postsData.getUserDiary('6298f3663b84eb47c3e1a7ea');
      console.log(result);
      diariesList.value = [...result.data];
    }
    getdiariesData();
    return {
      postsData,
      userData,
      diariesList,
    };
  },
};
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col-8 d-flex flex-column gap-4">
        <PostFilter class="flex-grow-1" />
        <template v-for="(diaryItem, index) in diariesList" :key="diaryItem.id">
          <DiaryCard :post-item="diaryItem" :post-index="index" />
        </template>
      </div>
      <div class="col-4">
        <DiaryPurchaseRecordCard class="side-sticky-top" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.side-sticky-top {
  position: sticky;
  top: 5rem;
}
</style>
