<script>
// import { ref } from 'vue';
import FormRadioButton from '@/components/helper/FormRadioButton.vue';

export default {
  components: {
    FormRadioButton,
  },
  setup(props, { emit }) {
    const cancel = () => {
      emit('hide-edit');
    };
    const save = () => {
      emit('hide-edit');
    };

    return { props, cancel, save };
  },
};
</script>

<template>
  <div class="card">
    <div class="card-body">
      <div class="card-title border-bottom pb-3 mb-3">個人資料</div>
      <div class="tmp">
        <p class="a mb-1 ms-3">暱稱</p>
        <p class="b">
          <input
            type="text"
            class="form-control border bg-white"
            value="Jordan"
          />
        </p>
      </div>
      <div class="tmp">
        <p class="a mb-1 ms-3">性別</p>
        <p class="b">
          <FormRadioButton class="me-2">男性</FormRadioButton>
          <FormRadioButton class="me-2">女性</FormRadioButton>
        </p>
      </div>
      <div class="tmp">
        <p class="a mb-1 ms-3">生日</p>
        <p class="b">
          <input
            type="text"
            class="form-control border bg-white"
            value="2022 / 12 / 12"
          />
        </p>
      </div>
      <div class="tmp">
        <p class="a mb-1 ms-3">電子郵件</p>
        <p class="b">
          <input
            type="text"
            class="form-control border bg-white"
            value="Jordan.ttc.design@gmail.com"
          />
        </p>
      </div>
      <div class="d-flex justify-content-end">
        <button type="button" class="btn btn-default me-3" @click="cancel">
          取消
        </button>
        <button type="button" class="btn btn-primary" @click="save">
          保存
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.tmp {
  padding-bottom: 12px;
  .a {
    font-size: 14px;
    color: #1d1d1d;
  }
}
</style>
