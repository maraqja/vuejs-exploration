<!-- В КОМПОНЕНТ В КАЧЕСТВЕ ПРОПСОВ ПЕРЕДАЕМ МАССИВ ПОСТОВ (ФЕТЧИМ ИХ В КОРНЕВОМ КОМПОНЕНТЕ APP)-->

<template>
  <div v-if="posts.length > 0" class="posts-list">
    <h3>Список постов</h3>
    <TransitionGroup name="post-list">
      <PostItem
        v-for="post in posts"
        :key="post.id"
        :post="post"
        @removePost="$emit('removePost', post)"
      ></PostItem>
    </TransitionGroup>
  </div>
  <h2 v-else style="color: red">Список постов пуст</h2>
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

<style scoped>
  .post-list-item {
    display: inline-block;
    margin-right: 10px;
  }

  .post-list-enter-active, /* анимация появления */
  .post-list-leave-active {
    /* анимация исчезновения */
    transition: all 0.4s ease;
  }

  .post-list-move {
    /* анимация перемещения (при сортировке) */
    transition: transform 0.4s ease;
  }
</style>
