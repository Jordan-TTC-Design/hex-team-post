<script>
export default {
  props: ['post-item'],
  setup() {
    return {};
  },
};
</script>
<template>
  <div class="postBox gap-3">
    <div class="userBox gap-3">
      <img class="userBox__pic" :src="postItem.userImgUrl" :alt="`${postItem.userName}照片`" />
      <div>
        <p class="userBox__title">{{ postItem.userName }}</p>
        <p class="userBox__subTxt">{{ postItem.creatAt }}</p>
      </div>
    </div>
    <div class="postBox__content gap-3">
      <div class="postBox__content__text" v-html="postItem.postContent"></div>
      <img
        v-if="postItem.postImgUrl !== ''"
        class="postBox__content__img"
        :src="postItem.postImgUrl"
        :alt="`${postItem._id}貼文`"
      />
    </div>
  </div>
</template>
<style lang="scss" scoped>
.postBox {
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  border-radius: 0.5rem;
  border: 2px solid #000;
  box-shadow: 0px 3px 0px #000400;
}
.userBox {
  display: flex;
  align-items: center;
  &__pic {
    width: 45px;
    height: 45px;
    border-radius: 50%;
    border: 2px solid #000;
    object-fit: cover;
  }
  &__title {
    font-weight: bold;
    color: #000;
  }
  &__subTxt {
    font-size: 0.75rem;
    color: #9b9893;
  }
}
.postBox__content {
  display: flex;
  flex-direction: column;
  &__img {
    max-height: 10rem;
    width: 100%;
    object-fit: cover;
    border: 2px solid #000;
    border-radius: 0.5rem;
  }
}
</style>
