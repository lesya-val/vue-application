<template>
	<div v-if="posts.length > 0">
		<h2>Список постов</h2>
		<PostItem 
			v-for="post in posts" 
			:key="post.id" 
			:post="post"
			@remove="$emit('remove', post)"
		/>
	</div>
	<h2 
		v-else
		class="post-list__empty">
		
		Список постов пуст!
	</h2>
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
	.post-list__empty {
		color: red;
	}
</style>