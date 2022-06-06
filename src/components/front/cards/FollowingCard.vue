<script>
import { ref } from 'vue';

export default {
  props: ['following'],
  setup(props) {
    const listShow = ref(false);
    return {
      props,
      listShow,
    };
  },
};
</script>
<template>
  <div class="sideBox gap-3">
    <div class="sideBox__card card gap-3" :class="{ active: listShow }">
      <div class="p-3 border-bottom d-flex gap-2 align-items-center">
        <button @click="listShow = !listShow" type="button" class="btn d-lg-none d-block">
          <i class="bi bi-chevron-left"></i>
        </button>
        <div class="card-title">追蹤名單</div>
      </div>
      <div class="card-body">
        <div class="d-flex align-items-center mb-3" v-for="f in props.following" :key="f.id">
          <div class="user-picture"></div>
          <div class="user-info">
            <RouterLink :to="`/profile/${f.id}`" class="user-info-title">{{ f.name }}</RouterLink>
          </div>
        </div>
      </div>
    </div>
    <button @click="listShow = !listShow" type="button" class="sideBtn d-lg-none d-block">
      <i class="bi bi-person-square"></i>
    </button>
  </div>
</template>
<style lang="scss" scoped></style>
