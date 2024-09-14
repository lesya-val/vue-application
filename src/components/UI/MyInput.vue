<template>
	<input :value="modelValue" @input="updateInput" type="text" class="input" />
</template>

<script>
/**
 * @file MyInput.vue
 * @brief Компонент для ввода текста или чисел.
 *
 * Этот компонент предоставляет текстовое поле ввода, поддерживающее двустороннее связывание данных через `v-model`.
 */
export default {
	/**
	 * @property {string} name - Имя компонента.
	 */
	name: 'MyInput',

	/**
	 * @property {Object} props - Свойства, передаваемые компоненту.
	 */
	props: {
		/**
		 * @property {String|Number} modelValue - Значение, связанное с полем ввода.
		 * Может быть строкой или числом.
		 */
		modelValue: [String, Number],
	},

	methods: {
		/**
		 * Обрабатывает событие изменения значения в поле ввода и отправляет новое значение через событие `update:modelValue`.
		 *
		 * @param {Event} event - Событие изменения значения в текстовом поле.
		 */
		updateInput(event) {
			this.$emit('update:modelValue', event.target.value);
		},
	},
};
</script>

<style>
.input {
	width: 100%;
	padding: 10px;
	border: 1px solid teal;
}
</style>
