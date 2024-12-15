<template>
  <form @submit.prevent>
    <h4>Создание поста</h4>
    <!--  v-bind:value="newTitle" - связываем логику с  разметкой -->
    <!--  @input="inputTitle" - связываем разметку с логикой (при наборе в инпут меняются данные компонента) -->
    <MyInput v-focus v-model="post.title" type="text" placeholder="Название" />
    <MyInput v-model="post.body" type="text" placeholder="Описание" />
    <MyButton style="align-self: flex-end; margin-top: 15px" @click="createPost"
      >Создать</MyButton
    >
    <!-- все стили, директивы, события и тд передаются в компонент -->
  </form>
</template>

<script>
  export default {
    data() {
      return {
        post: {
          title: '',
          body: ''
        }
      }
    },
    watch: {
      // // при изменении title вызывается функция
      // 'post.title'(newValue) {
      //   console.log(newValue)
      // },
      post: {
        // при изменении post вызывается функция
        handler(newValue) {
          console.log(newValue)
        },
        deep: true // при изменении вложенных свойств вызывается функция handler
      }
    },
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
</style>
