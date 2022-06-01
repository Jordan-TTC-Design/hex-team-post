import { defineStore } from 'pinia';
import axios from 'axios';

const paymentStore = defineStore({
  id: 'paymentStore',
  state: () => ({
    diamondProduct: [],
  }),
  getters: {},
  actions: {
    async getDiamonProduct() {
      try {
        const res = await axios({
          method: 'GET',
          url: 'https://hex-post-team-api-server.herokuapp.com/api/products/',
        });
        console.log(res.data);
        if (res.data.status === 'success') {
          this.diamondProduct = res.data.data;
        }
        return res.data;
      } catch (err) {
        console.dir(err);
        return err;
      }
    },
    async payDiamonProduct(productId, userToken) {
      console.log(productId, userToken);
      try {
        const res = await axios({
          method: 'POST',
          url: 'https://hex-post-team-api-server.herokuapp.com/api/order/',
          data: {
            productId,
          },
          headers: {
            authorization: `${userToken}`,
          },
        });
        console.log(res.data);
        return res.data;
      } catch (err) {
        console.dir(err);
        return err;
      }
    },
    async goToPaymentPage(orderId, userToken) {
      console.log(orderId, userToken);
      try {
        const res = await axios({
          method: 'GET',
          url: `https://hex-post-team-api-server.herokuapp.com/api/payment/?orderId=${orderId}`,
          headers: {
            authorization: `${userToken}`,
          },
        });
        console.log(res.data);
        return res.data;
      } catch (err) {
        console.dir(err);
        return err;
      }
    },
  },
});
export default paymentStore;
