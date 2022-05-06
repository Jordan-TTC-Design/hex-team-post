<script>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ref } from 'vue';

export default {
  props: ['modelValue', 'input-id', 'input-name', 'text-holder'],
  emits: ['target-text', 'update:modelValue'],
  setup(props, { emit }) {
    const editor = ref(ClassicEditor);
    function changeValue(e) {
      emit('update:modelValue', e);
    }
    const editorConfig = ref({
      toolbar: ['heading', '|', 'bold', 'italic', 'link'],
      language: 'zh',
      placeholder: `${props.textHolder}`,
      heading: {
        options: [
          {
            model: 'paragraph',
            title: 'Paragraph',
            class: 'ck-heading_paragraph',
          },
          {
            model: 'heading1',
            view: 'h2',
            title: 'Heading 1',
            class: 'ck-heading_heading1',
          },
          {
            model: 'heading2',
            view: 'h3',
            title: 'Heading 2',
            class: 'ck-heading_heading2',
          },
        ],
      },
    });
    return {
      editor,
      editorConfig,
      changeValue,
    };
  },
};
</script>

<template>
  <div class="form__editer">
    <ckeditor
      :editor="editor"
      :config="editorConfig"
      :id="inputId"
      :name="inputName"
      :value="modelValue"
      @input="changeValue"
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
