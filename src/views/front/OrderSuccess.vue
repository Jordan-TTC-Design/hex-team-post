<script>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import paymentStore from '@/stores/paymentStore';
import userStore from '@/stores/userStore';

export default {
  setup() {
    const route = useRoute();
    const router = useRouter();
    const paymentData = paymentStore();
    const userData = userStore();
    const pageTitle = ref('查詢訂單中');
    const pageTxt = ref('正在為您處理，請等待片刻~');
    const sendOrderId = ref('');
    async function checkOrder() {
      if (route.query.orderId) {
        const { orderId } = route.query;
        sendOrderId.value = orderId;
        const result = await paymentData.checkPayment(orderId);
        if (result.message === '授權成功') {
          pageTitle.value = '交易成功，感謝您的購買！';
          pageTxt.value = '儲值後返回首頁';
          const localUser = await JSON.parse(localStorage.getItem('sd-user'));
          await userData.getMyWallet(localUser.token);
          router.push('/');
        } else {
          pageTitle.value = '交易失敗';
          pageTxt.value = '3秒後，即將返回首頁～';
          setTimeout(() => {
            router.push('/');
          }, 3000);
        }
      }
    }
    checkOrder();
    return { pageTitle, pageTxt };
  },
};
</script>

<template>
  <div class="orderSuccess gap-4">
    <h2>{{ pageTitle }}</h2>
    <p>{{ pageTxt }}</p>
  </div>
</template>

<style lang="scss" scoped>
.orderSuccess {
  height: 60%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
