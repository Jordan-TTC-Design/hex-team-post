<script>
import FrontHeader from '@/components/front/FrontHeader.vue';
import SignUpModel from '@/components/front/SignUpModel.vue';
import LogInModel from '@/components/front/LogInModel.vue';
import DiamondModel from '@/components/front/DiamondModel.vue';
import AskModel from '@/components/helper/AskModel.vue';
import RemindModel from '@/components/helper/RemindModel.vue';
import NewPostModel from '@/components/helper/NewPostModel.vue';
import ForgetPasswordModel from '@/components/front/ForgetPasswordModel.vue';

export default {
  components: {
    FrontHeader,
    SignUpModel,
    LogInModel,
    DiamondModel,
    AskModel,
    RemindModel,
    NewPostModel,
    ForgetPasswordModel,
  },
  setup() {
    return {};
  },
};
</script>

<template>
  <div class="position-relative">
    <FrontHeader class="sticky-top top-0" />
    <main class="front-main">
      <RouterView />
    </main>
    <SignUpModel />
    <DiamondModel />
    <LogInModel />
    <AskModel />
    <RemindModel />
    <NewPostModel />
    <ForgetPasswordModel />
  </div>
</template>

<style lang="scss" scoped></style>
