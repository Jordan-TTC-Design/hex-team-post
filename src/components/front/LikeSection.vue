<script>
// import { ref } from 'vue';
// import PostCard from '@/components/front/PostCard.vue';
// import PostFilter from '@/components/front/PostFilter.vue';

export default {
  components: {
    // PostCard,
    // PostFilter,
  },
  props: {
    user: Object,
  },
  setup(props) {
    return {
      props,
    };
  },
};
</script>

<template>
  Oops!
</template>

<style lang="scss" scoped>
.side-menu-item {
  padding: 10px 0;
  text-align: center;
  font-size: 16px;
  columns: #1d1d1d;
  background: #fff;
  border-radius: 12px;

  &.active {
    background: var(--bs-secondary);
    color: var(--bs-primary);
  }
}
</style>
