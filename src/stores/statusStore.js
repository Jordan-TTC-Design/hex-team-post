import { defineStore } from 'pinia';

const statusStore = defineStore({
  id: 'statusStore',
  state: () => ({
    isLoading: false,
    newPostModel: false,
  }),
  getters: {},
  actions: {},
});
export default statusStore;
