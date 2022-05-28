<script>
import BackstageHeader from '@/components/backstage/BackstageHeader.vue';
import backStatusStore from '@/stores/backstage/backStatusStore';
import PostSlider from '@/components/backstage/PostSlider.vue';
import UserSlider from '@/components/backstage/UserSlider.vue';
import MemberSettingSlider from '@/components/backstage/MemberSettingSlider.vue';

export default {
  components: {
    BackstageHeader,
    PostSlider,
    UserSlider,
    MemberSettingSlider,
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
  <PostSlider
    :select-item="backStageData.postItem"
    @get-posts="backStageData.getPosts"
    @clear-item="backStageData.clearPostItem"
  />
  <UserSlider
    :select-item="backStageData.postItem"
    @get-posts="backStageData.getPosts"
    @clear-item="backStageData.clearPostItem"
  />
  <MemberSettingSlider
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
