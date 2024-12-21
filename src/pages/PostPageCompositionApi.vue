<template>
  <h1>{{ likes }}</h1>
  <button @click="addLike">add like</button>
  <!-- <div>
    <h1>Страница с постами</h1>
    <MyInput v-model="searchQuery" placeholder="Поиск..."></MyInput>
    <div class="app__btns">
      <MyButton @click="showDialog">Создать пост</MyButton>
      <MySelect v-model="selectedSort" :options="sortOptions"></MySelect>
    </div>

    <MyDialog v-model:show="dialogVisible">
      <PostForm @createdPost="addPost" />
    </MyDialog>
    <PostList
      v-if="!isPostsLoading"
      :posts="sortedAndFilteredPosts"
      @removePost="removePost"
    />
    <div v-intersection="loadMorePosts" class="observer"></div>
  </div> -->
</template>

<script>
  // описываем логику компонента,
  // обязательно дефолтно экспортирует объект
  //   import PostList from '@/components/PostList.vue' // @ - alias для src
  //   import PostForm from '@/components/PostForm.vue'
  import { ref } from 'vue'

  export default {
    components: {
      //   PostList,
      //   PostForm
    },

    data() {
      return {
        dialogVisible: false,

        sortOptions: [
          { value: 'title', name: 'По названию' },
          { value: 'body', name: 'По содержимому' }
        ]
      }
    },
    setup() {
      const likes = ref(0)

      const addLike = () => {
        likes.value++
      }
      return {
        likes,
        addLike
      }
    }
  }
</script>

<style>
  .app__btns {
    display: flex;
    justify-content: space-between;
    margin: 15px 0;
  }

  .page__wrapper {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-top: 15px;
  }

  .page {
    border: 1px solid black;
    padding: 10px;
    background: none;
    cursor: pointer;
  }

  .page--current {
    border: 2px solid teal;
  }

  .observer {
    height: 30px;
    background: green; /* цвет не нужен, просто чтобы отслеживать, что посты подгрузились */
  }
</style>
