<template>
	<div>
		<h3>Список постов</h3>
		<PostItem 
			v-for="post in posts" 
			:key="post.id" 
			:post="post"
		/>
	</div>
</template>

<script>

import PostItem from '@/components/PostItem.vue'

export default {
	name: 'PostList',
	components: {
		PostItem,
	},
	props: {
		posts: {
			type: Array,
			required: true,
		},
	},
}
</script>

<style>
	.post {
		padding: 15px;
		margin-top: 15px;
		border: 2px solid teal;
	}
</style>