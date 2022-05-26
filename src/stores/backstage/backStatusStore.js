import { defineStore } from 'pinia';

const backStatusStore = defineStore({
  id: 'backStatusStore',
  state: () => ({
    isLoading: false,
    nowPage: '會員管理',
    backHeaderNav: [
      { name: '會員管理', link: 'member' },
      { name: '日記作者管理', link: 'auther' },
      { name: '貼文管理', link: 'post' },
      { name: '私密日記管理', link: 'member' },
      { name: '銷售管理', link: 'member' },
      { name: '設定 ＆ 其他', link: 'member' },
    ],
  }),
  getters: {},
  actions: {},
});
export default backStatusStore;
