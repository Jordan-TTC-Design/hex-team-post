<script>
import { ref } from 'vue';
import { useRoute } from 'vue-router';

import PostFilter from '@/components/front/PostFilter.vue';
import UserProfileCard from '@/components/front/UserProfileCard.vue';
import postsStore from '@/stores/postsStore';
import PostCard from '@/components/front/PostCard.vue';
import SponsorCard from '@/components/front/SponsorCard.vue';
import PopularPostCard from '@/components/front/PopularPostCard.vue';
import PersonalCard from '@/components/front/PersonalCard.vue';
import PersonalEditCard from '@/components/front/PersonalEditCard.vue';
import DiamondPurchaseRecordCard from '@/components/front/DiamondPurchaseRecordCard.vue';
import FormRadioButton from '@/components/helper/FormRadioButton.vue';

export default {
  components: {
    PostFilter,
    UserProfileCard,
    PostCard,
    SponsorCard,
    PopularPostCard,
    PersonalCard,
    PersonalEditCard,
    DiamondPurchaseRecordCard,
    FormRadioButton,
  },
  setup() {
    const postsData = postsStore();
    const postSort = ref('asc');
    const postQuery = ref('');

    const tabType = ref('POST');
    const isShowPersonalEditCard = ref(false);

    const route = useRoute();
    const { id } = route.query;

    console.log('id', id);
    const userId = ref(id);
    console.log('userid', userId.value);
    console.log('type', tabType.value);

    postsData.getPosts();
    function sortPostsData() {
      postsData.getPosts(postSort.value, postQuery.value);
    }

    const handleChangeTab = (newTab) => {
      tabType.value = newTab;
    };

    const ShowEditPersonal = () => {
      isShowPersonalEditCard.value = true;
    };
    const HideEditPersonal = () => {
      isShowPersonalEditCard.value = false;
    };

    return {
      userId,
      postSort,
      postQuery,
      postsData,
      tabType,
      isShowPersonalEditCard,
      sortPostsData,
      handleChangeTab,
      ShowEditPersonal,
      HideEditPersonal,
    };
  },
};
</script>

<template>
  <div class="container d-flex">
    <div class="content">
      <UserProfileCard
        :tabType="tabType"
        @change-tab="handleChangeTab"
        :userId="userId"
      />
      <template v-if="!userId">
        <template v-if="tabType === 'POST'">
          <PostFilter class="mb-3" />
          <PostCard />
          <PostCard />
        </template>
        <template v-if="tabType === 'DIARY'">
          <div class="d-flex mb-3">
            <FormRadioButton class="me-3" name="type">全部</FormRadioButton>
            <FormRadioButton class="me-3" name="type">永恆日記</FormRadioButton>
            <PostFilter class="flex-grow-1" />
          </div>
          <PostCard />
          <PostCard />
        </template>
        <template v-if="tabType === 'FOLLOW'">
          <div class="card mb-3">
            <div class="card-body">
              <div class="d-flex align-items-center mb-3 py-2">
                <div class="user-picture"></div>
                <div class="user-info">
                  <span class="user-info-title">用戶名稱</span>
                </div>
              </div>
              <div class="d-flex align-items-center mb-3 py-2">
                <div class="user-picture"></div>
                <div class="user-info">
                  <span class="user-info-title">用戶名稱</span>
                </div>
              </div>
              <div class="d-flex align-items-center mb-3 py-2">
                <div class="user-picture"></div>
                <div class="user-info">
                  <span class="user-info-title">用戶名稱</span>
                </div>
              </div>
              <div class="d-flex align-items-center mb-3 py-2">
                <div class="user-picture"></div>
                <div class="user-info">
                  <span class="user-info-title">用戶名稱</span>
                </div>
              </div>
              <div class="d-flex align-items-center mb-3 py-2">
                <div class="user-picture"></div>
                <div class="user-info">
                  <span class="user-info-title">用戶名稱</span>
                </div>
              </div>
              <div class="d-flex align-items-center mb-3 py-2">
                <div class="user-picture"></div>
                <div class="user-info">
                  <span class="user-info-title">用戶名稱</span>
                </div>
              </div>
            </div>
          </div>
        </template>
        <template v-if="tabType === 'LIKE'">
          <PostFilter class="mb-3" />
          <PostCard />
          <PostCard />
        </template>
        <template v-if="tabType === 'WALLET'">
          <div class="d-flex">
            <div class="subSide fix">
              <div class="side-menu-item mb-3">日記購買紀錄</div>
              <div class="side-menu-item mb-3">日記銷售紀錄</div>
              <div class="side-menu-item mb-3 active">鑽石購買紀錄</div>
            </div>
            <div class="subContent">
              <DiamondPurchaseRecordCard />
              <DiamondPurchaseRecordCard />
              <DiamondPurchaseRecordCard />
              <DiamondPurchaseRecordCard />
            </div>
          </div>
        </template>
        <template v-if="tabType === 'SETTING'">
          <div class="d-flex">
            <div class="subSide fix">
              <div class="side-menu-item mb-3 active">個人資料</div>
              <div class="side-menu-item mb-3">變更密碼</div>
              <div class="side-menu-item mb-3">帳戶資料</div>
            </div>
            <div class="subContent">
              <PersonalCard class="mb-3" @show-edit="ShowEditPersonal" />
              <PersonalEditCard
                v-if="isShowPersonalEditCard"
                @hide-edit="HideEditPersonal"
              />
            </div>
          </div>
        </template>
      </template>
      <template v-else>
        <template v-if="tabType === 'POST'">
          <PostFilter class="mb-3" />
          <PostCard />
          <PostCard />
        </template>
        <template v-if="tabType === 'DIARY'">
          <div class="d-flex mb-3">
            <FormRadioButton class="me-3" name="type">全部</FormRadioButton>
            <FormRadioButton class="me-3" name="type">永恆日記</FormRadioButton>
            <PostFilter class="flex-grow-1" />
          </div>
          <PostCard />
          <PostCard />
        </template>
        <template v-if="tabType === 'FOLLOW'">
          <div class="card mb-3">
            <div class="card-body">
              <div class="d-flex align-items-center mb-3 py-2">
                <div class="user-picture"></div>
                <div class="user-info">
                  <span class="user-info-title">用戶名稱</span>
                </div>
              </div>
              <div class="d-flex align-items-center mb-3 py-2">
                <div class="user-picture"></div>
                <div class="user-info">
                  <span class="user-info-title">用戶名稱</span>
                </div>
              </div>
              <div class="d-flex align-items-center mb-3 py-2">
                <div class="user-picture"></div>
                <div class="user-info">
                  <span class="user-info-title">用戶名稱</span>
                </div>
              </div>
              <div class="d-flex align-items-center mb-3 py-2">
                <div class="user-picture"></div>
                <div class="user-info">
                  <span class="user-info-title">用戶名稱</span>
                </div>
              </div>
              <div class="d-flex align-items-center mb-3 py-2">
                <div class="user-picture"></div>
                <div class="user-info">
                  <span class="user-info-title">用戶名稱</span>
                </div>
              </div>
              <div class="d-flex align-items-center mb-3 py-2">
                <div class="user-picture"></div>
                <div class="user-info">
                  <span class="user-info-title">用戶名稱</span>
                </div>
              </div>
            </div>
          </div>
        </template>
      </template>
    </div>
    <div class="side fix">
      <SponsorCard />
      <PopularPostCard />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.side-menu-item {
  padding: 10px 0;
  text-align: center;
  font-size: 16px;
  columns: #1d1d1d;
  background: #fff;
  border-radius: 12px;

  &.active {
    background: var(--bs-secondary);
    color: var(--bs-primary);
  }
}
</style>
