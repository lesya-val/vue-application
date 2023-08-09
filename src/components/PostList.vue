<template>
	<div v-if="posts.length > 0">
    <transition-group name="posts-list">
      <PostItem
          v-for="post in posts"
          :key="post.id"
          :post="post"
          @remove="$emit('remove', post)"
      />
    </transition-group>
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
  .posts-list-item {
    display: inline-block;
    margin-right: 10px;
  }
  .posts-list-enter-active,
  .posts-list-leave-active {
    transition: all 0.5s ease;
  }
  .posts-list-enter-from,
  .posts-list-leave-to {
    opacity: 0;
    transform: translateX(100px);
  }
  .posts-list-move {
    transition: transform 0.5s ease;
  }
</style>