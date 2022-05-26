<script>
import BackstageHeader from '@/components/backstage/BackstageHeader.vue';
import PostSilder from '@/components/backstage/PostSilder.vue';
import backStatusStore from '@/stores/backstage/backStatusStore';

export default {
  components: {
    BackstageHeader,
    PostSilder,
  },
  setup() {
    const backStageData = backStatusStore();
    return {
      backStageData,
    };
  },
};
</script>

<template>
  <div class="back-layout">
    <BackstageHeader />
    <main class="back-main">
      <RouterView />
    </main>
  </div>
  <PostSilder
    :select-item="backStageData.postItem"
    @get-posts="backStageData.getPosts"
    @clear-item="backStageData.clearPostItem"
  />
</template>

<style lang="scss" scoped>
.back-layout {
  width: 100%;
  padding-left: 270px;
  .back-main {
    background-color: #f2f2f2;
    width: 100%;
    min-height: 100vh;
  }
}
</style>
