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
    ProfileUser: {
      name: '',
      id: '',
      token: '',
      photo: 'https://i.imgur.com/ZWHoRPi.png',
    },
    myWallet: 0,
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
        return res.data;
      } catch (err) {
        console.dir(err);
        return err;
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
        console.log(res);
        return res.data;
      } catch (err) {
        console.dir(err);
        return err;
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
        return res;
      } catch (err) {
        console.dir(err);
        return err;
      } finally {
        statusData.shiftLoading();
      }
    },
    async getProfileUser(id) {
      try {
        statusData.addLoading();
        const res = await axios({
          method: 'GET',
          url: `https://hex-post-team-api-server.herokuapp.com/api/user/${id}`,
        });
        console.log(res);
        return res.data.data;
      } catch (err) {
        console.dir(err);
        return err;
      } finally {
        statusData.shiftLoading();
      }
    },
    async getMyUser(userToken) {
      statusData.addLoading();
      return axios({
        method: 'GET',
        url: 'https://hex-post-team-api-server.herokuapp.com/api/user',
        headers: {
          authorization: `${userToken}`,
        },
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

    async resetPassword(forgetData) {
      statusData.addLoading();
      console.log(forgetData);
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
          this.checkLogIn(this.user.token);
          return res.data.data;
        })
        .catch((err) => {
          statusData.shiftLoading();
          throw err;
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
    },
  },
});
export default userStore;
