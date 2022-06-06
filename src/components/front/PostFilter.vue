<script>
import { ref, onMounted } from 'vue';

export default {
  components: {},
  props: {
    items: Array,
    header: String,
  },
  setup(props, { emit }) {
    const query = ref('');
    const type = ref(props.items[0].type);
    const name = ref(props.items[0].name);
    const isDropdown = ref(false);

    const toggle = () => {
      isDropdown.value = !isDropdown.value;
    };

    const search = () => {
      const data = {
        query: query.value,
        type: type.value || 'asc',
      };
      console.log(data);
      emit('search', data);
    };

    const choose = (newName, newType) => {
      name.value = newName;
      type.value = newType;
      toggle();
      search();
    };
    onMounted(async () => {
      search();
    });
    return {
      props,
      query,
      type,
      name,
      isDropdown,
      search,
      choose,
      toggle,
    };
  },
};
</script>

<template>
  <div class="postFilter" :class="props.class">
    <div class="postFilter-search">
      <input type="text" class="form-control bg-white" placeholder="搜尋關鍵字" v-model="query" />
      <button class="btn search p-0 me-3" type="button" @click="search">
        <i class="bi bi-search"></i>
      </button>
    </div>
    <div class="postFilter-dropdown">
      <div class="postFilter-dropdown-text" @click="toggle">
        {{ name }}
        <i
          class="bi bi-chevron-down"
          :class="[isDropdown ? 'bi-chevron-up' : 'bi-chevron-down']"
        ></i>
      </div>
      <div class="tmp" v-if="isDropdown">
        <ul class="d">
          <li class="d-header" v-if="header">{{ header }}</li>
          <li
            class="d-item"
            :class="[type === i.type ? 'active' : '']"
            v-for="i in props.items"
            :key="i.type"
            @click="choose(i.name, i.type)"
          >
            {{ i.name }}
          </li>
        </ul>
      </div>
    </div>
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

  display: flex;

  & > .postFilter-search {
    cursor: pointer;
    flex-grow: 1;
    color: #646464;
    display: flex;
    & .form-control {
      flex-grow: 1;
    }
  }
  & > .postFilter-dropdown {
    flex-basis: 180px;
    position: relative;

    & > .postFilter-dropdown-text {
      padding: 10px 12px;
      display: flex;
      justify-content: space-between;
      color: #1d1d1d;
      cursor: pointer;
    }
    &::after {
      content: '';
      border-left: 1px solid #e2e2e2;
      position: absolute;
      width: 1px;
      height: 24px;
      top: 10px;
    }
  }

  // & > .search {
  //   cursor: pointer;
  //   color: #646464;
  // }

  // & > .postFilter-dropdown {
  //   position: relative;
  //   background-color: #fff;
  //   padding: 9px 11px;
  //   border: 1px solid #fff;
  //   border-top-right-radius: 12px;
  //   border-bottom-right-radius: 12px;
  //   flex-basis: 180px;
  //   text-align: left;

  //   display: flex;
  //   justify-content: space-between;
  //   &::after {
  //     content: '';
  //     border-left: 1px solid #e2e2e2;
  //     position: absolute;
  //     width: 1px;
  //     height: 24px;
  //     left: 0;
  //   }
  // }
}

.tmp {
  width: 100%;
  position: absolute;
  top: 60px;
  z-index: 300;
}

.d {
  border-radius: 12px;
  border: 1px solid #f2e8fc;
  background-color: #fff;
  box-shadow: 0px 1px 2px #00000029;
  z-index: 300;
  .d-header {
    padding: 10px 12px;
    color: #1d1d1d;
    background-color: #f2f2f2;
    border-bottom: 1px solid #f2e8fc;
  }
  .d-item {
    padding: 10px 12px;
    cursor: pointer;
    &:hover,
    &.active {
      color: var(--bs-primary);
      background-color: var(--bs-secondary);
    }
    & + .d-item {
      border-top: 1px solid #f2e8fc;
    }
  }
}

.moreMenu {
  position: relative;
  z-index: 201;
  &__box {
    position: absolute;
    bottom: -0.25rem;
    right: 0;
    transform: translateY(100%);
    width: 180px;
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
