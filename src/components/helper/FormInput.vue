<script>
export default {
  props: ['modelValue', 'input-id', 'input-type'],
};
</script>

<template>
  <div class="w-100 d-flex flex-column gap-1">
    <label
      class="ps-3"
      :for="inputId"
    >
      <slot></slot>
    </label>
    <input
      class="border py-2 px-2 rounded"
      :type="inputType"
      :id="inputId"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>

<style lang="scss"></style>
