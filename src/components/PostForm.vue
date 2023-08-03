<template>
	<form class="form" @submit.prevent>
		<h4>Создание поста</h4>
		<input
			v-model="post.title"
			class="input" 
			type="text" 
			placeholder="Название"
		>
		<input 
			v-model="post.body"
			class="input" 
			type="text" 
			placeholder="Описание"
		>
		<button 
			class="btn"
			@click="createPost">
			Создать
		</button>
	</form>
</template>

<script>
export default {
	name: 'PostForm',
	data() {
		return {
			post: {
				title: '',
				body: '',
			}
		}
	},
	methods: {
		createPost() {
			this.post.id = Date.now();
			this.$emit('create', this.post);
			this.post = {
				title: '',
				body: '',
			}
		}
	}
}
</script>

<style>
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