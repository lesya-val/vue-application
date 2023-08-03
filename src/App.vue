<template>
	<div class="app">
		<PostForm @create="createPost"/>
		<PostList :posts="posts"/>
	</div>
</template>

<script>

import PostForm from '@/components/PostForm.vue'
import PostList from '@/components/PostList.vue'

export default {
  name: 'App',
	components: {
		PostForm,
		PostList,
	},
  data() {
		return {
			posts: [
				{id: 1, title: 'JavaScript', body: 'Описание поста 1'},
				{id: 2, title: 'Python', body: 'Описание поста 2'},
				{id: 3, title: 'C++', body: 'Описание поста 3'},
			],
		}
	},
	methods: {
		createPost(post) {
			this.posts.push(post);
		}
	}
}
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
</style>