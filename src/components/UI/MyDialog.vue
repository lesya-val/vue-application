<template>
  <div class="dialog" v-if="show" @click="hideDialog">
    <div
      @click.stop
      class="dialog__content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyDialog',
  props: {
    show: {
      type: Boolean,
      default: false,
    }
  },
  methods: {
    hideDialog() {
      this.$emit('update:show', false)
    }
  }
}
</script>

<style>
  .dialog {
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    position: fixed;
    display: flex;
    align-items: center;
  }

  .dialog__content {
    margin: 0 auto;
    padding: 20px;
    background-color: #fff;
    border-radius: 12px;
    min-height: 60px;
    max-height: 200px;
    min-width: 500px;
  }
</style>