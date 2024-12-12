<template>
  <!-- тут пишем разметку компонента -->
  <div class="app">
    <h1>Страница с постами</h1>
    <MyButton @click="showDialog" style="margin: 15px 0">Создать пост</MyButton>
    <MyDialog v-model:show="dialogVisible">
      <PostForm @createdPost="addPost" />
    </MyDialog>
    <!-- передаем пропс в компонент PostForm -->
    <PostList :posts="posts" @removePost="removePost" />
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
        dialogVisible: false,
        posts: [
          { id: 1, title: 'Название 1', body: 'Описание 1' },
          { id: 2, title: 'Название 2', body: 'Описание 2' }
        ]
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
