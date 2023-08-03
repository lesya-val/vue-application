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
		<MyButton
			class="form__btn"
			@click="createPost">
			
			Создать
		</MyButton>
	</form>
</template>

<script>

export default {
	name: 'PostForm',
	components: {
	},
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

	.form__btn {
		align-self: flex-end;
	}
</style>