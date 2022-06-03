import { defineStore } from 'pinia';
import axios from 'axios';

const userStore = defineStore({
  id: 'userStore',
  state: () => ({
    user: {
      name: '',
      id: '',
      token: '',
      photo: '',
    },
  }),
  getters: {},
  actions: {
    async getLocalToken() {
      let checkResult = false;
      const localUser = await JSON.parse(localStorage.getItem('sd-user'));
      if (localUser && localUser.token.trim().length > 0) {
        this.user = localUser;
        checkResult = true;
      } else {
        localStorage.setItem('sd-user', JSON.stringify(this.user));
      }
      return checkResult;
    },
    async signUp(data) {
      return axios
        .post('https://hex-post-team-api-server.herokuapp.com/api/user', data)
        .then((res) => {
          console.log(res.data);
          return res.data;
        })
        .catch((err) => {
          console.dir(err);
          return err;
        });
    },
    async logIn(data) {
      return axios
        .post('https://hex-post-team-api-server.herokuapp.com/api/user/sign-in', data)
        .then((res) => {
          console.log(res.data);
          return res.data;
        })
        .catch((err) => {
          console.log(err);
          return err;
        });
    },

    async checkLogIn(userToken) {
      return axios({
        method: 'GET',
        url: 'https://hex-post-team-api-server.herokuapp.com/api/user/check',
        headers: {
          authorization: `${userToken}`,
        },
      })
        .then((res) => {
          console.log(res);
          return res;
        })
        .catch((err) => {
          console.log(err);
          return err;
        });
    },
    async getProfileUser(id) {
      return axios({
        method: 'GET',
        url: `https://hex-post-team-api-server.herokuapp.com/api/user/${id}`,
      })
        .then((res) => {
          console.log(res);
          return res.data.data;
        })
        .catch((err) => {
          console.log(err);
          return err;
        });
    },
    async getMyUser(userToken) {
      return axios({
        method: 'GET',
        url: 'https://hex-post-team-api-server.herokuapp.com/api/user',
        headers: {
          authorization: `${userToken}`,
        },
      })
        .then((res) => {
          console.log(res);
          return res.data.data;
        })
        .catch((err) => {
          console.log(err);
          return err;
        });
    },
    async resetPassword(forgetData) {
      console.log(forgetData);
      return axios({
        method: 'POST',
        url: 'https://hex-post-team-api-server.herokuapp.com/api/user/forgot_password',
        data: forgetData,
      })
        .then((res) => {
          console.log(res);
          return res.data.data;
        })
        .catch((err) => {
          console.dir(err);
          return err;
        });
    },
    logOut() {
      localStorage.removeItem('sd-user');
      this.resetUser();
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
