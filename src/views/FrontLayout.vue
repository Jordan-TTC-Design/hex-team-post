<script>
import FrontHeader from '@/components/front/FrontHeader.vue';
// import NewPostModel from '@/components/helper/NewPostModel.vue';

export default {
  components: {
    FrontHeader,
    // NewPostModel,
  },
  setup() {
    return {};
  },
};
</script>

<template>
  <FrontHeader />
  <main class="front-main">
    <RouterView />
  </main>
  <!-- <NewPostModel /> -->
</template>

<style lang="scss" scoped>
</style>
