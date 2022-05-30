<script>
import { ref } from 'vue';
import userStore from '@/stores/userStore';

export default {
  props: ['post-item'],
  setup() {
    const userData = userStore();

    const a = `今天臺北市新增本土確診病例逼近萬人，很快地，染疫人數可能會超過PCR量能，造成確診人數失準。但根據各種模型推算，臺北的疫情洪峰將在5月16日到23日之間，我們必須再調整戰略。
        現階段最重要的事就是做到
        #輕重分流，保留最大醫療量能處理中重症病患。因此今天我記者會結束，立刻與臺北市各大醫院的院長視訊，商討接下來的
        #防疫策略。 #防疫專責病房
        要增加到30%，但各醫院還有其他重症病患，所以授權各醫院自行調整，只要總體達到30%目標就可以。我也拜託各大醫院都要儘速開設
        #防疫急門診，並提高作業量，輕症確診者最好在防疫急門診就處理掉，防止急診、醫院被擠垮，導致類似香港急診外，一堆病患躺在擔架上的狀況發生。`;
    const content = ref(a);
    const isShowMore = ref(a.length <= 200);
    const showMore = () => {
      isShowMore.value = true;
    };
    return {
      isShowMore,
      content,
      showMore,
      userData,
    };
  },
};
</script>

<template>
  <div class="card mb-3">
    <div class="card-body">
      <div class="d-flex align-items-center mb-3">
        <img src="@/assets/image/user-picture.png" alt="user-picture" class="user-picture" />
        <div class="user-info">
          <RouterLink class="user-info-title" :to="`/profile/${userData.user.name}`">
            用戶名稱
          </RouterLink>
          <span class="user-info-subtitle">200 人追蹤</span>
        </div>
        <div class="btn btn-sm">追蹤</div>
      </div>
      <div class="" v-if="isShowMore">
        {{ content }}
      </div>
      <div class="" v-else>
        {{ content.substring(0, 200) }}
        <span @click="showMore" class="showMore">... 顯示更多</span>
      </div>
    </div>
    <img
      src="https://images.unsplash.com/photo-1614102073832-030967418971?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1738"
      alt=""
      class="img-fluid"
    />
    <div class="card-body d-flex align-items-center">
      <div class="icon text-primary">
        <i class="bi bi-heart-fill"></i>
        <span class="">1234</span>
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
