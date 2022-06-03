import { defineStore } from 'pinia';
import axios from 'axios';

const followData = defineStore({
  id: 'followData',
  state: () => ({}),
  getters: {},
  actions: {
    async addFollow(data, userToken) {
      return axios({
        method: 'GET',
        url: 'https://hex-post-team-api-server.herokuapp.com/api/follow/',
        data,
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
  },
});
export default followData;
