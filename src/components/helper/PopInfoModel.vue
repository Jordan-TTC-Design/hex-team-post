<script>
import { computed, watch } from 'vue';
import statusStore from '@/stores/statusStore';

export default {
  components: {},
  setup() {
    const statusData = statusStore();
    function closeModel() {
      statusData.popInfoModel.open = false;
      statusData.popInfoModel.title = '';
    }
    const title = computed(() => statusData.popInfoModel.title);
    watch(title, (newValue, oldValue) => {
      if (newValue !== oldValue) {
        setTimeout(() => {
          closeModel();
        }, 1000);
      }
    });
    return {
      statusData,
      closeModel,
    };
  },
};
</script>

<template>
  <div
    class="popModalContainer position-fixed top-0 left-0 z-popModal"
    :class="{ active: statusData.popInfoModel.open === true }"
  >
    <!-- Modal-Overlay -->
    <div class="popModalCover" @click="statusData.popInfoModel.open = false" />

    <!-- Modal-Window -->
    <div class="popModal" :class="{ active: statusData.popInfoModel.open === true }">
      <img
        style="width: 1.5rem"
        class="position-absolute start-4 top-4"
        src="@/assets/image/logo-mark.svg"
        alt="視窗圖示"
      />
      <div class="d-flex justify-content-center py-6">
        <div class="position-relative">
          <img src="@/assets/image/patch-fill.svg" alt="彈窗圖外框" />
          <i class="webIcon bi bi-heart text-primary absolute-middle"></i>
        </div>
      </div>
      <div class="pb-8">
        <h4 class="text-2xl font-bold text-primary text-center">
          {{ statusData.popInfoModel.title }}
        </h4>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.z-popModal {
  z-index: 5000;
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
    z-index: 50001;
    position: absolute;
    border-radius: 0.5rem;
    opacity: 0;
    transform: scaleY(0) translate(-50%, -50%);
    left: 50%;
    top: 40%;
    transition: all 0.3s;
    background-color: #fff;
    width: 30vw;
    max-height: 80vh;
    display: flex;
    flex-direction: column;

    @media (max-width: 998.98px) {
      width: 50vw;
    }
    @media (max-width: 767.98px) {
      width: 60vw;
    }
    @media (max-width: 575.98px) {
      width: 80vw;
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
</style>
