<template>
	<select class="select" :value="modelValue" @change="changeOptions">
		<option disabled value="">Выберете из списка</option>
		<option v-for="option in options" :key="option.key" :value="option.value">
			{{ option.name }}
		</option>
	</select>
</template>

<script>
/**
 * @file MySelect.vue
 * @brief Компонент для выбора опций из выпадающего списка.
 *
 * Этот компонент предоставляет интерфейс для выбора значений из списка опций и поддерживает двустороннее связывание с моделью.
 */
export default {
	/**
	 * @property {string} name - Имя компонента.
	 */
	name: 'MySelect',

	/**
	 * @property {Object} props - Свойства, передаваемые компоненту.
	 */
	props: {
		/**
		 * @property {string} modelValue - Текущее выбранное значение.
		 */
		modelValue: {
			type: String,
		},
		/**
		 * @property {Array} options - Список доступных опций для выбора.
		 * По умолчанию это пустой массив.
		 */
		options: {
			type: Array,
			default: () => [],
		},
	},

	methods: {
		/**
		 * Обрабатывает изменение выбранной опции и отправляет новое значение через событие `update:modelValue`.
		 *
		 * @param {Event} event - Событие изменения значения выпадающего списка.
		 */
		changeOptions(event) {
			this.$emit('update:modelValue', event.target.value);
		},
	},
};
</script>

<style>
.select {
	height: 100%;
	padding: 10px;
}
</style>
