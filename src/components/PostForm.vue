<template>
	<form class="form" @submit.prevent>
		<h3>Создание поста</h3>
		<MyInput
			v-model="post.title"
			class="input"
			type="text"
			placeholder="Название"
		/>
		<MyInput
			v-model="post.body"
			class="input"
			type="text"
			placeholder="Описание"
		/>
		<MyButton class="form__btn" @click="createPost"> Создать </MyButton>
	</form>
</template>

<script>
/**
 * @file PostForm.vue
 * @brief Компонент формы для создания нового поста.
 *
 * Этот компонент предоставляет форму для ввода данных нового поста, таких как заголовок и содержимое,
 * и генерирует событие для добавления поста.
 */
export default {
	/**
	 * @property {string} name - Имя компонента.
	 */
	name: 'PostForm',

	/**
	 * @property {Object} components - Внутренние компоненты, используемые в PostForm.
	 */
	components: {},

	/**
	 * @property {Object} data - Локальные данные компонента.
	 * @return {Object} Объект с данными нового поста.
	 */
	data() {
		return {
			/**
			 * @property {Object} post - Объект данных для нового поста.
			 * @property {string} post.title - Заголовок поста.
			 * @property {string} post.body - Содержимое поста.
			 */
			post: {
				title: '',
				body: '',
			},
		};
	},

	methods: {
		/**
		 * Создает новый пост, присваивая ему уникальный идентификатор, и отправляет его через событие.
		 * После создания поста очищает форму.
		 */
		createPost() {
			// Присваивание уникального идентификатора посту.
			this.post.id = Date.now();

			// Генерация события создания поста.
			this.$emit('create', this.post);

			// Очищение формы после создания поста.
			this.post = {
				title: '',
				body: '',
			};
		},
	},
};
</script>

<style>
.form {
	display: flex;
	flex-direction: column;
	gap: 10px;
}

.form__btn {
	align-self: flex-end;
}
</style>
