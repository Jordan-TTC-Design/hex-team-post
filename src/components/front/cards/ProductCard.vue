<script>
// eslint-disable-next-line object-curly-newline
import { ref, computed, watch, onMounted } from 'vue';
import { useRouter } from 'vue-router';
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
    const router = useRouter();
    const userData = userStore();
    const listShow = ref(false);
    const checkSubscribe = ref(-1);
    function openModel() {
      listShow.value = true;
      statusData.noScroll = true;
    }
    function closeModel() {
      listShow.value = false;
      statusData.noScroll = false;
    }
    const thisUserId = computed(() => props.userId);
    watch(thisUserId, (newValue) => {
      console.log(userData.user.id, newValue);
      if (userData.user.id !== '' && userData.user.id !== newValue) {
        checkSubscribe.value = followData.mySubscribed.findIndex((item) => item.id === newValue);
        console.log(followData.mySubscribed, checkSubscribe.value);
      }
    });
    const purchase = ({ id, name }) => {
      statusData.openAskModel('確定是否購買', `${name}訂閱`, async () => {
        try {
          const res = await followData.newSubscribed(props.userId, id, userData.user.token);
          console.log(res);
          if (res.status === 'success') {
            statusData.openAskModel('購買成功', '是否要重新更新資料', async () => {
              router.go(0);
            });
          } else {
            statusData.openRemindModel('購買失敗', `${res.message}`);
          }
        } catch (e) {
          statusData.openRemindModel('購買失敗', `${e.response.data.message}`);
        }
      });
    };
    onMounted(async () => {
      if (userData.user.token) {
        await followData.getMySubscribed(userData.user.token);
        checkSubscribe.value = followData.mySubscribed.findIndex(
          (item) => item.id === thisUserId.value,
        );
        console.log(followData.mySubscribed, checkSubscribe.value);
      }
    });
    return {
      props,
      listShow,
      checkSubscribe,
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
        <div class="py-2" v-if="checkSubscribe >= 0">
          <p class="text-center mb-2">訂閱該用戶中</p>
          <p class="text-center">感謝支持</p>
        </div>
        <template v-else>
          <div
            class="sponsor"
            v-for="p in props.products"
            :key="p._id"
            @click="purchase({ id: p._id, name: p.name })"
          >
            <span class="sponsor-title">{{ p.coin }} SD / {{ p.effectiveOfMonthNumber }} 月</span>
            <span class="sponsor-subtitle">{{ p.name }}訂閱</span>
          </div>
        </template>
      </div>
    </div>
    <button @click="openModel" type="button" class="sideBtn d-lg-none d-block">
      <i class="bi bi-patch-plus-fill"></i>
    </button>
  </div>
</template>

<style lang="scss" scoped></style>
