<script>
export default {
  props: ['post-item'],
  setup() {},
};
</script>

<template>
  <div class="dynamic-wall d-flex align-items-center flex-column">
    <div class="btn d-flex align-items-center justify-content-center">
      <p>{{ '張貼動態' }}</p>
    </div>
    <div class="dynamic">
      <div class="d-flex ml-2 mb-3 dynamic__name">
        <a href=""
          ><img :src="postItem[0].userImgUrl" :alt="`${postItem[0].userName}`"
        /></a>
        <p>{{ postItem[0].userName }}</p>
      </div>
      <div class="d-flex ml-2 mb-3 dynamic__list">
        <a href=""><img src="@/assets/img/bell.png" alt="" /></a>
        <p>{{ '追蹤名單' }}</p>
      </div>
      <div class="d-flex ml-2 mb-3 dynamic__favorite-article">
        <a href=""><img src="@/assets/img/like.png" alt="" /></a>
        <p>{{ '我按讚的文章' }}</p>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.dynamic-wall {
  width: 100%;
  border: 2px solid #000400;
  .btn {
    cursor: pointer;
    display: block;
    margin: 20px auto;
    width: 220px;
    height: 54px;
    border-radius: 8px;
    border: 2px solid #000400;
    background: #03438d 0% 0% no-repeat padding-box;
    box-shadow: -2px 2px 0px #000400;
    p {
      color: white;
      line-height: 3;
    }
  }
  .dynamic {
    width: 220px;
    display: block;
    margin: 0 auto;
    p {
      color: #000400;
      line-height: 3;
      margin-left: 16px;
    }
    img {
      width: 50px;
      height: 50px;
      border: 2px solid #000400;
      border-radius: 100%;
      object-fit: cover;
      object-position: center;
      background: #e2edfa;
    }
  }
}
</style>
