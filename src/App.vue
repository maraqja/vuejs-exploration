<template>
  <!-- тут пишем разметку компонента -->
  <div class="app">
    <PostForm @createdPost="addPost" />
    <!-- передаем пропс в компонент PostForm -->
    <PostList :posts="posts" />
  </div>
</template>

<script>
  // описываем логику компонента,
  // обязательно дефолтно экспортирует объект
  import PostList from '@/components/PostList.vue' // @ - alias для src
  import PostForm from '@/components/PostForm.vue'
  export default {
    components: {
      PostList,
      PostForm
    },
    data() {
      // метод data возвращает объект, в котором описываются свойства компонента
      return {
        posts: [
          { id: 1, title: 'Название 1', body: 'Описание 1' },
          { id: 2, title: 'Название 2', body: 'Описание 2' }
        ]
      }
    },
    methods: {
      addPost(post) {
        this.posts.push(post)
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
