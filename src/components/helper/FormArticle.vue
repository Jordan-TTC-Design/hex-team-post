<script>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ref, watch, computed } from 'vue';

export default {
  props: ['modelValue', 'input-id', 'input-name', 'text-holder'],
  emits: ['update:modelValue'],
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
    // 監聽傳進來的值來改變編輯器的預設文字
    const modelData = computed(() => props.modelValue);
    const targetEditor = ref(null);
    const timeCount = ref(1);
    watch(modelData, (newValue) => {
      if (newValue !== '' && timeCount.value === 1) {
        targetEditor.value.instance.setData(newValue);
        console.dir(targetEditor.value.editor);
        timeCount.value = 2;
      } else if (newValue === '') {
        timeCount.value = 1;
        targetEditor.value.instance.setData('');
      }
    });
    return {
      targetEditor,
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
      ref="targetEditor"
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
  .ck.ck-editor__main > .ck-editor__editable:not(.ck-focused) {
    border: none;
  }
}
</style>
