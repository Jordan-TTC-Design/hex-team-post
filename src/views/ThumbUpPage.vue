<script>
import { ref } from 'vue';
import PageTitleBox from '@/components/front/PageTitleBox.vue';

export default {
  components: {
    PageTitleBox,
  },
  setup() {
    const pageNavSelect = ref(1);
    return { pageNavSelect };
  },
};
</script>

<template>
  <div class="container">
    <div class="row d-flex justify-content-center">
      <div class="col-7">
        <PageTitleBox class="mb-6" title-content="我按讚的貼文" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>

</style>
