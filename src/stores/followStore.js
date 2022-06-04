import { defineStore } from 'pinia';
import axios from 'axios';

const followData = defineStore({
  id: 'followData',
  state: () => ({
    myFollowUser: [],
    myFollower: [],
  }),
  getters: {},
  actions: {
    async getMyFollow(userToken) {
      return axios({
        method: 'GET',
        url: 'https://hex-post-team-api-server.herokuapp.com/api/follow',
        headers: {
          authorization: `${userToken}`,
        },
      })
        .then((res) => {
          console.log(res.data);
          this.myFollowUser = res.data.data[0].following;
          this.myFollower = res.data.data[0].followers;
          return res.data;
        })
        .catch((err) => {
          console.log(err);
          return err;
        });
    },
    async addFollow(data, userToken) {
      const targetFollow = {
        followuser: data,
      };
      return axios({
        method: 'POST',
        url: 'https://hex-post-team-api-server.herokuapp.com/api/follow/',
        data: targetFollow,
        headers: {
          authorization: `${userToken}`,
        },
      })
        .then((res) => {
          console.log(res);
          this.getMyFollow(userToken);
          return res;
        })
        .catch((err) => {
          console.log(err);
          return err;
        });
    },
    async deleteFollow(followuserId, userToken) {
      return axios({
        method: 'DELETE',
        url: `https://hex-post-team-api-server.herokuapp.com/api/follow/${followuserId}`,
        headers: {
          authorization: `${userToken}`,
        },
      })
        .then((res) => {
          console.log(res);
          this.getMyFollow(userToken);
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
