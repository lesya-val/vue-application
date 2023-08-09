<template>
	<div class="app">
    <h1 class="app__title">Список постов</h1>
    <my-input
      v-model="searchQuery"
      placeholder="Поиск..."
    />
    <div class="app__edit">
      <MyButton
        @click="showDialog"
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
			:posts="sortedAndSearchedPosts"
			@remove="removePost"
      v-if="!isPostsLoading"
		/>
    <div v-else>Идет загрузка...</div>
    <div
        class="observer"
        ref="observer"
    >
    </div>
<!--    <div class="page__wrapper">-->
<!--      <div-->
<!--          v-for="pageNumber in totalPages"-->
<!--          :key="pageNumber"-->
<!--          class="page"-->
<!--          :class="{-->
<!--            'active-page': page === pageNumber-->
<!--          }"-->
<!--          @click="changePage(pageNumber)"-->
<!--      >-->
<!--        {{ pageNumber }}-->
<!--      </div>-->
<!--    </div>-->
	</div>
</template>

<script>

import PostForm from '@/components/PostForm.vue'
import PostList from '@/components/PostList.vue'
import MyDialog from "@/components/UI/MyDialog.vue";
import MyButton from "@/components/UI/MyButton.vue";
import axios from "axios";
import MySelect from "@/components/UI/MySelect.vue";
import MyInput from "@/components/UI/MyInput.vue";

export default {
  name: 'App',
	components: {
    MyInput,
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
      searchQuery: '',
      page: 1,
      limit: 10,
      totalPages: 0,
      sortOptions: [
        {value: 'title', name: 'По названию'},
        {value: 'body', name: 'По описанию'},
      ],
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
    // changePage(pageNumber) {
    //   this.page = pageNumber
    // },
    async fetchPosts() {
      const url = 'https://jsonplaceholder.typicode.com/posts'
      try {
        this.isPostsLoading = true
        const response = await axios.get(url, {
          params: {
            _page: this.page,
            _limit: this.limit,
          }
        })
        this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit)
        this.posts = response.data
      } catch (e) {
        alert('Ошибка!')
      } finally {
        this.isPostsLoading = false
      }
    },
    async loadMorePosts() {
      const url = 'https://jsonplaceholder.typicode.com/posts'
      try {
        this.page += 1
        const response = await axios.get(url, {
          params: {
            _page: this.page,
            _limit: this.limit,
          }
        })
        this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit)
        this.posts = [...this.posts, ...response.data]
      } catch (e) {
        alert('Ошибка!')
      }
    }
	},
  mounted() {
    this.fetchPosts()
    const options = {
      rootMargin: "0px",
      threshold: 1.0,
    }
    const callback = ((entries) => {
      if (entries[0].isIntersecting && this.page < this.totalPages) {
        this.loadMorePosts()
      }
    })
    const observer = new IntersectionObserver(callback, options)
    observer.observe(this.$refs.observer)
  },
  computed: {
    sortedPosts() {
      return [...this.posts].sort((post1, post2) =>
          post1[this.selectedSort]?.localeCompare(post2[this.selectedSort]))
    },
    sortedAndSearchedPosts() {
      return this.sortedPosts.filter(post => post.title.toLowerCase().includes(this.searchQuery))
    }
  },
  watch: {
    // page() {
    //   this.fetchPosts()
    // }
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

  .app__title {
    margin-bottom: 10px;
  }

  .app__edit {
    display: flex;
    justify-content: space-between;
    margin: 15px 0;
  }

  .page__wrapper {
    display: flex;
    gap: 10px;
    margin-top: 15px;
  }

  .page {
    padding: 10px;
    border: 1px solid #000000;
  }

  .active-page {
    border: 2px solid teal;
  }
</style>