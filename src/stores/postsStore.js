import { defineStore } from 'pinia';

const postsStore = defineStore({
  id: 'postsStore',
  state: () => ({
    targetPost: {
      title: '',
      img: [],
      tags: [],
    },
  }),
  getters: {},
  actions: {},
});
export default postsStore;
