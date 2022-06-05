import { defineStore } from 'pinia';
import axios from 'axios';
import statusStore from '@/stores/statusStore';

const statusData = statusStore();

const paymentStore = defineStore({
  id: 'productStore',
  state: () => ({
  }),
  getters: {},
  actions: {
    async getProducts(type) {
      // 取得鑽石
      statusData.addLoading();
      try {
        const res = await axios({
          method: 'GET',
          url: `https://hex-post-team-api-server.herokuapp.com/api/products?type=${type}`,
          headers: {
            // authorization: `${userData.user?.token}`,
          },
        });
        if (res.data.status === 'success') {
          return res.data.data;
        }
        return res.data;
      } catch (err) {
        console.dir(err);
        return err;
      } finally {
        statusData.shiftLoading();
      }
    },
  },
});
export default paymentStore;
