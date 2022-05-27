<script>
import FrontHeader from '@/components/front/FrontHeader.vue';
import SignUpModel from '@/components/front/SignUpModel.vue';
import LogInModel from '@/components/front/LogInModel.vue';
import DiamondModel from '@/components/front/DiamondModel.vue';

export default {
  components: {
    FrontHeader,
    SignUpModel,
    LogInModel,
    DiamondModel,
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
  <DiamondModel />
  <LogInModel />
</template>

<style lang="scss" scoped></style>
