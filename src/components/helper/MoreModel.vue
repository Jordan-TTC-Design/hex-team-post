<script>
import { ref } from 'vue';

export default {
  props: ['itemId', 'functionList'],
  setup() {
    const modalOpen = ref(false);
    function toogleFunc(targetFunc) {
      targetFunc();
      modalOpen.value = false;
    }
    return {
      modalOpen,
      toogleFunc,
    };
  },
};
</script>

<template>
  <div class="moreMenu">
    <button type="button" @click="modalOpen = !modalOpen" class="btn btn-sm">
      <i class="webIcon bi bi-three-dots"></i>
    </button>
    <ul v-show="modalOpen === true" class="moreMenu__box border border-secondary rounded bg-white">
      <template v-for="func in functionList" :key="func.name">
        <li class="moreMenu__item" @click="toogleFunc(func.func)">{{ func.name }}</li>
      </template>
    </ul>
  </div>
  <div v-show="modalOpen === true" class="dropdownBg" @click="modalOpen = false"></div>
</template>

<style lang="scss" scoped>
.moreMenu {
  position: relative;
  z-index: 220;
  &__box {
    position: absolute;
    bottom: -0.25rem;
    right: 0;
    transform: translateY(100%);
  }
  &__item {
    cursor: pointer;
    padding: 0.5rem 0.75rem;
    min-width: 4rem;
    text-align: center;
    &:first-child {
      border-radius: 0.5rem 0.5rem 0 0;
    }
    &:last-child {
      border-radius: 0 0 0.5rem 0.5rem;
    }
    &:hover {
      background-color: var(--bs-gray-light);
      color: var(--bs-dark);
    }
    &:not(:last-child) {
      border-bottom: 1px solid var(--bs-gray-middle);
    }
  }
}
.moreMenu__item {
  white-space: nowrap;
  &:last-child {
    border-bottom: 0;
  }
}
.dropdownBg {
  z-index: 200;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>
