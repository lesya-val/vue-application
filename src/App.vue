<template>
	<div class="app">
		<form class="form">
			<h4>Создание поста</h4>
			<input class="input" type="text" placeholder="Название">
			<input class="input" type="text" placeholder="Описание">
			<button class="btn" @click="createPost">Создать</button>
		</form>
		<div class="post" v-for="post in posts" :key="post.id" >
			<div><strong>Название: </strong>{{ post.title }}</div>
			<div><strong>Описание: </strong>{{ post.body }}</div>
		</div>
	</div>
</template>

<script>

export default {
  name: 'App',
  data() {
		return {
			posts: [
				{id: 1, title: 'JavaScript', body: 'Описание поста 1'},
				{id: 2, title: 'Python', body: 'Описание поста 2'},
				{id: 3, title: 'C++', body: 'Описание поста 3'},
			]
		}
	},
	methods: {
		createPost() {
			
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

	.post {
		padding: 15px;
		margin-top: 15px;
		border: 2px solid teal;
	}

	.form {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.input {
		width: 100%;
		padding: 10px;
		border: 1px solid teal;
	}

	.btn {
		padding: 10px;
		border: 1px solid teal;
		background: transparent;
		color: teal;
		align-self: flex-end;
	}
</style>