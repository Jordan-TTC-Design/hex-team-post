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
    async getDiamonProduct() {
      statusData.addLoading();
      try {
        const res = await axios({
          method: 'GET',
          url: 'https://hex-post-team-api-server.herokuapp.com/api/products/',
        });
        if (res.data.status === 'success') {
          this.diamondProduct = res.data.data;
        }
        statusData.shiftLoading();
        return res.data;
      } catch (err) {
        statusData.shiftLoading();
        console.dir(err);
        return err;
      }
    },
    async payDiamonProduct(productId, userToken) {
      statusData.addLoading();
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
        console.log(res);
        statusData.shiftLoading();
        return res.data;
      } catch (err) {
        console.dir(err);
        statusData.shiftLoading();
        return err;
      }
    },
    async goToPaymentPage(orderId, userToken) {
      statusData.addLoading();
      console.log(orderId, userToken);
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
          console.log(blob);
          window.open(pageUrl, 'newebpay_payment', 'location=0').focus();
        })
        .catch((err) => {
          statusData.shiftLoading();
          console.log(err);
        });
      // axios({
      //   method: 'GET',
      //   url: apiUrl,
      //   headers: {
      //     authorization: userToken,
      //   },
      // })
      //   .then((response) => response.blob())
      //   .then((blob) => {
      //     const pageUrl = window.URL.createObjectURL(blob);
      //     window.open(pageUrl, 'newebpay_payment', 'location=0').focus();
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });
    },
  },
});
export default paymentStore;
