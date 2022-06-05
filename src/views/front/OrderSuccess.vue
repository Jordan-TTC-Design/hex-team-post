<script>
import { ref } from 'vue';

import { useRoute } from 'vue-router';

export default {
  setup() {
    const text = ref('123');
    const route = useRoute();
    console.log(route.query);
    return {
      text,
    };
  },
};
</script>

<template>
  <p>結帳成功</p>
</template>

<style lang="scss" scoped></style>
