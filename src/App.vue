<script>
import { onMounted } from 'vue';
import userStore from '@/stores/userStore';

export default {
  setup() {
    // 檢查 Local Storage 是否有使用者資料
    // 有 token：檢查 token 是否有效
    // 有效：查詢登入者資訊
    // 無效：非登入狀態
    // const x = AuthService();
    // console.log(x);

    const userData = userStore();
    onMounted(async () => {
      const checkLocalResult = await userData.getLocalToken();
      if (!checkLocalResult) {
        return;
      }
      const checkLogInResult = await userData.checkLogIn(userData.user.token);
      console.log(checkLogInResult);
      if (!checkLogInResult.data.status) {
        return;
      }
      if (userData.user.id) {
        return;
      }
      const userInfo = await userData.getMyUser(userData.user.token);
      console.log(userInfo);
      // userData.user = { ...userInfo.user, name: 'aaaa' };
      userData.user.id = userInfo.user.id;
      console.log(userData.user);
    });
    return {};
  },
};
</script>

<template>
  <RouterView />
</template>

<style lang="scss">
@import './assets/style/all';
</style>
