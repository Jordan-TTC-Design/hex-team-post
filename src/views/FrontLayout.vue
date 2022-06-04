<script>
import statusStore from '@/stores/statusStore';
import FrontHeader from '@/components/front/FrontHeader.vue';
import SignUpModel from '@/components/front/models/SignUpModel.vue';
import LogInModel from '@/components/front/models/LogInModel.vue';
import DiamondModel from '@/components/front/models/DiamondModel.vue';
import AskModel from '@/components/helper/AskModel.vue';
import RemindModel from '@/components/helper/RemindModel.vue';
import NewPostModel from '@/components/helper/NewPostModel.vue';
import ForgetPasswordModel from '@/components/front/models/ForgetPasswordModel.vue';
import Loader from '@/components/helper/Loader.vue';
import PageLoader from '@/components/helper/PageLoader.vue';

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
    Loader,
    PageLoader,
  },
  setup() {
    const statusData = statusStore();
    return {
      statusData,
    };
  },
};
</script>

<template>
  <div class="position-relative">
    <PageLoader v-show="statusData.pageLoading === true" />
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
    <Loader v-show="statusData.isLoading.length > 0" />
  </div>
</template>

<style lang="scss" scoped></style>
