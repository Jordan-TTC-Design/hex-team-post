<script>
import userStore from '@/stores/userStore';
import { ref, reactive } from 'vue';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

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
    const editor = ref(ClassicEditor);
    const editorConfig = ref({
      toolbar: [],
      language: 'zh',
      placeholder: '多多介紹自己',
      heading: {
        options: [],
      },
    });

    return {
      props,
      editUser,
      editor,
      editorConfig,
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
      <div class="tmp--userInfo">
        <p class="a mb-1 ms-3">暱稱</p>
        <p class="b">
          <input type="text" class="form-control border bg-white" v-model="editUser.name" />
        </p>
      </div>
      <div class="tmp--userInfo">
        <p class="ms-3">性別</p>
        <div class="d-flex gap-2">
          <input
            class="formRadio--userInfo__input"
            type="radio"
            id="userMale"
            value="male"
            v-model="editUser.gender"
          />
          <label
            :class="{ active: editUser.gender === 'male' }"
            class="formRadio--userInfo__label"
            for="userMale"
            >男性</label
          >
          <input
            class="formRadio--userInfo__input"
            type="radio"
            id="userFemale"
            value="female"
            v-model="editUser.gender"
          />
          <label
            :class="{ active: editUser.gender === 'female' }"
            class="formRadio--userInfo__label"
            for="userFemale"
            >女性</label
          >
        </div>
      </div>
      <div class="tmp--userInfo">
        <p class="a mb-1 ms-3">生日</p>
        <p class="b">
          <input type="date" class="form-control border bg-white" v-model="editUser.birthday" />
        </p>
      </div>
      <div class="tmp--userInfo">
        <p class="a mb-1 ms-3">個人簡介</p>
        <div class="form__editer--userInfo">
          <ckeditor
            ref="userMemoEditor"
            :editor="editor"
            :config="editorConfig"
            id="userMemoEdit"
            name="userMemoEdit"
            v-model="editUser.memo"
          ></ckeditor>
        </div>
      </div>
      <div class="d-flex justify-content-end">
        <button type="button" class="btn btn-default me-3" @click="cancel">取消</button>
        <button type="button" class="btn btn-primary" @click="save">保存</button>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.tmp--userInfo {
  padding-bottom: 12px;
  .a {
    font-size: 14px;
    color: #1d1d1d;
  }
}
.formRadio--userInfo {
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
.form__editer--userInfo {
  .ck.ck-editor__editable_inline > :first-child {
    margin: 0;
  }
  .ck-editor__editable_inline {
    overflow-y: auto;
  }
  .ck-placeholder {
    font-size: 1rem;
    margin: 0;
    &::before {
      color: var(--bs-gray-middle);
    }
  }
  .ck-content h2 {
    font-size: 24px;
  }
  .ck-editor__top {
    display: none;
  }
  .ck.ck-editor__editable_inline {
    padding: 0;
  }
  .ck-placeholder {
    color: var(--bs-gray-middle);
  }
  .ck-content {
    outline: none;
    padding: 0;
    border-radius: 0.75rem;
    border: 1px solid var(--bs-gray-middle);
    p {
      margin: 0;
    }
  }
  .ck-content.ck-editor__editable.ck-focused {
    box-shadow: none;
    outline: none;
    border: 1px solid var(--bs-gray-middle);
    min-height: 10rem;
    border-radius: 0.75rem;
    padding: 0.5rem;
  }
  .ck.ck-editor__main > .ck-editor__editable:not(.ck-focused) {
    border: 1px solid var(--bs-gray-middle);
    min-height: 10rem;
    border-radius: 0.75rem;
    padding: 0.5rem;
    outline: none;
  }
}
</style>
