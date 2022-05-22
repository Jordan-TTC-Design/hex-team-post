<script>
import BackstageHeader from '@/components/backstage/BackstageHeader.vue';

export default {
  components: {
    BackstageHeader,
  },
  setup() {
    return {};
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
