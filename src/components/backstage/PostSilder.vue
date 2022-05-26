<script>
import { computed, ref } from 'vue';
import backStatusStore from '@/stores/backstage/backStatusStore';

export default {
  props: ['select-item', 'modal-open'],
  emits: ['get-posts', 'clear-item'],
  setup(props) {
    const backStageData = backStatusStore();
    const modalOpen = ref(false);
    const modalState = computed(() => props.modalState);
    const listState = ref(1);
    // function closeModal() {
    //   modalOpen.value = false;
    //   emit('get-article');
    //   emit('clear-item');
    // }
    const postItem = ref({
      title: '',
    });
    return {
      modalState,
      modalOpen,
      listState,
      postItem,
      backStageData,
    };
  },
};
</script>

<template>
  <div
    class="silderBg--x z-silder"
    :class="{ active: backStageData.postSilderState }"
    @click="backStageData.postSilderState = false"
  ></div>
  <div class="silderBox--x z-silder" :class="{ active: backStageData.postSilderState === true }">
    <div class="d-flex flex-column postion-relative h-100">
      <div class="d-flex justify-content-between align-items-center py-3 px-4 border-bottom">
        <h3 class="title">貼文</h3>
        <button
          type="button"
          class="btn rounded py-1.5 px-2"
          @click="backStageData.postSilderState = false"
        >
          <i class="webIcon bi bi-x"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss"></style>
