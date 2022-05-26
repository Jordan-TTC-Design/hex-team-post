<script>
import FrontHeader from '@/components/front/FrontHeader.vue';
import SignUpModel from '@/components/front/SignUpModel.vue';
import LogInModel from '@/components/front/LogInModel.vue';

export default {
  components: {
    FrontHeader,
    SignUpModel,
    LogInModel,
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
  <LogInModel />
</template>

<style lang="scss" scoped>
</style>
