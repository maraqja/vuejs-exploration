<template>
  <!-- тут пишем разметку компонента -->
  <div class="app">
    <form @submit.prevent>
      <h4>Создание поста</h4>
      <!--  v-bind:value="newTitle" - связываем логику с  разметкой -->
      <!--  @input="inputTitle" - связываем разметку с логикой (при наборе в инпут меняются данные компонента) -->
      <input
        v-bind:value="newTitle"
        @input="newTitle = $event.target.value"
        class="input"
        type="text"
        placeholder="Название"
      />
      <input
        v-bind:value="newBody"
        @input="newBody = $event.target.value"
        class="input"
        type="text"
        placeholder="Описание"
      />
      <button class="btn" @click="createPost">Создать</button>
    </form>
    <div class="post" v-for="{ id, title, body } in posts" :key="id">
      <div><strong>Название: </strong>{{ title }}</div>
      <div><strong>Описание: </strong>{{ body }}</div>
    </div>
  </div>
</template>

<script>
  // описываем логику компонента,
  // обязательно дефолтно экспортирует объект
  export default {
    data() {
      // метод data возвращает объект, в котором описываются свойства компонента
      return {
        posts: [
          { id: 1, title: 'Название 1', body: 'Описание 1' },
          { id: 2, title: 'Название 2', body: 'Описание 2' }
        ],
        newTitle: '',
        newBody: ''
      }
    },
    methods: {
      createPost() {
        this.posts.push({
          id: Date.now(),
          title: this.newTitle,
          body: this.newBody
        })
        this.newTitle = this.newBody = '' // обнуляем
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
  .post {
    padding: 15px;
    border: 2px solid teal;
    margin-top: 15px;
  }
  form {
    display: flex;
    flex-direction: column;
  }
  .input {
    width: 100%;
    border: 1px solid teal;
    padding: 10px 15px;
    margin-top: 15px;
  }
  .btn {
    align-self: flex-end; /* чтобы прилипала к правому краю */
    margin-top: 15px;
    padding: 10px 15px;
    background: none;
    color: teal;
    border: 1px solid teal;
  }
</style>
