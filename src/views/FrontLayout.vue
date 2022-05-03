<script>
import FrontHeader from '@/components/front/FrontHeader.vue';

export default {
  components: {
    FrontHeader,
  },
  setup() {
    return {};
  },
};
</script>

<template>
  <FrontHeader />
  <RouterView />
</template>

<style lang="scss" scoped></style>
