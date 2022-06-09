<script>
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';

import PostSection from '@/components/front/PostSection.vue';
import DiarySection from '@/components/front/DiarySection.vue';
import FollowSection from '@/components/front/FollowSection.vue';
import LikeSection from '@/components/front/LikeSection.vue';
import WalletSection from '@/components/front/WalletSection.vue';
import SettingSection from '@/components/front/SettingSection.vue';

import MyProfileCard from '@/components/front/cards/MyProfileCard.vue';
import UserProfileCard from '@/components/front/cards/UserProfileCard.vue';
import ProductCard from '@/components/front/cards/ProductCard.vue';
import RecommendFollowCard from '@/components/front/cards/RecommendFollowCard.vue';

import userStore from '@/stores/userStore';
import followStore from '@/stores/followStore';
import productStore from '@/stores/productStore';

export default {
  components: {
    PostSection,
    DiarySection,
    FollowSection,
    LikeSection,
    WalletSection,
    SettingSection,
    MyProfileCard,
    UserProfileCard,
    ProductCard,
    RecommendFollowCard,
  },
  setup() {
    const userData = userStore();
    // 頁籤分頁
    const followData = followStore();
    const productData = productStore();

    const currentTab = ref('POST');
    const changeCurrentTab = (newTab) => {
      currentTab.value = newTab;
    };

    const products = ref([]);
    const usersList = ref([]);

    const route = useRoute();

    const userId = ref(route.params.id);
    watch(
      () => route.params.id,
      (newUserId) => {
        userId.value = newUserId;
        currentTab.value = 'POST';
      },
    );

    onMounted(async () => {
      if (userData.user.id === userId.value) {
        usersList.value = await followData.getHotUser();
      } else {
        products.value = await productData.getProducts('ticket');
      }
    });

    return {
      products,
      userId,
      userData,
      currentTab,
      usersList,
      changeCurrentTab,
    };
  },
};
</script>

<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-xl-6 col-lg-8 col-12 d-flex flex-column gap-4">
        <MyProfileCard
          v-if="userId === userData.user.id"
          :tabType="currentTab"
          @change-tab="changeCurrentTab"
        />
        <UserProfileCard
          v-else
          :userId="userId"
          :tabType="currentTab"
          @change-tab="changeCurrentTab"
        />
        <div v-if="userId === userData.user.id">
          <PostSection :userId="userId" v-if="currentTab === 'POST'" />
          <DiarySection :userId="userId" v-if="currentTab === 'DIARY'" />
          <FollowSection :userId="userId" v-if="currentTab === 'FOLLOW'" />
          <LikeSection v-if="currentTab === 'LIKE'" />
          <WalletSection v-if="currentTab === 'WALLET'" />
          <SettingSection v-if="currentTab === 'SETTING'"></SettingSection>
        </div>
        <div v-else>
          <PostSection :userId="userId" v-if="currentTab === 'POST'" />
          <DiarySection :userId="userId" v-if="currentTab === 'DIARY'" />
          <FollowSection :userId="userId" v-if="currentTab === 'FOLLOW'" />
        </div>
      </div>
      <div class="col-lg-4 col-5 position-relative">
        <ProductCard v-if="userData.user.id !== userId" :userId="userId" :products="products" />
        <RecommendFollowCard v-if="userData.user.id === userId" :user-list="usersList" />
      </div>
    </div>
  </div>
</template>
