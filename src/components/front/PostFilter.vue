<script>
import { ref } from 'vue';

export default {
  setup(props) {
    const isDropdown = ref(false);

    const toggle = () => {
      isDropdown.value = !isDropdown.value;
    };

    return {
      props,
      isDropdown,
      toggle,
    };
  },
};
</script>

<template>
  <div class="postFilter" :class="props.class">
    <input type="text" class="form-control bg-white" placeholder="搜尋關鍵字" />
    <button class="postFilter-dropdown" @click="toggle">
      最新貼文
      <i
        class="bi bi-chevron-down"
        :class="[isDropdown ? 'bi-chevron-up' : 'bi-chevron-down']"
      ></i>
    </button>
    <!-- <div class="dropdown-menu" :class="[isDropdown ? 'd-block' : 'd-none']">
      123
    </div> -->
    <!-- <div class="icon">
            <i class="bi bi-chevron-down"></i>
          </div> -->
  </div>
</template>

<style lang="scss" scoped>
.postFilter {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;

  background: #fff;
  border-radius: 12px;
  position: relative;
  & > .search {
    flex-grow: 1;
  }

  & > .postFilter-dropdown {
    position: relative;
    background-color: #fff;
    padding: 9px 11px;
    border: 1px solid #fff;
    border-top-right-radius: 12px;
    border-bottom-right-radius: 12px;
    flex-basis: 180px;
    text-align: left;

    display: flex;
    justify-content: space-between;
    &::after {
      content: '';
      border-left: 1px solid #e2e2e2;
      position: absolute;
      width: 1px;
      height: 24px;
      left: 0;
    }
  }
}
</style>
