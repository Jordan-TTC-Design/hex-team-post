<script>
import { ref } from 'vue';
import PersonalCard from '@/components/front/cards/PersonalCard.vue';
import PersonalEditCard from '@/components/front/cards/PersonalEditCard.vue';
import ChangePasswordCard from '@/components/front/ChangePasswordCard.vue';

import userStore from '@/stores/userStore';

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
    const currentTab = ref(tabs[0].type);

    const isShowPersonalEditCard = ref(false);
    const ShowEditPersonal = () => {
      isShowPersonalEditCard.value = true;
    };
    const HideEditPersonal = () => {
      isShowPersonalEditCard.value = false;
    };

    const changePassword = async (password) => {
      // call api
      console.log(password);
      try {
        const res = await userData.resetPassword({
          password: password.password,
          confirmPassword: password.confirmPassword,
        });
        console.log(res);
      } catch (e) {
        console.dir(e.response.data.message);
      }
    };

    return {
      tabs,
      props,
      currentTab,
      isShowPersonalEditCard,
      ShowEditPersonal,
      HideEditPersonal,
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
        @show-edit="ShowEditPersonal"
        :user="props.user"
      />
      <PersonalEditCard
        v-if="isShowPersonalEditCard"
        @hide-edit="HideEditPersonal"
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
