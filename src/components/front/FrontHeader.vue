<script>
import { ref } from 'vue';

export default {
  setup() {
    const userData = ref({
      name: 'Jordan',
      photo:
        'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    });
    return { userData };
  },
};
</script>

<template>
  <div class="menu container-fluid">
    <div class="content container">
      <div class="navbar__title">
        <a href="">MetaWall</a>
      </div>
      <div class="navbar__member d-flex justify-content-center align-items-center">
        <img :src="userData.photo" :alt="`${userData.name}`" width="30px" height="30px" />
        <p class="ms-2">{{ userData.name || '尚未的入' }}</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.menu {
  border-bottom: 4px solid #000400;
  margin-bottom: 49px;
}
.content {
  max-width: 872px;
  margin: 0px auto;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.navbar__member p {
  font-size: 22px;
  border-bottom: 2px solid #000;
  padding-bottom: 0px;
  color: #000;
  font-weight: 900px;
}
.navbar__member img {
  width: 30px;
  height: 30px;
  border-radius: 100%;
  background: #000;
  object-fit: cover;
  object-position: center;
}
.navbar__title a {
  font-size: 30px;
  font-weight: 1000px;

  color: #000;
}
</style>
