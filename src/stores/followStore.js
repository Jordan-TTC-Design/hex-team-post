import { defineStore } from 'pinia';
import axios from 'axios';
import statusStore from '@/stores/statusStore';

const statusData = statusStore();

const followData = defineStore({
  id: 'followData',
  state: () => ({
    myFollowUser: [],
    myFollower: [],
  }),
  getters: {},
  actions: {
    async getMyFollow(userToken) {
      statusData.addLoading();
      return axios({
        method: 'GET',
        url: 'https://hex-post-team-api-server.herokuapp.com/api/follow',
        headers: {
          authorization: `${userToken}`,
        },
      })
        .then((res) => {
          console.log(res.data);
          statusData.shiftLoading();
          this.myFollowUser = res.data.data[0].following;
          this.myFollower = res.data.data[0].followers;
          return res.data;
        })
        .catch((err) => {
          console.log(err);
          return err;
        });
    },
    async getUserFollow(userId) {
      statusData.addLoading();
      try {
        const res = await axios({
          method: 'GET',
          url: `https://hex-post-team-api-server.herokuapp.com/api/follow/${userId}`,
          headers: {
            // authorization: `${userToken}`,
          },
        });
        return res.data.data[0].following;
      } catch (error) {
        console.log(error);
        throw error;
      } finally {
        statusData.shiftLoading();
      }
    },
    async addFollow(data, userToken) {
      statusData.addLoading();
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
          statusData.shiftLoading();
          this.getMyFollow(userToken);
          return res;
        })
        .catch((err) => {
          console.log(err);
          return err;
        });
    },
    async deleteFollow(followuserId, userToken) {
      statusData.addLoading();
      return axios({
        method: 'DELETE',
        url: `https://hex-post-team-api-server.herokuapp.com/api/follow/${followuserId}`,
        headers: {
          authorization: `${userToken}`,
        },
      })
        .then((res) => {
          console.log(res);
          statusData.shiftLoading();
          this.getMyFollow(userToken);
          return res;
        })
        .catch((err) => {
          console.log(err);
          statusData.shiftLoading();
          return err;
        });
    },
  },
});
export default followData;
