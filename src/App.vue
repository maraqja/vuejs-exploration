<template>
  <!-- тут пишем разметку компонента -->
  <div class="app">
    <h1>Страница с постами</h1>
    <MyInput v-model="searchQuery" placeholder="Поиск..."></MyInput>
    <div class="app__btns">
      <MyButton @click="showDialog">Создать пост</MyButton>
      <MySelect v-model="selectedSort" :options="sortOptions"></MySelect>
    </div>

    <MyDialog v-model:show="dialogVisible">
      <PostForm @createdPost="addPost" />
    </MyDialog>
    <!-- передаем пропс в компонент PostForm -->
    <PostList
      v-if="!isPostsLoading"
      :posts="sortedAndFilteredPosts"
      @removePost="removePost"
    />
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

    computed: {
      // computed вызывается каждый раз при изменении зависимостей (в данном случае posts и selectedSort)
      sortedPosts() {
        return [...this.posts].sort((post1, post2) =>
          post1[this.selectedSort]?.localeCompare(post2[this.selectedSort])
        )
      },
      sortedAndFilteredPosts() {
        // делаем computed свойство от computed свойства
        return this.sortedPosts.filter((post) =>
          post.title.toLowerCase().includes(this.searchQuery.toLowerCase())
        )
      }
    },
    // watch: {
    //   // сортируем с помощью watched
    //   selectedSort(newValue) {
    //     // при изменении selectedSort вызывается функция
    //     this.posts.sort((post1, post2) => {
    //       return post1[newValue]?.localeCompare(post2[newValue])
    //     })
    //   }
    // },
    data() {
      // метод data возвращает объект, в котором описываются свойства компонента
      return {
        dialogVisible: false,
        posts: [],
        isPostsLoading: false,
        selectedSort: '',
        sortOptions: [
          { value: 'title', name: 'По названию' },
          { value: 'body', name: 'По содержимому' }
        ],
        searchQuery: ''
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
  .app__btns {
    display: flex;
    justify-content: space-between;
    margin: 15px 0;
  }
</style>
