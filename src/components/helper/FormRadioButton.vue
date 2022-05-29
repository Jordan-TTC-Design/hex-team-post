<script>
export default {
  // props: ['', 'input-id', 'input-type'],
  props: {
    class: String,
    name: String,
  },
  setup(props, { emit }) {
    const onChange = (e) => {
      emit('aaaa', e);
    };

    return {
      props,
      onChange,
    };
  },
};
</script>

<template>
  <label class="form-checkbox" :class="props.class">
    <input type="radio" :name="props.name" @change="onChange" />
    <span>
      <slot></slot>
    </span>
  </label>
</template>

<style lang="scss" scoped>
.form-checkbox {
  display: inline-block;

  & input {
    display: none;
  }
  & input:checked + span {
    background-color: var(--bs-secondary);
    border-color: var(--bs-primary);
    color: var(--bs-primary);
  }

  & span {
    display: block;
    border: 1px solid #fff;
    background-color: #fff;
    border-radius: 12px;

    cursor: pointer;
    user-select: none;
    font-size: 16px;
    line-height: 1.5;
    padding: 9px 11px;
    color: #1d1d1d;
    text-align: center;
    white-space: nowrap;
  }
}
</style>
