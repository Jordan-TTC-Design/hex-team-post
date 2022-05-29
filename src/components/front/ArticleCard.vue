<script>
// import { ref } from 'vue';

export default {
  setup(props) {
    return { props };
  },
};
</script>

<template>
  <div class="card">
    <div class="card-body">
      <div class="mb-4">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Velit eum
        veniam nemo quidem, expedita enim iure dolore dicta ipsa excepturi
        ducimus voluptatem! Qui molestiae quos quas cum fugiat numquam pariatur!
      </div>

      <div class="tmp">
        <span><i class="bi bi-heart"></i> 123</span>
        <span class="a">查看文章</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.tmp {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #2f2f2f;
}

.a {
  font-size: 16px;
  color: #1d1d1d;
}
</style>
