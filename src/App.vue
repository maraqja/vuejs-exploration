<template>
  <!-- тут пишем разметку компонента -->
  <div class="app">
    <h1>Страница с постами</h1>
    <MyButton @click="showDialog" style="margin: 15px 0">Создать пост</MyButton>
    <MyDialog v-model:show="dialogVisible">
      <PostForm @createdPost="addPost" />
    </MyDialog>
    <!-- передаем пропс в компонент PostForm -->
    <PostList v-if="!isPostsLoading" :posts="posts" @removePost="removePost" />
    <div v-else>Загрузка...</div>
  </div>
</template>

<script>
  // описываем логику компонента,
  // обязательно дефолтно экспортирует объект
  import PostList from '@/components/PostList.vue' // @ - alias для src
  import PostForm from '@/components/PostForm.vue'
  import axios from 'axios'
  export default {
    components: {
      PostList,
      PostForm
    },
    mounted() {
      this.fetchPosts()
    },
    data() {
      // метод data возвращает объект, в котором описываются свойства компонента
      return {
        dialogVisible: false,
        posts: [],
        isPostsLoading: false
      }
    },
    methods: {
      addPost(post) {
        this.posts.push(post)
        this.dialogVisible = false
      },
      removePost(post) {
        this.posts = this.posts.filter((p) => p.id !== post.id)
      },
      showDialog() {
        this.dialogVisible = true
      },
      async fetchPosts() {
        try {
          this.isPostsLoading = true

          const response = await axios.get(
            'https://jsonplaceholder.typicode.com/posts?_limit=10'
          )
          this.posts = response.data
        } catch (e) {
          alert(e)
        } finally {
          this.isPostsLoading = false
        }
      }
    }
  }
</script>

<style>
  /* описываем стили (scoped - только для этого компонента) */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  } /* классическое обнуление стилей (у браузеров есть дефолтные стили) */
  .app {
    padding: 20px;
  }
</style>
