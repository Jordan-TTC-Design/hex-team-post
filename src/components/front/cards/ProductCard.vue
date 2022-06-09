<script>
import { ref } from 'vue';
import statusStore from '@/stores/statusStore';
import followStore from '@/stores/followStore';
import userStore from '@/stores/userStore';

export default {
  props: {
    products: Array,
    userId: String,
  },
  components: {},
  setup(props) {
    const statusData = statusStore();
    const followData = followStore();
    const userData = userStore();
    const listShow = ref(false);
    function openModel() {
      listShow.value = true;
      statusData.noScroll = true;
    }
    function closeModel() {
      listShow.value = false;
      statusData.noScroll = false;
    }

    const purchase = ({ id, name }) => {
      const subscribedData = {
        subscriptionUserId: props.userId,
        productId: id,
      };
      console.log(subscribedData);
      statusData.openAskModel('確定是否購買', name, async () => {
        try {
          const res = await followData.newSubscribed(subscribedData, userData.user.token);
          console.log(res);
          if (res.status === 'success') {
            statusData.openRemindModel('購買成功', `訂單編號：${res.message}`);
          } else {
            statusData.openRemindModel('購買失敗', `${res.message}`);
          }
        } catch (e) {
          statusData.openRemindModel('購買失敗', `${e.response.data.message}`);
        }
      });
    };

    return {
      props,
      listShow,
      openModel,
      closeModel,
      purchase,
    };
  },
};
</script>
<template>
  <div class="sideBox gap-3">
    <div class="sideBox__card card" :class="{ active: listShow }">
      <div class="p-3 border-bottom d-flex gap-2 align-items-center">
        <button @click="closeModel" type="button" class="btn d-lg-none d-block">
          <i class="bi bi-chevron-left"></i>
        </button>
        <div class="card-title">訂閱方案</div>
      </div>
      <div class="card-body">
        <div
          class="sponsor"
          v-for="p in props.products"
          :key="p._id"
          @click="purchase({ id: p._id, name: p.name })"
        >
          <span class="sponsor-title">{{ p.coin }} SD / {{ p.effectiveOfMonthNumber }} 月</span>
          <span class="sponsor-subtitle">{{ p.name }}訂閱</span>
        </div>
      </div>
    </div>
    <button @click="openModel" type="button" class="sideBtn d-lg-none d-block">
      <i class="bi bi-patch-plus-fill"></i>
    </button>
  </div>
</template>

<style lang="scss" scoped></style>
