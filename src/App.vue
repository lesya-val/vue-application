<template>
	<div class="app">
		<h1 class="app__title">Список постов</h1>
		<my-input v-model="searchQuery" placeholder="Поиск..." />
		<div class="app__edit">
			<MyButton @click="showDialog"> Создать пост </MyButton>
			<MySelect v-model="selectedSort" :options="sortOptions" />
		</div>
		<MyDialog v-model:show="dialogVisible">
			<PostForm @create="createPost" />
		</MyDialog>
		<PostList
			:posts="sortedAndSearchedPosts"
			@remove="removePost"
			v-if="!isPostsLoading"
		/>
		<div v-else>Идет загрузка...</div>
		<div class="observer" ref="observer"></div>
		<!-- <div class="page__wrapper">
			<div
				v-for="pageNumber in totalPages"
				:key="pageNumber"
				class="page"
				:class="{
					'active-page': page === pageNumber,
				}"
				@click="changePage(pageNumber)"
			>
				{{ pageNumber }}
			</div>
		</div> -->
	</div>
</template>

<script>
import PostForm from '@/components/PostForm.vue';
import PostList from '@/components/PostList.vue';
import MyDialog from '@/components/UI/MyDialog.vue';
import MyButton from '@/components/UI/MyButton.vue';
import axios from 'axios';
import MySelect from '@/components/UI/MySelect.vue';
import MyInput from '@/components/UI/MyInput.vue';

/**
 * @file App.vue
 * @brief Главный компонент приложения, отображающий список постов.
 *
 * Этот файл содержит основной компонент приложения, который управляет
 * загрузкой, отображением, сортировкой и фильтрацией постов, а также
 * обеспечивает функциональность для создания новых постов.
 */

export default {
	name: 'App',

	/**
	 * Импортируемые дочерние компоненты.
	 */
	components: {
		MyInput,
		MySelect,
		MyButton,
		MyDialog,
		PostForm,
		PostList,
	},

	/**
	 * Данные компонента.
	 */
	data() {
		return {
			/** @property {Array} posts - Список постов, загружаемых с сервера */
			posts: [],
			/** @property {boolean} dialogVisible - Флаг, определяющий, отображается ли диалог создания поста */
			dialogVisible: false,
			/** @property {boolean} isPostsLoading - Флаг, указывающий на загрузку постов */
			isPostsLoading: false,
			/** @property {string} selectedSort - Выбранный тип сортировки постов */
			selectedSort: '',
			/** @property {string} searchQuery - Поисковый запрос для фильтрации постов */
			searchQuery: '',
			/** @property {number} page - Текущая страница постов для пагинации */
			page: 1,
			/** @property {number} limit - Лимит количества постов на странице */
			limit: 10,
			/** @property {number} totalPages - Общее количество страниц */
			totalPages: 0,
			/** @property {Array} sortOptions - Варианты сортировки постов */
			sortOptions: [
				{ value: 'title', name: 'По названию' },
				{ value: 'body', name: 'По описанию' },
			],
		};
	},

	methods: {
		/**
		 * Создает новый пост и добавляет его в список.
		 * @param {Object} post - Новый пост, который нужно добавить.
		 * @param {number} post.id - Уникальный идентификатор поста.
		 * @param {string} post.title - Название поста.
		 * @param {string} post.body - Содержимое поста.
		 */
		createPost(post) {
			this.posts.push(post);
			this.dialogVisible = false;
		},

		/**
		 * Удаляет пост из списка по его идентификатору.
		 * @param {Object} post - Пост, который нужно удалить.
		 */
		removePost(post) {
			this.posts = this.posts.filter((p) => p.id !== post.id);
		},

		/**
		 * Открывает диалог для создания нового поста.
		 */
		showDialog() {
			this.dialogVisible = true;
		},

		/**
		 * Загружает посты с сервера.
		 * Использует пагинацию для ограничения количества загружаемых постов.
		 * @return {Promise<void>} Возвращает промис, который разрешается после завершения загрузки.
		 * @throws {Error} Выводит сообщение об ошибке, если не удается загрузить посты.
		 */
		async fetchPosts() {
			const url = 'https://jsonplaceholder.typicode.com/posts';
			try {
				this.isPostsLoading = true;
				const response = await axios.get(url, {
					params: {
						_page: this.page,
						_limit: this.limit,
					},
				});
				this.totalPages = Math.ceil(
					response.headers['x-total-count'] / this.limit
				);
				this.posts = response.data;
			} catch (e) {
				alert('Ошибка при загрузке постов!');
				throw new Error('Ошибка при загрузке постов');
			} finally {
				this.isPostsLoading = false;
			}
		},

		/**
		 * Подгружает больше постов при достижении конца страницы.
		 */
		async loadMorePosts() {
			const url = 'https://jsonplaceholder.typicode.com/posts';
			try {
				this.page += 1;
				const response = await axios.get(url, {
					params: {
						_page: this.page,
						_limit: this.limit,
					},
				});
				this.totalPages = Math.ceil(
					response.headers['x-total-count'] / this.limit
				);
				this.posts = [...this.posts, ...response.data];
			} catch (e) {
				alert('Ошибка при загрузке постов!');
			}
		},
	},

	/**
	 * Метод, вызываемый после монтирования компонента.
	 * Выполняет начальную загрузку постов и устанавливает наблюдатель для подгрузки постов при прокрутке страницы.
	 */
	mounted() {
		/**
		 * Выполняет начальную загрузку постов
		 */
		this.fetchPosts();

		/**
		 * Настройки для наблюдателя
		 */
		const options = {
			rootMargin: '0px',
			threshold: 1.0,
		};

		/**
		 * Callback-функция для наблюдателя (IntersectionObserver), который загружает больше постов при пересечении наблюдаемого элемента.
		 * @param {Array} entries - Список наблюдаемых элементов
		 */
		const callback = (entries) => {
			if (entries[0].isIntersecting && this.page < this.totalPages) {
				this.loadMorePosts();
			}
		};

		/**
		 * Создание наблюдателя
		 */
		const observer = new IntersectionObserver(callback, options);
		observer.observe(this.$refs.observer);
	},

	computed: {
		/**
		 * Возвращает отсортированный список постов.
		 * Сортировка происходит на основе выбранного пользователем критерия (название или описание).
		 * @return {Array<Object>} Отсортированные посты.
		 */
		sortedPosts() {
			return [...this.posts].sort((post1, post2) =>
				post1[this.selectedSort]?.localeCompare(post2[this.selectedSort])
			);
		},

		/**
		 * Возвращает список постов, отфильтрованных по поисковому запросу и отсортированных по выбранному методу.
		 * @return {Array<Object>} Массив объектов постов. Каждый объект имеет свойства:
		 * - {number} id - Уникальный идентификатор поста.
		 * - {string} title - Название поста.
		 * - {string} body - Тело поста.
		 */
		sortedAndSearchedPosts() {
			return this.sortedPosts.filter((post) =>
				post.title.toLowerCase().includes(this.searchQuery)
			);
		},
	},

	watch: {
		// page() {
		//   this.fetchPosts()
		// }
	},
};
</script>

<style>
* {
	padding: 0;
	margin: 0;
	box-sizing: border-box;
}

.app {
	padding: 20px;
}

.app__title {
	margin-bottom: 10px;
}

.app__edit {
	display: flex;
	justify-content: space-between;
	margin: 15px 0;
}

.page__wrapper {
	display: flex;
	gap: 10px;
	margin-top: 15px;
}

.page {
	padding: 10px;
	border: 1px solid #000000;
}

.active-page {
	border: 2px solid teal;
}
</style>
