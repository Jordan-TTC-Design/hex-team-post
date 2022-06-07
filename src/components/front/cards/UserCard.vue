<script>
export default {
  props: ['userItem'],
  setup(props) {
    return { props };
  },
};
</script>

<template>
  <div class="card" :class="props.class">
    <div class="card-body">
      <div class="img-fluid border mb-3 rounded tmp"></div>
      <div>{{ userItem.user.name }}</div>
      <div>
        <div class="icon">
          <i class="bi bi-heart"></i>
          <span>{{userItem.user.likeSize}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.tmp {
  width: 176px;
  height: 176px;
}
</style>
