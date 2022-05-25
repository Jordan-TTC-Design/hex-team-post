import { defineStore } from 'pinia';

const statusStore = defineStore({
  id: 'statusStore',
  state: () => ({
    isLoading: false,
    isLogin: false,
    newPostModel: false,
    signUpModel: false,
    logInModel: false,
  }),
  getters: {},
  actions: {},
});
export default statusStore;
