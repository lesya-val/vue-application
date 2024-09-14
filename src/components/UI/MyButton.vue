<template>
	<button class="btn">
		<slot></slot>
	</button>
</template>

<script>
/**
 * @file MyButton.vue
 * @brief Компонент для кнопки.
 *
 * Этот компонент представляет собой кнопку. В данном компоненте не реализованы дополнительные свойства или методы.
 */
export default {
	/**
	 * @property {string} name - Имя компонента.
	 */
	name: 'MyButton',
};
</script>

<style>
.btn {
	padding: 10px;
	border: 1px solid teal;
	background: transparent;
	color: teal;
}
</style>
