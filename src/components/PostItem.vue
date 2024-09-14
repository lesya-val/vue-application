<template>
	<div class="post">
		<div>
			<div><strong>Название: </strong>{{ post.title }}</div>
			<div><strong>Описание: </strong>{{ post.body }}</div>
		</div>
		<div>
			<MyButton @click="$emit('remove', post)"> Удалить </MyButton>
		</div>
	</div>
</template>

<script>
/**
 * @file PostItem.vue
 * @brief Компонент для отображения отдельного поста.
 *
 * Этот компонент принимает объект поста через prop и используется для отображения
 * одного элемента в списке постов.
 */
export default {
	/**
	 * @property {string} name - Имя компонента.
	 */
	name: 'PostItem',

	/**
	 * @property {Object} components - Внутренние компоненты, используемые в PostItem.
	 */
	components: {},

	/**
	 * @property {Object} props - Свойства, передаваемые в компонент.
	 */
	props: {
		/**
		 * @property {Object} post - Объект поста для отображения.
		 * @required
		 */
		post: {
			type: Object,
			required: true,
		},
	},
};
</script>

<style>
.post {
	padding: 15px;
	margin-top: 15px;
	border: 2px solid teal;
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 15px;
}
</style>
