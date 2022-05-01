<script>
export default {
  props: ['title-content'],
  setup() {
    return {};
  },
};
</script>
<template>
  <div class="pageTitleBox">
    <h2 class="pageTitleBox__title">{{ titleContent }}</h2>
  </div>
</template>
<style lang="scss" scoped>
.pageTitleBox {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem;
  position: relative;
  border: 2px solid #000;
  background-color: white;
  transform-style: preserve-3d;
  &::after {
    content: '';
    height: 100%;
    width: 100%;
    position: absolute;
    border: 2px solid #000;
    top: 0.35rem;
    right: 0.35rem;
    transform: translateZ(-1px);
  }
  &__title {
    font-size: 1rem;
    color: black;
    font-weight: 700;
  }
}
</style>
