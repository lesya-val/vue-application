<template>
	<div class="dialog" v-if="show" @click="hideDialog">
		<div @click.stop class="dialog__content">
			<slot></slot>
		</div>
	</div>
</template>

<script>
/**
 * @file MyDialog.vue
 * @brief Компонент для отображения диалогового окна.
 *
 * Этот компонент представляет диалоговое окно, которое может быть отображено или скрыто в зависимости от переданного значения.
 */
export default {
	/**
	 * @property {string} name - Имя компонента.
	 */
	name: 'MyDialog',

	/**
	 * @property {Object} props - Свойства, передаваемые компоненту.
	 */
	props: {
		/**
		 * @property {Boolean} show - Определяет, отображается ли диалоговое окно.
		 * Значение по умолчанию — `false`.
		 */
		show: {
			type: Boolean,
			default: false,
		},
	},

	methods: {
		/**
		 * Закрывает диалоговое окно, отправляя событие `update:show` с параметром `false`.
		 *
		 * @emit update:show - Событие, которое указывает родительскому компоненту, что диалоговое окно должно быть закрыто.
		 */
		hideDialog() {
			this.$emit('update:show', false);
		},
	},
};
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
