import { defineStore } from 'pinia';

const statusStore = defineStore({
  id: 'statusStore',
  state: () => ({
    isLoading: false,
    newPostModel: false,
    signUpModel: false,
    logInModel: false,
    diamondModel: false,
    askModel: {
      open: false,
      title: '提醒您',
      text: '請問你要登出嗎？',
      action: null,
    },
    remindModel: {
      open: false,
      title: '提醒您',
      text: '您尚未登入，無法購買！',
    },
    popInfoModel: {
      open: true,
      title: '',
    },
  }),
  getters: {},
  actions: {
    openaskModel(title, text, action) {
      this.askModel.open = true;
      this.askModel.title = title;
      this.askModel.text = text;
      this.askModel.action = action;
      // 用法：需要的地方加上
      // statusData.openPopInfoBox(
      //           '刪除全部',
      //           `請問你要刪除購物車中全部商品？`,
      //           function () {
      //             cartData.deleteCartAll();
      //           }
      //         )
    },
    closeaskModel() {
      this.askModel.open = false;
      this.askModel.title = '';
      this.askModel.text = '';
      this.askModel.action = null;
    },
  },
});
export default statusStore;
