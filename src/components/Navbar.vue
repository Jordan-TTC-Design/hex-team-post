<script>
export default {
  props: ['post-item'],

  setup() {},
};
</script>
<template>
  <div class="menu container-fluid">
    <div class="content container">
      <div class="navbar__title">
        <a href="">MetaWall</a>
      </div>
      <div
        class="navbar__member d-flex justify-content-center align-items-center"
      >
        <img
          :src="postItem[1].userImgUrl"
          :alt="`${postItem.userName}`"
          width="30px"
          height="30px"
        />
        <p class="ms-2">Member</p>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.menu {
  // width: 100vw;
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
