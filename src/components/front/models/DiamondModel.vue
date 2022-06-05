<script>
import { ref } from 'vue';
import postsStore from '@/stores/postsStore';
import statusStore from '@/stores/statusStore';
import paymentStore from '@/stores/paymentStore';
import userStore from '@/stores/userStore';

export default {
  components: {},
  setup() {
    const userData = userStore();
    const postsData = postsStore();
    const statusData = statusStore();
    const paymentData = paymentStore();
    const payContent = ref('');
    paymentData.getDiamonProduct('coin');
    async function buyDiamond(productId) {
      const result = await paymentData.payDiamonProduct(productId, userData.user.token);
      if (result.status === 'success') {
        const { orderId } = result.data;
        console.log(orderId);
        const goToPay = await paymentData.goToPaymentPage(orderId, userData.user.token);
        console.log(goToPay);
      }
    }
    return {
      postsData,
      statusData,
      paymentData,
      userData,
      payContent,
      buyDiamond,
    };
  },
};
</script>

<template>
  <div
    class="popModalContainer position-fixed top-0 left-0 z-popModal"
    :class="{ active: statusData.diamondModel === true }"
  >
    <!-- Modal-Overlay -->
    <div class="popModalCover" @click="statusData.diamondModel = false" />

    <!-- Modal-Window -->
    <div class="popModal" :class="{ active: statusData.diamondModel === true }">
      <button
        @click="statusData.diamondModel = false"
        type="button"
        class="btn position-absolute top-2 end-2"
      >
        <i class="webIcon bi bi-x-lg"></i>
      </button>
      <img
        style="width: 1.5rem"
        class="position-absolute start-4 top-4"
        src="@/assets/image/logo-mark.svg"
        alt="視窗圖示"
      />
      <div class="d-flex justify-content-center py-6">
        <div class="position-relative">
          <img src="@/assets/image/patch-fill.svg" alt="彈窗圖外框" />
          <i class="webIcon bi bi-gem text-primary absolute-middle"></i>
        </div>
      </div>
      <div class="d-flex flex-column p-4 gap-4 flex-grow-1 diamondContainer">
        <div class="diamondContainer__user gap-4">
          <img
            class="userPhoto"
            :src="userData.user.photo || 'https://i.imgur.com/ZWHoRPi.png'"
            :alt="userData.user.name"
          />
          <div>
            <p class="fs-5 text-dark mb-1">{{ userData.user.name }}</p>
            <div class="d-flex gap-2">
              <button type="button" class="btn btn-white">儲值紀錄</button>
              <button type="button" class="btn btn-white">消費紀錄</button>
            </div>
            <img
              class="diamondContainer__user__logoMark"
              src="@/assets/image/logo-mark.svg"
              alt="logoMark"
            />
            <p class="position-absolute top-3 end-3 text-primary">
              秘密鑽石<span class="ms-2 fs-4 fw-bold text-primary">{{ userData.myWallet }} SD</span>
            </p>
          </div>
        </div>
        <div class="row row-cols-2 g-3">
          <template v-for="product in paymentData.diamondProduct" :key="product._id">
            <div class="col">
              <div class="buyDiamondBox gap-3">
                <div class="diamondImg">
                  <i class="webIcon bi bi-gem"></i>
                </div>
                <div class="d-flex flex-column flex-grow-1">
                  <p class="mb-1">{{ product.coin }}顆{{ product.name }}</p>
                  <p class="mb-3">NTD {{ product.price - product.discount }}</p>
                  <button
                    @click="buyDiamond(product._id)"
                    type="button"
                    class="btn btn-white align-self-end"
                  >
                    點擊購買
                  </button>
                </div>
              </div>
            </div>
          </template>
        </div>
        <div v-html="payContent"></div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.buyDiamondBox {
  position: relative;
  padding: 0.75rem;
  background-color: var(--bs-gray-light);
  border-radius: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .diamondImg {
    position: relative;
    background-image: url('../../../assets/image/diamond-fill.svg');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    width: 6rem;
    height: 6rem;
    display: flex;
    align-items: center;
    justify-content: center;
    .webIcon {
      font-size: 4.75rem;
      color: var(--bs-primary);
    }
  }
}
.z-popModal {
  z-index: 2400;
}
.popModalContainer {
  height: 100vh;
  width: 100vw;
  transition: all 0.3s;
  pointer-events: none;
  .popModalCover {
    background-color: rgba(0, 0, 0, 0);
    transition: all 0.3s;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }
  .popModal {
    opacity: 1;
    z-index: 100;
    position: absolute;
    border-radius: 0.5rem;
    opacity: 0;
    transform: scaleY(0) translate(-50%, -50%);
    left: 50%;
    top: 40%;
    transition: all 0.3s;
    background-color: #fff;
    width: 45vw;
    max-height: 80vh;
    display: flex;
    flex-direction: column;

    @media (max-width: 998.98px) {
      width: 75vw;
    }
    @media (max-width: 767.98px) {
      width: 90vw;
    }
    @media (max-width: 575.98px) {
      width: 100vw;
      max-height: 100vh;
      border-radius: 0;
    }
  }
}

.popModalContainer.active {
  pointer-events: auto;
  .popModalCover {
    background-color: rgba(0, 0, 0, 0.5);
  }
  .popModal {
    opacity: 1;
    left: 50%;
    top: 50%;
    transform: scaleY(1) translate(-50%, -50%);
  }
}
.userPhoto {
  width: 44px;
  height: 44px;
  border: 2px solid #000400;
  border-radius: 100%;
  object-fit: cover;
  object-position: center;
  background: #e2edfa;
}
.diamondContainer {
  flex-shrink: 1;
  flex-grow: 1;
  overflow-y: auto;
  &__user {
    padding: 0.75rem;
    background-color: var(--bs-secondary);
    border-radius: 0.5rem;
    display: flex;
    position: relative;
    overflow: hidden;
    &__logoMark {
      width: 8rem;
      position: absolute;
      right: 0;
      bottom: 0;
      transform: translate(24%, 48%);
      opacity: 0.3;
    }
  }
  .btn {
    padding: 0.5rem 0.75rem;
  }
}
.diamondContainer::-webkit-scrollbar {
  border: none;
  width: 0.5rem;
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 0.5rem;
}
.diamondContainer::-webkit-scrollbar-thumb {
  background-color: #dddddd;
  border-radius: 0.5rem;
}
</style>
