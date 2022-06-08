<script>
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';

import PostSection from '@/components/front/PostSection.vue';
import DiarySection from '@/components/front/DiarySection.vue';
import FollowSection from '@/components/front/FollowSection.vue';
import LikeSection from '@/components/front/LikeSection.vue';
import WalletSection from '@/components/front/WalletSection.vue';
import SettingSection from '@/components/front/SettingSection.vue';

import UserProfileCard from '@/components/front/cards/UserProfileCard.vue';
import ProductCard from '@/components/front/cards/ProductCard.vue';

import userStore from '@/stores/userStore';
import statusStore from '@/stores/statusStore';
import productStore from '@/stores/productStore';

export default {
  components: {
    PostSection,
    DiarySection,
    FollowSection,
    LikeSection,
    WalletSection,
    SettingSection,
    UserProfileCard,
    ProductCard,
  },
  setup() {
    const userData = userStore();

    const statusData = statusStore();
    // 頁籤分頁
    const productData = productStore();

    const currentTab = ref('POST');
    const changeCurrentTab = (newTab) => {
      currentTab.value = newTab;
    };

    const products = ref([]);

    const myInfo = ref({});
    const userInfo = ref({});
    const currentUserInfo = ref({});

    const route = useRoute();
    const userId = ref(route.params.id);
    const isSelf = ref(userData.user.id === route.params.id);
    const tmp = userInfo.value.user?.followers?.some((m) => m === userData.user.id) ?? false;
    const isFolowing = ref(tmp);

    watch(
      () => route.params.id,
      async (newUserId) => {
        statusData.addLoading();
        userId.value = newUserId;
        isSelf.value = userData.user.id === newUserId;

        currentTab.value = 'POST';
        currentUserInfo.value = {};
        if (isSelf.value) {
          if (!myInfo.value.user?.id) {
            const returnUser = await userData.getMyUser(userData.user.token);
            myInfo.value = { ...returnUser };
          }
          isFolowing.value = false;
          currentUserInfo.value = { ...myInfo.value };
        } else {
          if (!userInfo.value.user?.id || userInfo.value.user.id !== newUserId) {
            const returnUser = await userData.getProfileUser(newUserId, userData.user.token);
            userInfo.value = { ...returnUser };
          }
          const tmp2 = userInfo.value.user?.followers?.some((m) => m === newUserId) ?? false;
          isFolowing.value = tmp2;
          currentUserInfo.value = { ...userInfo.value };
        }
        statusData.shiftLoading();
      },
    );

    onMounted(async () => {
      // 查詢使用者資訊
      // statusData.openPageLoader();
      if (userData.user.id === userId.value) {
        const returnUser = await userData.getMyUser(userData.user.token);
        myInfo.value = { ...returnUser };
        currentUserInfo.value = { ...returnUser };
        userData.user.name = returnUser.user.name;
        userData.user.email = returnUser.user.email;
        userData.user.birthday = returnUser.user.birthday;
        userData.user.gender = returnUser.user.gender;
        userData.user.memo = returnUser.user.memo;
      } else {
        const returnUser = await userData.getProfileUser(userId.value, userData.user.token);
        userInfo.value = { ...returnUser };
        const tmp2 = userInfo.value.user?.followers?.some((m) => m === userId.value) ?? false;
        isFolowing.value = tmp2;
        currentUserInfo.value = { ...returnUser };
      }

      const productsResponse = await productData.getProducts('ticket');
      products.value = [...productsResponse];
    });

    return {
      isSelf,
      isFolowing,
      products,
      userId,
      myInfo,
      currentTab,
      changeCurrentTab,
      currentUserInfo,
    };
  },
};
</script>

<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-xl-6 col-lg-8 col-12 d-flex flex-column gap-4">
        <UserProfileCard
          :tabType="currentTab"
          :user="currentUserInfo"
          :isSelf="isSelf"
          :isFolowing="isFolowing"
          @change-tab="changeCurrentTab"
        />
        <div v-if="isSelf">
          <PostSection v-if="currentTab === 'POST'" />
          <DiarySection v-if="currentTab === 'DIARY'" />
          <FollowSection v-if="currentTab === 'FOLLOW'" />
          <LikeSection v-if="currentTab === 'LIKE'" />
          <WalletSection v-if="currentTab === 'WALLET'" />
          <SettingSection v-if="currentTab === 'SETTING'" :user="myInfo"></SettingSection>
        </div>
        <div v-else>
          <PostSection :userId="userId" v-if="currentTab === 'POST'" />
          <DiarySection v-if="currentTab === 'DIARY'" />
          <FollowSection :userId="userId" v-if="currentTab === 'FOLLOW'" />
        </div>
      </div>
      <div class="col-lg-4 col-5 position-relative">
        <ProductCard :products="products" />
      </div>
    </div>
  </div>
</template>
