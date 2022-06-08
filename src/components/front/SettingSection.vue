<script>
import { ref } from 'vue';
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
        const res = await userData.updateUser();
        console.log(res);
        isShowPersonalEditCard.value = false;
        statusData.openRemindModel('個人資料更新成功', '');
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
  <div class="d-flex">
    <div class="subSide fix">
      <div
        v-for="t in tabs"
        :key="t.type"
        class="side-menu-item mb-3"
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
.side-menu-item {
  padding: 10px 0;
  text-align: center;
  font-size: 16px;
  columns: #1d1d1d;
  background: #fff;
  border-radius: 12px;
  cursor: pointer;
  &.active {
    background: var(--bs-secondary);
    color: var(--bs-primary);
  }
}
</style>
