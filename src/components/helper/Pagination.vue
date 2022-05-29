<script>
import { computed } from 'vue';

export default {
  props: ['pagination-data'],
  emits: ['change-page-number'],
  setup(props, { emit }) {
    const pagination = computed(() => props.paginationData || { totalPages: 1, nowPage: 1 });
    const pageList = computed(() => {
      const array = [];
      // eslint-disable-next-line no-plusplus
      for (let i = 1; i <= pagination.value.totalPages; i++) {
        array.push(i);
      }
      return array;
    });
    function changePage(action) {
      if (action > 0 && pagination.value.nowPage < pagination.value.totalPages) {
        pagination.value.nowPage += 1;
        emit('change-page-number', pagination.value.nowPage);
      } else if (action < 0 && pagination.value.nowPage > 1) {
        pagination.value.nowPage -= 1;
        emit('change-page-number', pagination.value.nowPage);
      }
    }
    return { pagination, pageList, changePage };
  },
};
</script>

<template>
  <ul class="pagination bg-gray-100 rounded">
    <li
      class="pagination__item mr-1"
      :class="{
        is_able: pagination.nowPage > 1,
        'text-gray-300': pagination.nowPage <= 1,
      }"
      @click="changePage(-1)"
    >
      <i class="bi bi-arrow-left"></i>
    </li>
    <template v-for="page in pageList" :key="page">
      <li
        :class="{ active: pagination.nowPage === page }"
        class="pagination__item mr-1 is_able"
        @click="$emit('change-page-number', page)"
      >
        {{ page }}
      </li>
    </template>
    <li
      class="pagination__item"
      :class="{
        is_able: pagination.nowPage < pageList.length,
        'text-gray-300': pagination.nowPage >= pageList.length,
      }"
      @click="changePage(1)"
    >
      <i class="bi bi-arrow-right"></i>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
.pagination {
  display: flex;
  align-items: center;
  background-color: var(--bs-white);
  &__item {
    padding: 0.5rem 1rem;
    position: relative;
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 0px;
      width: 100%;
      background-color: var(--bs-primary);
      transition: all 0.3s;
    }
    &.active {
      background-color: var(--bs-secondary);
      color: var(--bs-primary);
      &::after {
        height: 4px;
      }
    }
    &.is_able {
      cursor: pointer;
    }
    &:hover {
      background-color: rgba(255, 2555, 255, 0.5);
    }
  }
}
</style>
