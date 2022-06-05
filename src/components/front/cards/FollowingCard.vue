<script>
export default {
  props: ['following'],
  setup(props) {
    return {
      props,
    };
  },
};
</script>
<template>
  <div class="card mb-3">
    <div class="card-body border-bottom">
      <div class="card-title">追蹤名單</div>
    </div>
    <div class="card-body">
      <div class="d-flex align-items-center mb-3" v-for="f in props.following" :key="f.id">
        <div class="user-picture"></div>
        <div class="user-info">
          <RouterLink :to="`/profile/${f.id}`" class="user-info-title">{{
            f.name
          }}</RouterLink>
        </div>
        <!-- <div class="btn btn-sm text-primary">追蹤</div> -->
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
</style>
