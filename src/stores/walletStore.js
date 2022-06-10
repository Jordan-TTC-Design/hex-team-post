import { defineStore } from 'pinia';
import axios from 'axios';
import statusStore from '@/stores/statusStore';
import userStore from '@/stores/userStore';

const statusData = statusStore();
const userData = userStore();

const paymentStore = defineStore({
  id: 'walletStore',
  state: () => ({
    diamond: 100,
    diamondPurchaseRecord: [],
    diaryPurchaseRecord: [],
    diaryRetailRecord: [],
  }),
  getters: {},
  actions: {
    async getDiamond() {
      // 取得鑽石
      statusData.addLoading();
      try {
        const res = await axios({
          method: 'GET',
          url: 'https://hex-post-team-api-server.herokuapp.com/api/wallet',
          headers: {
            authorization: `${userData.user?.token}`,
          },
        });
        if (res.data.status === 'success') {
          this.diamond = res.data.data;
        }
        return res.data;
      } catch (err) {
        console.dir(err);
        return err;
      } finally {
        statusData.shiftLoading();
      }
    },
    async getDiamondPurchaseRecord() {
      // 取得鑽石購買紀錄
      statusData.addLoading();
      try {
        const res = await axios({
          method: 'GET',
          url: 'https://hex-post-team-api-server.herokuapp.com/api/wallet/record/add-credit',
          headers: {
            authorization: `${userData.user?.token}`,
          },
        });
        console.log(res);
        if (res.data.status === 'success') {
          this.diamondPurchaseRecord = res.data.data;
        }
        return res.data.data;
      } catch (err) {
        console.dir(err);
        return err;
      } finally {
        statusData.shiftLoading();
      }
    },
    async getDiaryPurchaseRecord() {
      // 取得日記購買紀錄
      statusData.addLoading();
      try {
        const res = await axios({
          method: 'GET',
          url: 'https://hex-post-team-api-server.herokuapp.com/api/wallet/record/pay',
          headers: {
            authorization: `${userData.user?.token}`,
          },
        });
        console.log(res);
        if (res.data.status === 'success') {
          this.diaryPurchaseRecord = res.data.data;
        }
        return res.data.data;
      } catch (err) {
        console.dir(err);
        return err;
      } finally {
        statusData.shiftLoading();
      }
    },
    async getDiaryRetailRecord() {
      // 取得日記銷售紀錄
      statusData.addLoading();
      try {
        const res = await axios({
          method: 'GET',
          url: 'https://hex-post-team-api-server.herokuapp.com/api/wallet/record/income',
          headers: {
            authorization: `${userData.user?.token}`,
          },
        });
        console.log(res.data.data);
        this.diaryRetailRecord = res.data.data;

        return res.data.data;
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
