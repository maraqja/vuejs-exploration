<!-- В КОМПОНЕНТ В КАЧЕСТВЕ ПРОПСОВ ПЕРЕДАЕМ МАССИВ ПОСТОВ (ФЕТЧИМ ИХ В КОРНЕВОМ КОМПОНЕНТЕ APP)-->

<template>
  <div class="posts-list">
    <h3>Список пользователей</h3>
    <PostItem
      v-for="post in posts"
      :key="post.id"
      :post="post"
      @removePost="$emit('removePost', post)"
    ></PostItem>
  </div>
</template>

<script>
  import PostItem from '@/components/PostItem'
  export default {
    components: { PostItem },
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

<style scoped></style>
