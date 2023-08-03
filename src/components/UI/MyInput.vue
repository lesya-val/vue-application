<template>
	<input 
		:value="modelValue"
		@input="updateInput"
		type="text" 
		class="input">
</template>

<script>
export default {
	name: 'MyInput',
	props: {
		modelValue: [String, Number]
	},
	methods: {
		updateInput(event) {
			this.$emit('update:modelValue', event.target.value)
		}
	}
}
</script>

<style>
	.input {
		width: 100%;
		padding: 10px;
		border: 1px solid teal;
	}
</style>