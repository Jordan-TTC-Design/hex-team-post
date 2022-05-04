<script>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ref } from 'vue';

export default {
  props: ['modelValue', 'input-id', 'input-name', 'text-holder'],
  setup(props) {
    const editor = ref(ClassicEditor);
    const editorData = ref('<p>請輸入</p>');
    const editorConfig = ref({
      toolbar: [],
      language: 'zh',
      placeholder: `${props.textHolder}`,
    });
    return { editor, editorData, editorConfig };
  },
};
</script>

<template>
  <div class="w-full mb-6 md:mb-0 form__editer">
    <ckeditor
      class="articalInputArea"
      :editor="editor"
      :config="editorConfig"
      :id="inputId"
      :name="inputName"
      :value="modelValue"
    ></ckeditor>
  </div>
</template>

<style lang="scss">
.form__editer {
  .ck.ck-editor__editable_inline > :first-child {
    margin: 0;
  }
  .ck-content.ck-editor__editable.ck-focused {
    box-shadow: none;
    border: none;
  }
  .ck-editor__editable_inline {
    overflow-y: auto;
  }
  .ck-content {
    border: none;
    padding: 0;
    p {
      margin: 0;
    }
  }
  .ck-placeholder {
    font-size: 1.25rem;
    margin: 0;
    &::before {
      color: #e2e2e2;
    }
  }
  .ck-content h2 {
    font-size: 24px;
  }
  .ck-editor__top {
    display: none;
  }
}
</style>
