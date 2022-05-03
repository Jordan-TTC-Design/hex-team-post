<script>
import postsStore from '@/stores/postsStore';
import statusStore from '@/stores/statusStore';

export default {
  setup() {
    const postsData = postsStore();
    const statusData = statusStore();
    return {
      postsData,
      statusData,
    };
  },
};
</script>

<template>
  <div
    class="popModalContainer position-fixed top-0 left-0 z-popModal"
    :class="{ active: statusData.newPostModel === true }"
  >
    <!-- Modal-Overlay -->
    <div class="popModalCover" @click="statusData.newPostModel = false" />

    <!-- Modal-Window -->
    <div class="popModal" :class="{ active: statusData.newPostModel === true }">
      <div class="flex flex-grow justify-between sm:flex-row flex-col overflow-auto sm:mb-0 mb-4">
        <div class="flex flex-col gap-4 md:p-8 p-6">
          <div class="w-full mb-6 md:mb-0">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 pl-2"
              for="inputId"
            >
              <slot></slot>
            </label>
            <textarea
              class="appearance-none bg-transparent border border-gray-300
              w-full text-gray-700 py-2 px-2 leading-tight focus:outline-none"
              id="inputId"
              rows="2"
              value="modelValue"
              placeholder="textHolder"
            ></textarea>
          </div>
          <p>
            {{ 22 }}
          </p>
        </div>
      </div>
      <div class="flex sm:flex-row flex-col sm:gap-4 gap-2 p-4 pt-0">
        <button
          type="button"
          @click="statusData.newPostModel = false"
          class="w-full bg-black text-white rounded py-2 px-3 hover:border-gray-300"
        >
          確定
        </button>
        <button
          type="button"
          @click="statusData.newPostModel = false"
          class="w-full border border-gray-400 rounded py-2 px-3 hover:border-gray-300"
        >
          取消
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
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
