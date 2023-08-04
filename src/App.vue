<template>
	<div class="app">
    <h1>Список постов</h1>
    <MyButton
      @click="showDialog"
      class="app__btn"
    >
      Создать пост
    </MyButton>
    <MyDialog v-model:show="dialogVisible">
      <PostForm
        @create="createPost"
      />
    </MyDialog>
		<PostList 
			:posts="posts"
			@remove="removePost"
		/>
	</div>
</template>

<script>

import PostForm from '@/components/PostForm.vue'
import PostList from '@/components/PostList.vue'
import MyDialog from "@/components/UI/MyDialog.vue";
import MyButton from "@/components/UI/MyButton.vue";

export default {
  name: 'App',
	components: {
    MyButton,
    MyDialog,
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
      dialogVisible: false,
		}
	},
	methods: {
		createPost(post) {
			this.posts.push(post);
      this.dialogVisible = false;
		},
		removePost(post) {
			this.posts = this.posts.filter(p => p.id !== post.id)
		},
    showDialog() {
      this.dialogVisible = true
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

  .app__btn {
    margin: 15px 0px;
  }
</style>