import { defineStore } from 'pinia';
import axios from 'axios';
import statusStore from '@/stores/statusStore';

const statusData = statusStore();

const followData = defineStore({
  id: 'followData',
  state: () => ({
    myFollowUser: [],
    myFollower: [],
    mySubscribed: [],
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
          console.dir(err);
          statusData.shiftLoading();
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
    async getMySubscribed(userToken) {
      statusData.addLoading();
      return axios({
        method: 'GET',
        url: 'https://hex-post-team-api-server.herokuapp.com/api/user/subscribed',
        headers: {
          authorization: `${userToken}`,
        },
      })
        .then((res) => {
          console.log(res.data);
          statusData.shiftLoading();
          this.mySubscribed = res.data.data;
          return res.data;
        })
        .catch((err) => {
          console.dir(err);
          statusData.shiftLoading();
          return err;
        });
    },
    async newSubscribed(data, userToken) {
      statusData.addLoading();
      return axios({
        method: 'POST',
        url: 'https://hex-post-team-api-server.herokuapp.com/api/order/pay/subscription',
        data,
        headers: {
          authorization: `${userToken}`,
        },
      })
        .then((res) => {
          console.log(res);
          statusData.shiftLoading();
          return res.data;
        })
        .catch((err) => {
          console.dir(err);
          statusData.shiftLoading();
          return err.response.data;
        });
    },
    async getHotCreater() {
      statusData.addLoading();
      try {
        const res = await axios({
          method: 'GET',
          url: 'https://hex-post-team-api-server.herokuapp.com/api/posts/order/users',
        });
        statusData.shiftLoading();
        return res.data.data;
      } catch (err) {
        console.dir(err);
        statusData.shiftLoading();
        return err;
      }
    },
    async getHotUser() {
      statusData.addLoading();
      try {
        const res = await axios({
          method: 'GET',
          url: 'https://hex-post-team-api-server.herokuapp.com/api/follow/orders/followers',
        });
        console.log(res.data);
        statusData.shiftLoading();
        return res.data.data;
      } catch (err) {
        console.dir(err);
        statusData.shiftLoading();
        return err;
      }
    },
  },
});
export default followData;
