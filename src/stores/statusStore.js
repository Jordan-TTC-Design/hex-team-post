import { defineStore } from 'pinia';

const statusStore = defineStore({
  id: 'statusStore',
  state: () => ({
    isLoading: [],
    pageLoading: false,
    signUpModel: false,
    logInModel: false,
    diamondModel: false,
    forgetPasswordsModel: false,
    imgCropperModel: {
      open: false,
      url: 'https://i.imgur.com/ZWHoRPi.png',
      file: null,
      name: '',
    },
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
    emailModel: false,
  }),
  getters: {},
  actions: {
    openAskModel(title, text, action) {
      this.askModel.open = true;
      this.askModel.title = title;
      this.askModel.text = text;
      this.askModel.action = action;
    },
    openPopInfoModel(title) {
      this.popInfoModel.open = true;
      this.popInfoModel.title = title;
    },
    openRemindModel(title, text) {
      this.remindModel.open = true;
      this.remindModel.title = title;
      this.remindModel.text = text;
    },
    closePopInfoModel() {
      this.popInfoModel.open = false;
      this.popInfoModel.title = '';
    },
    closeRemindModel() {
      this.remindModel.open = false;
      this.remindModel.title = '';
    },
    closeAskModel() {
      this.askModel.open = false;
      this.askModel.title = '';
      this.askModel.text = '';
      this.askModel.action = null;
    },
    openPageLoader() {
      this.pageLoading = true;
      setTimeout(() => {
        this.pageLoading = false;
        console.log(this.pageLoading);
      }, 2000);
      console.log(this.pageLoading);
    },
    addLoading() {
      this.isLoading.push('loading');
    },
    shiftLoading() {
      this.isLoading.shift();
    },
    openUserImageCropper() {
      this.imgCropperModel.open = true;
      // this.imgCropperModel.url = this.;
    },
  },
});
export default statusStore;
