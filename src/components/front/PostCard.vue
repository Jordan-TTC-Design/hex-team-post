<script>
import { computed } from 'vue';
import userStore from '@/stores/userStore';

export default {
  props: ['postItem'],
  setup(props) {
    const userData = userStore();
    // const isShowMore = ref(a.length <= 200);
    // const showMore = () => {
    //   isShowMore.value = true;
    // };
    console.log(props.postItem);
    const targetItem = computed(() => props.postItem);
    return {
      userData,
      targetItem,
    };
  },
};
</script>

<template>
  <div class="card mb-3" v-if="targetItem !== undefined">
    <div class="card-body">
      <div class="d-flex align-items-center mb-3">
        <img src="@/assets/image/user-picture.png" alt="user-picture" class="user-picture" />
        <div class="user-info">
          <RouterLink class="user-info-title" to="/profile/628e4bbfad29e4c054c9f380">
            用戶名稱
          </RouterLink>
          <span class="user-info-subtitle">200 人追蹤</span>
        </div>
        <div class="btn btn-sm">追蹤</div>
      </div>
      <div v-html="targetItem.content"></div>
      <!-- <div class="" v-else>
        {{ content.substring(0, 200) }}
        <span @click="showMore" class="showMore">... 顯示更多</span>
      </div> -->
    </div>
    <img
      v-if="targetItem.image.length > 0"
      :src="targetItem.image"
      :alt="`${targetItem.id}圖片`"
      class="img-fluid"
    />
    <div class="card-body d-flex align-items-center">
      <div class="icon text-primary">
        <i class="bi bi-heart-fill"></i>
        <span class="">{{ targetItem.likes.length }}</span>
      </div>
      <div class="icon">
        <i class="bi bi-share"></i>
      </div>
      <span class="ms-auto">2022 / 01 / 01 12:12</span>
    </div>
    <div class="card-body border-top postCard-response">
      <img :src="userData.user.photo" alt="" class="user-picture" />
      <input type="text" class="form-control" placeholder="回覆..." />
      <button class="btn">
        <i class="bi bi-play-fill"></i>
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.showMore {
  user-select: none;
  cursor: pointer;
}
</style>
