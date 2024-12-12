<template>
  <form @submit.prevent>
    <h4>Создание поста</h4>
    <!--  v-bind:value="newTitle" - связываем логику с  разметкой -->
    <!--  @input="inputTitle" - связываем разметку с логикой (при наборе в инпут меняются данные компонента) -->
    <input
      v-model="post.title"
      class="input"
      type="text"
      placeholder="Название"
    />
    <input
      v-model="post.body"
      class="input"
      type="text"
      placeholder="Описание"
    />
    <MyButton style="align-self: flex-end; margin-top: 15px" @click="createPost"
      >Создать</MyButton
    >
    <!-- все стили, директивы, события и тд передаются в компонент -->
  </form>
</template>

<script>
  import MyButton from './UI/MyButton.vue'
  export default {
    data() {
      return {
        post: {
          title: '',
          body: ''
        }
      }
    },
    components: { MyButton },
    methods: {
      createPost() {
        this.post.id = Date.now() // генерируем id, все остальное берем из формы
        this.$emit('createdPost', this.post) // эммитим событие в родительский компонент (передаем название события(по этому названию подпишемся в родителе) и сам пейлоад)
        this.post = { title: '', body: '' } // очищаем форму
      }
    }
  }
</script>

<style>
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
</style>
