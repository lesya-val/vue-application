<template>
	<div class="app">
    <h1>Список постов</h1>
    <div class="app__edit">
      <MyButton
        @click="showDialog"
        class="app__btn"
      >
        Создать пост
      </MyButton>
      <MySelect
        v-model="selectedSort"
        :options="sortOptions"
      />
    </div>
    <MyDialog v-model:show="dialogVisible">
      <PostForm
        @create="createPost"
      />
    </MyDialog>
		<PostList 
			:posts="sortedPosts"
			@remove="removePost"
      v-if="!isPostsLoading"
		/>
    <div v-else>Идет загрузка...</div>
	</div>
</template>

<script>

import PostForm from '@/components/PostForm.vue'
import PostList from '@/components/PostList.vue'
import MyDialog from "@/components/UI/MyDialog.vue";
import MyButton from "@/components/UI/MyButton.vue";
import axios from "axios";
import MySelect from "@/components/UI/MySelect.vue";

export default {
  name: 'App',
	components: {
    MySelect,
    MyButton,
    MyDialog,
		PostForm,
		PostList,
	},
  data() {
		return {
			posts: [],
      dialogVisible: false,
      isPostsLoading: false,
      selectedSort: '',
      sortOptions: [
        {value: 'title', name: 'По названию'},
        {value: 'body', name: 'По описанию'},
      ]
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
    },
    async fetchPosts() {
      const url = 'https://jsonplaceholder.typicode.com/posts?_limit=10'
      try {
        this.isPostsLoading = true
        const response = await axios.get(url)
        this.posts = response.data
      } catch (e) {
        alert('Ошибка!')
      } finally {
        this.isPostsLoading = false
      }
    }
	},
  mounted() {
    this.fetchPosts()
  },
  computed: {
    sortedPosts() {
      return [...this.posts].sort((post1, post2) =>
          post1[this.selectedSort]?.localeCompare(post2[this.selectedSort]))
    }
  },
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

  .app__edit {
    display: flex;
    justify-content: space-between;
  }

  .app__btn {
    margin: 15px 0;

  }
</style>