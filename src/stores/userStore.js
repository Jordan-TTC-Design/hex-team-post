import { defineStore } from 'pinia';
import axios from 'axios';

const userStore = defineStore({
  id: 'userStore',
  state: () => ({
    user: {
      name: '',
      token: '',
      photo: '',
    },
  }),
  getters: {},
  actions: {
    async signUp(data) {
      return axios
        .post('https://hex-post-team-api-server.herokuapp.com/api/user', data)
        .then((res) => {
          console.log(res.data);
          return res.data;
        })
        .catch((err) => {
          console.log(err);
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
    logOut() {
      localStorage.removeItem('sd-user');
      this.resetUser();
    },
    async checkLogIn(data) {
      return axios({
        method: 'GET',
        url: 'https://hex-post-team-api-server.herokuapp.com/api/user/check',
        headers: {
          authorization: `${data}`,
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
    async getProfileUser(id = '628e4bbfad29e4c054c9f380') {
      return axios({
        method: 'GET',
        url: `https://hex-post-team-api-server.herokuapp.com/api/user/${id}`,
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
    resetUser() {
      this.user.name = '';
      this.user.token = '';
      this.user.photo = '';
    },
  },
});
export default userStore;
