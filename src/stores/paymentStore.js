import { defineStore } from 'pinia';
import axios from 'axios';
import statusStore from '@/stores/statusStore';

const statusData = statusStore();

const paymentStore = defineStore({
  id: 'paymentStore',
  state: () => ({
    diamondProduct: [],
  }),
  getters: {},
  actions: {
    async getDiamonProduct(productType) {
      statusData.addLoading();
      try {
        const res = await axios({
          method: 'GET',
          url: `https://hex-post-team-api-server.herokuapp.com/api/products?type=${productType}`,
        });
        if (res.data.status === 'success') {
          this.diamondProduct = res.data.data;
        }
        statusData.shiftLoading();
        return res.data;
      } catch (err) {
        statusData.shiftLoading();
        return err;
      }
    },
    async payDiamonProduct(productId, userToken) {
      statusData.addLoading();
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
        statusData.shiftLoading();
        return res.data;
      } catch (err) {
        statusData.shiftLoading();
        return err;
      }
    },
    async goToPaymentPage(orderId, userToken) {
      statusData.addLoading();
      const apiUrl = `https://hex-post-team-api-server.herokuapp.com/api/payment/?orderId=${orderId}`;
      fetch(apiUrl, {
        headers: {
          authorization: userToken,
        },
      })
        .then((response) => response.blob())
        .then((blob) => {
          statusData.shiftLoading();
          const pageUrl = window.URL.createObjectURL(blob);
          window.open(pageUrl, '_self');
        })
        .catch((err) => {
          statusData.shiftLoading();
          return err;
        });
    },
    async checkPayment(orderId) {
      statusData.addLoading();
      try {
        const res = await axios({
          method: 'GET',
          url: `https://hex-post-team-api-server.herokuapp.com/api/order/status?orderId=${orderId}`,
        });
        statusData.shiftLoading();
        return res.data.data;
      } catch (err) {
        statusData.shiftLoading();
        return err;
      }
    },
  },
});
export default paymentStore;
