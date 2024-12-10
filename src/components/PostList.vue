<!-- В КОМПОНЕНТ В КАЧЕСТВЕ ПРОПСОВ ПЕРЕДАЕМ МАССИВ ПОСТОВ (ФЕТЧИМ ИХ В КОРНЕВОМ КОМПОНЕНТЕ APP)-->

<template>
  <div class="post" v-for="{ id, title, body } in posts" :key="id">
    <div><strong>Название: </strong>{{ title }}</div>
    <div><strong>Описание: </strong>{{ body }}</div>
  </div>
</template>

<script>
  export default {
    props: {
      // ПРОПСЫ НЕЛЬЗЯ (по факту можно, но это очень бед практис) изменять в дочернем компоненте, они только читаемые
      // пропсы - это свойства, которые принимаются из родительского компонента
      posts: {
        type: Array, // тип пропса
        default: () => [], // значение по умолчанию
        required: true /// обязательный ли пропс
      }
    }
  }
</script>

<style scoped>
  .post {
    padding: 15px;
    border: 2px solid teal;
    margin-top: 15px;
  }
</style>
