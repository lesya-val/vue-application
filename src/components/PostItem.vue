<template>
	<div class="post">
		<div>
			<div><strong>Название: </strong>{{ post.title }}</div>
			<div><strong>Описание: </strong>{{ post.body }}</div>
		</div>
		<div>
			<MyButton
			@click="$emit('remove', post)">
			
			Удалить
		</MyButton>
		</div>
	</div>
</template>

<script>


export default {
	name: 'PostItem',
	components: {
		
	},
	props: {
		post: {
			type: Object,
			required: true,
		}
	}
}
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