<template>
  <select class="select" :value="modelValue" @change="changeOptions">
    <option disabled value="">Выберете из списка</option>
    <option
      v-for="option in options"
      :key="option.key"
      :value="option.value">

      {{ option.name }}
    </option>
  </select>
</template>

<script>
export default {
  name: 'MySelect',
  props: {
    modelValue: {
      type: String,
    },
    options: {
      type: Array,
      default: () => [],
    }
  },
  methods: {
    changeOptions(event) {
      this.$emit('update:modelValue', event.target.value)
    }
  }
}
</script>

<style>
  .select {
    height: 100%;
    padding: 10px;
  }
</style>