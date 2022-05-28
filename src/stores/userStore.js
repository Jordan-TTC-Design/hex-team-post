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
          console.log(err.response.data);
          return err.response.data;
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
          console.log(err.response.data);
          return err.response.data;
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
          return err.response.data;
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
