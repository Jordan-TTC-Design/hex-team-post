<script>
export default {
  setup() {
    return {};
  },
};
</script>

<template>
  <div class="loaderBg">
    <div class="preloader-container">
      <div class="progress-bar loading"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.loaderBg {
  background: rgba(0,0,0, 0.24);
  position: fixed;
  z-index: 2400;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}
.preloader-container {
  border-radius: 0.25rem;
  -moz-border-radius: 0.25rem;
  -webkit-border-radius: 0.25rem;
  margin: 40px auto;
  width: 50%;
  max-width: 400px;
  height: 0.25rem;
  display: block;
  background-color: var(--bs-gray-light);
  position: relative;
  overflow: hidden;
  -webkit-transition: all 0.3s ease-out;
  -moz-transition: all 0.3s ease-out;
  transition: all 0.3s ease-out;

  &.done-loading {
    border-radius: 0;
    height: 59px;
    box-shadow: 2px 2px 4px 0 rgba(197, 197, 197, 0.5);
  }
}

.progress-bar {
  background-color: var(--bs-white);
  &.loading {
    background-color: var(--bs-primary);

    &:after {
      -webkit-animation: indeterminate 1.8s infinite;
      animation: indeterminate 1.8s infinite;
    }
  }
}

.progress-bar:after {
  display: block;
  content: '';
  border-radius: 4px;
  -moz-border-radius: 4px;
  -webkit-border-radius: 4px;
  background-color: inherit;
  position: absolute;
  bottom: 0;
  left: 0;
  top: 0;
}

@keyframes indeterminate {
  from {
    left: -80%;
    width: 10%;
  }
  50% {
    width: 40%;
  }
  70% {
    width: 80%;
  }
  90% {
    left: 90%;
    width: 80%;
  }
  95% {
    left: 100%;
    width: 80%;
  }
  to {
    left: 140%;
    width: 0%;
  }
}
</style>
