<script>
import { reactive } from 'vue';

export default {
  props: {},
  setup(props, { emit }) {
    const password = reactive({
      password: '',
      confirmPassword: '',
    });

    const changePassword = () => {
      console.log('inner change');
      emit('change-password', { ...password });
    };
    return {
      props,
      password,
      changePassword,
    };
  },
};
</script>

<template>
  <div class="card">
    <div class="card-body">
      <div class="card-title border-bottom pb-3 mb-3">變更密碼</div>
      <div class="tmp">
        <p class="a mb-1">新密碼</p>
        <input
          type="password"
          class="form-control border bg-white"
          v-model="password.password"
        />
      </div>
      <div class="tmp">
        <p class="a mb-1">確認新密碼</p>
        <p class="b">
          <input
            type="password"
            class="form-control border bg-white"
            v-model="password.confirmPassword"
          />
        </p>
      </div>
      <div class="d-flex justify-content-end">
        <button type="button" class="btn btn-primary" @click="changePassword">
          變更
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.tmp {
  padding: 12px 0;
  .a {
    font-size: 12px;
    color: #979797;
  }
  .b {
    font-size: 14px;
    color: #646464;
  }
}

.c {
  color: #1d1d1d;
}
</style>
