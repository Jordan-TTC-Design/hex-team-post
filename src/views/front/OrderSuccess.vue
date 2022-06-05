<script>
import { ref } from 'vue';

export default {
  setup() {
    const text = ref('123');
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
