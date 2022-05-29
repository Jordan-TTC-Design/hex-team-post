import { defineStore } from 'pinia';

const statusStore = defineStore({
  id: 'statusStore',
  state: () => ({
    isLoading: false,
    newPostModel: false,
    signUpModel: false,
    logInModel: false,
    diamondModel: false,
  }),
  getters: {},
  actions: {},
});
export default statusStore;
