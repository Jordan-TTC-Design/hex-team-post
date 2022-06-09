<script>
import { reactive } from 'vue';
import userStore from '@/stores/userStore';

export default {
  props: {
    user: Object,
  },
  setup(props, { emit }) {
    const userData = userStore();
    const {
      name,
      birthday,
      gender,
      memo,
    } = userData.myProfile;
    const editUser = reactive({
      name,
      birthday: birthday.split('T')[0],
      gender,
      memo,
    });

    const save = async () => {
      await userData.editUser({ ...editUser });
      emit('hide-edit');
    };
    const cancel = () => {
      emit('hide-edit');
    };

    return {
      props,
      editUser,
      cancel,
      save,
    };
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
          <input type="text" class="form-control border bg-white" v-model="editUser.name" />
        </p>
      </div>
      <div class="tmp">
        <p class="ms-3">性別</p>
        <div class="d-flex gap-2">
          <input
            class="formRadio__input"
            type="radio"
            id="userMale"
            value="male"
            v-model="editUser.gender"
          />
          <label
            :class="{ active: editUser.gender === 'male' }"
            class="formRadio__label"
            for="userMale"
            >男性</label
          >
          <input
            class="formRadio__input"
            type="radio"
            id="userFemale"
            value="female"
            v-model="editUser.gender"
          />
          <label
            :class="{ active: editUser.gender === 'female' }"
            class="formRadio__label"
            for="userFemale"
            >女性</label
          >
        </div>
      </div>
      <div class="tmp">
        <p class="a mb-1 ms-3">生日</p>
        <p class="b">
          <input type="date" class="form-control border bg-white" v-model="editUser.birthday" />
        </p>
      </div>
      <div class="tmp">
        <p class="a mb-1 ms-3">個人簡介</p>
        <p class="b">
          <textarea
            v-model="editUser.memo"
            type="text"
            class="form-control border bg-white"
          ></textarea>
        </p>
      </div>
      <div class="d-flex justify-content-end">
        <button type="button" class="btn btn-default me-3" @click="cancel">取消</button>
        <button type="button" class="btn btn-primary" @click="save">保存</button>
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
.formRadio {
  &__input {
    display: none;
  }
  &__label {
    border: 1px solid #e2e2e2;
    padding: 0.5rem;
    border-radius: 0.75rem;
    cursor: pointer;
    &.active {
      background-color: #f2e8fc;
      border: 1px solid #892092;
      color: #892092;
    }
  }
}
</style>
