<script>
import { reactive, ref } from 'vue';
// import { useRouter } from 'vue-router';

import PersonalCard from '@/components/front/cards/PersonalCard.vue';
import PersonalEditCard from '@/components/front/cards/PersonalEditCard.vue';
import ChangePasswordCard from '@/components/front/ChangePasswordCard.vue';

import userStore from '@/stores/userStore';
// import statusStore from '@/stores/statusStore';

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
  setup() {
    // const router = useRouter();
    const userData = userStore();
    // const statusData = statusStore();

    const currentTab = ref(tabs[0].type);

    const isShowPersonalEditCard = ref(false);
    const showEditPersonal = () => {
      isShowPersonalEditCard.value = true;
    };
    const hideEditPersonal = () => {
      isShowPersonalEditCard.value = false;
    };

    const user = reactive({});

    const changePassword = async (password) => {
      await userData.resetPassword({
        password: password.password,
        confirmPassword: password.confirmPassword,
      });
    };

    return {
      tabs,
      currentTab,
      isShowPersonalEditCard,
      showEditPersonal,
      hideEditPersonal,
      user,
      // updatePersonal,
      changePassword,
    };
  },
};
</script>

<template>
  <div class="d-flex gap-4">
    <div class="subSide me-0 flex-shrink-0">
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
      />
      <PersonalEditCard
        v-if="isShowPersonalEditCard"
        @hide-edit="hideEditPersonal"
      />
    </div>
    <div class="subContent" v-else-if="currentTab === tabs[1].type">
      <ChangePasswordCard @change-password="changePassword" />
    </div>
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
