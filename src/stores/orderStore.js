import { defineStore } from 'pinia';
import axios from 'axios';
import statusStore from '@/stores/statusStore';
import userStore from '@/stores/userStore';

const statusData = statusStore();
const userData = userStore();

const paymentStore = defineStore({
  id: 'orderStore',
  state: () => ({
  }),
  getters: {},
  actions: {
    // 產生訂單
    async createOrder(id) {
      statusData.addLoading();
      try {
        const res = await axios({
          method: 'POST',
          url: 'https://hex-post-team-api-server.herokuapp.com/api/order',
          data: {
            productId: id,
          },
          headers: {
            authorization: `${userData.user?.token}`,
          },
        });
        return res.data;
      } catch (err) {
        return err;
      } finally {
        statusData.shiftLoading();
      }
    },
  },
});
export default paymentStore;
