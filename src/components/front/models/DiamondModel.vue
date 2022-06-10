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
    async function buyDiamond(productId, productName) {
      statusData.openAskModel(`是否購買${productName}`, '將會為您導向藍新金流結帳', async () => {
        const result = await paymentData.payDiamonProduct(productId, userData.user.token);
        if (result.status === 'success') {
          const { orderId } = result.data;
          console.log(orderId);
          const goToPay = await paymentData.goToPaymentPage(orderId, userData.user.token);
          console.log(goToPay);
        }
      });
    }
    function closeDiamondModel() {
      statusData.diamondModel = false;
      statusData.noScroll = false;
    }
    return {
      postsData,
      statusData,
      paymentData,
      userData,
      payContent,
      buyDiamond,
      closeDiamondModel,
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
    <div class="popModalCover" @click="closeDiamondModel" />

    <!-- Modal-Window -->
    <div class="popModal" :class="{ active: statusData.diamondModel === true }">
      <button @click="closeDiamondModel" type="button" class="btn position-absolute top-2 end-2">
        <i class="webIcon bi bi-x-lg"></i>
      </button>
      <img
        style="width: 1.5rem"
        class="position-absolute start-4 top-4"
        src="@/assets/image/logo-mark.svg"
        alt="視窗圖示"
      />
      <div class="d-flex justify-content-center py-md-6 pt-4">
        <div class="position-relative">
          <img src="@/assets/image/patch-fill.svg" alt="彈窗圖外框" />
          <i class="webIcon bi bi-gem text-primary absolute-middle"></i>
        </div>
      </div>
      <div class="d-flex flex-column p-4 gap-4 diamondContainer flex-shrink-0">
        <div class="diamondContainer__user gap-md-4 gap-2">
          <img
            class="userPhoto"
            :src="userData.user.photo || 'https://i.imgur.com/ZWHoRPi.png'"
            :alt="userData.user.name"
          />
          <div class="mb-md-0">
            <p class="fs-5 text-dark mb-1 ps-md-0 ps-2">{{ userData.user.name }}</p>
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
              <div class="buyDiamondBox gap-md-3 gap-1">
                <div class="diamondImg">
                  <i class="webIcon bi bi-gem"></i>
                </div>
                <div class="d-flex flex-column align-items-md-start align-items-center flex-grow-1">
                  <p class="mb-1">{{ product.name }}</p>
                  <p class="mb-md-3 mb-1">NTD {{ product.price - product.discount }}</p>
                  <button
                    @click="buyDiamond(product._id, product.name)"
                    type="button"
                    class="btn btn-white align-self-md-end"
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
      transform: translateY(-2px);
    }
    @media (max-width: 998.98px) {
      width: 4rem;
      height: 4rem;
      .webIcon {
        font-size: 3rem;
      }
    }
    @media (max-width: 575.98px) {
      width: 2.5rem;
      height: 2.5rem;
      .webIcon {
        font-size: 1.75rem;
      }
    }
  }
  @media (max-width: 767.98px) {
    flex-direction: column;
    align-items: center;
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
    width: 50vw;
    max-height: 80vh;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    @media (max-width: 1999.98px) {
      width: 60vw;
    }
    @media (max-width: 998.98px) {
      width: 75vw;
    }
    @media (max-width: 767.98px) {
      width: 90vw;
    }
    @media (max-width: 575.98px) {
      width: 100vw;
      height: 100vh;
      max-height: none;
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
    @media (max-width: 575.98px) {
      flex-direction: column;
    }
    .btn {
      z-index: 100;
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
