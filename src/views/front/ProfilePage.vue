<script>
import { ref, computed, onMounted } from 'vue';
// import { watch } from 'vue';
import { useRoute } from 'vue-router';

import PostSection from '@/components/front/PostSection.vue';
import DiarySection from '@/components/front/DiarySection.vue';
import FollowSection from '@/components/front/FollowSection.vue';
import LikeSection from '@/components/front/LikeSection.vue';
import WalletSection from '@/components/front/WalletSection.vue';
import SettingSection from '@/components/front/SettingSection.vue';

import UserProfileCard from '@/components/front/cards/UserProfileCard.vue';

import SponsorCard from '@/components/front/cards/SponsorCard.vue';
import PopularPostCard from '@/components/front/cards/PopularPostCard.vue';

import postsStore from '@/stores/postsStore';
import userStore from '@/stores/userStore';

export default {
  components: {
    PostSection,
    DiarySection,
    FollowSection,
    LikeSection,
    WalletSection,
    SettingSection,
    UserProfileCard,
    SponsorCard,
    PopularPostCard,
  },
  setup() {
    console.log(123);
    const postsData = postsStore();
    const userData = userStore();

    // 頁籤分頁
    const tabType = ref('POST');

    const route = useRoute();
    const userId = route.params.id;

    const user = ref({});
    // post list
    const postsList = ref([]);
    const isSelf = computed(() => userData.user.id === userId);

    const handleChangeTab = (newTab) => {
      tabType.value = newTab;
    };
    async function init() {
      if (userData.user.id === userId) {
        const pageUser = await userData.getMyUser(userData.user.token);
        user.value = { ...pageUser };
        console.log(pageUser);
      } else {
        const pageUser = await userData.getProfileUser(userId);
        user.value = { ...pageUser };
        console.log(pageUser);
      }
    }
    const resetPasswordData = ref({
      password: '',
      confirmPassword: '',
    });
    onMounted(async () => {
      await init();
    });

    // watch(tabType, (newValue) => {
    //   switch (newValue) {
    //     case 'POST':
    //       // 取得 post
    //       console.log(newValue);
    //       break;
    //     case 'DIARY':
    //       // 取得 私密日記
    //       break;
    //     default:
    //       console.log(newValue);
    //   }
    // });
    return {
      isSelf,
      user,
      userId,
      postsData,
      tabType,
      postsList,
      resetPasswordData,
      handleChangeTab,
    };
  },
};
</script>

<template>
  <div class="container d-flex">
    <div class="content">
      <UserProfileCard
        :tabType="tabType"
        :user="user"
        :isSelf="isSelf"
        @change-tab="handleChangeTab"
      />
      <div v-if="isSelf">
        <PostSection v-if="tabType === 'POST'" />
        <DiarySection v-if="tabType === 'DIARY'" />
        <FollowSection v-if="tabType === 'FOLLOW'" />
        <LikeSection v-if="tabType === 'LIKE'" />
        <WalletSection v-if="tabType === 'WALLET'" />
        <SettingSection
          v-if="tabType === 'SETTING'"
          :user="user"
        ></SettingSection>
      </div>
      <div v-else>
        <PostSection :userId="userId" v-if="tabType === 'POST'" />
        <DiarySection v-if="tabType === 'DIARY'" />
        <FollowSection :userId="userId" v-if="tabType === 'FOLLOW'" />
      </div>
    </div>
    <div class="side fix">
      <SponsorCard />
      <PopularPostCard />
    </div>
  </div>
</template>
