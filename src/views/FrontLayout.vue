<script>
import FrontHeader from '@/components/front/FrontHeader.vue';
import SignUpModel from '@/components/front/SignUpModel.vue';

export default {
  components: {
    FrontHeader,
    SignUpModel,
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
  <SignUpModel />
</template>

<style lang="scss" scoped>
</style>
