<script>
// eslint-disable-next-line object-curly-newline
import { ref, computed, watch, onMounted } from 'vue';
import userStore from '@/stores/userStore';
import postsStore from '@/stores/postsStore';
import statusStore from '@/stores/statusStore';
import FrontHeader from '@/components/front/FrontHeader.vue';
import SignUpModel from '@/components/front/models/SignUpModel.vue';
import LogInModel from '@/components/front/models/LogInModel.vue';
import DiamondModel from '@/components/front/models/DiamondModel.vue';
import AskModel from '@/components/helper/AskModel.vue';
import RemindModel from '@/components/helper/RemindModel.vue';
import PopInfoModel from '@/components/helper/PopInfoModel.vue';
import NewPostModel from '@/components/helper/NewPostModel.vue';
import ForgetPasswordModel from '@/components/front/models/ForgetPasswordModel.vue';
import Loader from '@/components/helper/Loader.vue';
import PageLoader from '@/components/helper/PageLoader.vue';
import ImageSquareCropperModal from '@/components/helper/ImageSquareCropperModal.vue';
import EmailModel from '@/components/helper/EmailModel.vue';

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
    ImageSquareCropperModal,
    EmailModel,
    PopInfoModel,
  },
  setup() {
    const postsData = postsStore();
    const statusData = statusStore();
    const userData = userStore();
    const fullWidth = ref(window.innerWidth);
    const ready = ref(false);
    onMounted(async () => {
      window.onresize = () => {
        fullWidth.value = window.innerWidth;
      };
      const checkLocalResult = await userData.getLocalToken();
      if (checkLocalResult) {
        const checkResult = await userData.checkLogIn(userData.user.token);
        console.log(checkResult);
        if (checkResult.status) {
          localStorage.setItem('sd-user', JSON.stringify(userData.user));
        } else {
          userData.resetUser();
        }
      }
      ready.value = true;
    });
    const statusCheck = computed(() => statusData.noScroll);
    watch(statusCheck, (newValue) => {
      if (newValue === true && fullWidth.value < 996) {
        document.body.classList.add('overflow-hidden');
      } else {
        document.body.classList.remove('overflow-hidden');
      }
    });
    return {
      ready,
      postsData,
      statusData,
    };
  },
};
</script>

<template>
  <div class="position-relative d-flex flex-column flex-grow-1">
    <PageLoader class="zindex-fixed" v-if="!ready || statusData.pageLoading" />
    <template v-if="ready">
      <FrontHeader class="sticky-top sticky-header" />
      <main class="front-main wrapper__content flex-grow-1">
        <RouterView />
      </main>
      <SignUpModel />
      <EmailModel />
      <DiamondModel />
      <LogInModel />
      <NewPostModel />
      <ForgetPasswordModel />
      <Loader class="zindex-fixed" v-show="statusData.isLoading.length > 0" />
      <ImageSquareCropperModal />
      <AskModel />
      <RemindModel />
      <PopInfoModel />
    </template>
  </div>
</template>

<style lang="scss" scoped>
.wrapper__content {
  padding-bottom: 6rem;
}
.sticky-header {
  z-index: 1200;
}
</style>
