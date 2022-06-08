<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import PersonalCard from '@/components/front/cards/PersonalCard.vue';
import PersonalEditCard from '@/components/front/cards/PersonalEditCard.vue';
import ChangePasswordCard from '@/components/front/ChangePasswordCard.vue';

import userStore from '@/stores/userStore';
import statusStore from '@/stores/statusStore';

const tabs = [
  {
    text: '個人資料',
    type: 'PERSONAL',
  },
  {
    text: '變更密碼',
    type: 'CHANGE_PASSWORD',
  },
];

export default {
  components: {
    PersonalCard,
    PersonalEditCard,
    ChangePasswordCard,
  },
  props: {
    user: Object,
  },
  setup(props) {
    const userData = userStore();
    const statusData = statusStore();
    const currentTab = ref(tabs[0].type);
    const router = useRouter();

    const isShowPersonalEditCard = ref(false);
    const showEditPersonal = () => {
      isShowPersonalEditCard.value = true;
    };
    const hideEditPersonal = () => {
      isShowPersonalEditCard.value = false;
    };
    const updatePersonal = async (updateUser) => {
      try {
        userData.user.name = updateUser.name;
        userData.user.gender = updateUser.gender;
        userData.user.birthday = updateUser.birthday;
        userData.user.memo = updateUser.memo;
        await userData.updateUser(userData.user.token);
        isShowPersonalEditCard.value = false;
        statusData.openRemindModel('個人資料更新成功', '');
        router.go(0);
      } catch (e) {
        console.log(e);
        statusData.openRemindModel('個人資料更新失敗', e.response.data.message);
      }
    };

    const changePassword = async (password) => {
      // call api
      console.log(password);
      try {
        await userData.resetPassword({
          password: password.password,
          confirmPassword: password.confirmPassword,
        });
        statusData.openRemindModel('變更密碼成功', '下次登入請輸入新密碼');
      } catch (e) {
        statusData.openRemindModel('變更密碼失敗', e.response.data.message);
      }
    };

    return {
      tabs,
      props,
      currentTab,
      isShowPersonalEditCard,
      showEditPersonal,
      hideEditPersonal,
      updatePersonal,
      changePassword,
    };
  },
};
</script>

<template>
  <div class="d-flex gap-4">
    <div class="subSide me-0">
      <div
        v-for="t in tabs"
        :key="t.type"
        class="subSide__item"
        :class="[currentTab === t.type ? 'active' : '']"
        @click="currentTab = t.type"
      >
        {{ t.text }}
      </div>
    </div>
    <div class="subContent" v-if="currentTab === tabs[0].type">
      <PersonalCard
        class="mb-3"
        v-if="!isShowPersonalEditCard"
        @show-edit="showEditPersonal"
        :user="props.user"
      />
      <PersonalEditCard
        v-if="isShowPersonalEditCard"
        @save="updatePersonal"
        @hide-edit="hideEditPersonal"
        :user="props.user"
      />
    </div>
    <div class="subContent" v-else-if="currentTab === tabs[1].type">
      <ChangePasswordCard @change-password="changePassword" />
    </div>
    <div class="subContent" v-else-if="currentTab === tabs[2].type">Oops !</div>
  </div>
</template>

<style lang="scss" scoped>
.subSide {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex-shrink: 1;
  &__item {
    padding: 0.5rem 0.75rem;
    text-align: center;
    font-size: 1rem;
    color: var(--bs-dark);
    background: var(--bs-white);
    border-radius: 0.75rem;
    cursor: pointer;
    &:hover {
      color: var(--bs-primary);
    }
    @media (max-width: 767.98px) {
      font-size: 0.875rem;
    }
    &.active {
      background: var(--bs-secondary);
      color: var(--bs-primary);
    }
  }
}
</style>
