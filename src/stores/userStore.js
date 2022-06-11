import { defineStore } from 'pinia';
import axios from 'axios';
import statusStore from '@/stores/statusStore';

const statusData = statusStore();

const userStore = defineStore({
  id: 'userStore',
  state: () => ({
    user: {
      name: '',
      id: '',
      token: '',
      photo: 'https://i.imgur.com/ZWHoRPi.png',
    },
    myProfile: {
      name: '',
      id: '',
      token: '',
      photo: 'https://i.imgur.com/ZWHoRPi.png',
    },
    userProfile: {
      name: '',
      id: '',
      token: '',
      photo: 'https://i.imgur.com/ZWHoRPi.png',
    },
    myWallet: 0,
    defaultPhoto: 'https://i.imgur.com/ZWHoRPi.png',
  }),
  getters: {},
  actions: {
    async getLocalToken() {
      statusData.addLoading();
      let checkResult = false;
      const localUser = await JSON.parse(localStorage.getItem('sd-user'));
      if (localUser && localUser.token.trim().length > 0) {
        this.user = localUser;
        checkResult = true;
        this.getMyWallet(this.user.token);
      } else {
        localStorage.setItem('sd-user', JSON.stringify(this.user));
      }
      statusData.shiftLoading();
      return checkResult;
    },
    updatedLocalUser() {
      const tempUser = {
        name: this.user.name,
        id: this.user.id,
        token: this.user.token,
        photo: this.user.photo,
      };
      localStorage.setItem('sd-user', JSON.stringify(tempUser));
    },
    async signUp(data) {
      try {
        statusData.addLoading();
        const res = await axios({
          method: 'POST',
          url: 'https://hex-post-team-api-server.herokuapp.com/api/user',
          data,
        });
        console.log(res);
        this.user.name = res.data.user.name;
        this.user.token = res.data.user.token;
        this.user.id = res.data.user._id;
        this.user.photo = res.data.user.photo;
        this.getMyWallet(this.user.token);
        this.updatedLocalUser();
        return res.data;
      } catch (err) {
        console.dir(err);
        return err.response.data;
      } finally {
        statusData.shiftLoading();
      }
    },
    async logIn(data) {
      try {
        statusData.addLoading();
        const res = await axios({
          method: 'POST',
          url: 'https://hex-post-team-api-server.herokuapp.com/api/user/sign-in',
          data,
        });
        this.user.name = res.data.user.name;
        this.user.token = res.data.user.token;
        this.user.id = res.data.user._id;
        this.user.photo = res.data.user.photo;
        this.getMyWallet(this.user.token);
        return res.data;
      } catch (err) {
        console.dir(err);
        return err.response.data;
      } finally {
        statusData.shiftLoading();
      }
    },
    async checkLogIn(userToken) {
      try {
        statusData.addLoading();
        const res = await axios({
          method: 'GET',
          url: 'https://hex-post-team-api-server.herokuapp.com/api/user/check',
          headers: {
            authorization: `${userToken}`,
          },
        });
        return res.data.status === 'success' || false;
      } catch (err) {
        return err.response.data.status === 'success' || false;
      } finally {
        statusData.shiftLoading();
      }
    },
    async getUserProfile(id) {
      try {
        statusData.addLoading();
        const res = await axios({
          method: 'GET',
          url: `https://hex-post-team-api-server.herokuapp.com/api/user/${id}`,
        });
        const {
          follows,
          likes,
          postCounts,
          privateposts,
          user,
        } = res.data.data;
        statusData.shiftLoading();
        user.photo = user.photo || this.defaultPhoto;
        this.userProfile = {
          ...user,
          follows,
          likes,
          postCounts,
          privateposts,
        };
        console.log(user);
        return res.data.data;
      } catch (err) {
        console.dir(err);
        return err;
      } finally {
        statusData.shiftLoading();
      }
    },
    async getMyProfile() {
      statusData.addLoading();
      return axios({
        method: 'GET',
        url: 'https://hex-post-team-api-server.herokuapp.com/api/user',
        headers: {
          authorization: `${this.user.token}`,
        },
      })
        .then((res) => {
          const {
            follows,
            likes,
            postCounts,
            privateposts,
            user,
          } = res.data.data;
          statusData.shiftLoading();
          user.photo = user.photo || this.myProfile.photo;
          this.myProfile = {
            ...user,
            follows,
            likes,
            postCounts,
            privateposts,
          };
          return res.data.data;
        })
        .catch((err) => {
          statusData.shiftLoading();
          return err;
        });
    },
    async getMyWallet(userToken) {
      statusData.addLoading();
      try {
        const res = await axios({
          method: 'GET',
          url: 'https://hex-post-team-api-server.herokuapp.com/api/wallet/',
          headers: {
            authorization: `${userToken}`,
          },
        });
        console.log(res.data);
        if (res.data.status === 'success') {
          this.myWallet = res.data.data;
        }
        statusData.shiftLoading();
        return res.data;
      } catch (err) {
        console.dir(err);
        statusData.shiftLoading();
        return err;
      }
    },
    async forgotPassword(forgetData) {
      statusData.addLoading();
      console.log(forgetData);
      return axios({
        method: 'POST',
        url: 'https://hex-post-team-api-server.herokuapp.com/api/user/forgot_password',
        data: forgetData,
      })
        .then((res) => {
          console.log(res);
          statusData.shiftLoading();
          return res.data.data;
        })
        .catch((err) => {
          console.dir(err);
          statusData.shiftLoading();
          return err;
        });
    },
    async updateUser(userToken) {
      statusData.addLoading();
      return axios({
        method: 'PATCH',
        url: 'https://hex-post-team-api-server.herokuapp.com/api/user/',
        data: this.user,
        headers: {
          authorization: `${userToken}`,
        },
      })
        .then((res) => {
          console.log(res);
          const tempToken = this.user.token;
          this.user = res.data.data;
          this.user.token = tempToken;
          statusData.shiftLoading();
          this.updatedLocalUser();
          this.checkLogIn(this.user.token);
          return res.data.data;
        })
        .catch((err) => {
          console.dir(err);
          statusData.shiftLoading();
          return err;
        });
    },
    async editUser(user) {
      statusData.addLoading();
      console.log(user);
      const {
        name,
        birthday,
        gender,
        memo,
      } = user;
      return axios({
        method: 'PATCH',
        url: 'https://hex-post-team-api-server.herokuapp.com/api/user/',
        data: {
          name,
          birthday,
          gender,
          memo,
        },
        headers: {
          authorization: `${this.user.token}`,
        },
      })
        .then((res) => {
          this.user = {
            ...this.user,
            ...res.data.data,
          };
          this.myProfile = {
            ...this.myProfile,
            ...res.data.data,
          };
          statusData.shiftLoading();
          this.updatedLocalUser();
          // this.checkLogIn(this.user.token);
          statusData.openRemindModel('變更個人資料成功', '');

          return res.data.data;
        })
        .catch((err) => {
          statusData.shiftLoading();
          statusData.openRemindModel('變更個人資料失敗', err.response.data.message);
          return err.response.data;
        });
    },
    async resetPassword(forgetData) {
      statusData.addLoading();
      return axios({
        method: 'POST',
        url: 'https://hex-post-team-api-server.herokuapp.com/api/user/reset_password',
        data: forgetData,
        headers: {
          authorization: `${this.user.token}`,
        },
      })
        .then((res) => {
          statusData.shiftLoading();
          statusData.openRemindModel('變更密碼成功', '下次登入請輸入新密碼');
          // this.checkLogIn(this.user.token);
          return res.data;
        })
        .catch((err) => {
          statusData.shiftLoading();
          statusData.openRemindModel('變更密碼失敗', err.response.data.message);
          return err.response.data;
        });
    },
    logOut() {
      statusData.openAskModel('登出', '請問您確定要登出？', () => {
        localStorage.removeItem('sd-user');
        this.resetUser();
      });
    },
    resetUser() {
      this.user.name = '';
      this.user.id = '';
      this.user.token = '';
      this.user.photo = '';
      this.myProfile = {};
    },
  },
});
export default userStore;
