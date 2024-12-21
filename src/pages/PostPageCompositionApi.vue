<template>
  <div>
    <h1>Страница с постами</h1>
    <MyInput v-model="searchQuery" placeholder="Поиск..."></MyInput>
    <div class="app__btns">
      <MyButton @click="showDialog">Создать пост</MyButton>
      <MySelect v-model="selectedSort" :options="sortOptions"></MySelect>
    </div>

    <MyDialog v-model:show="dialogVisible">
      <PostForm />
    </MyDialog>
    <PostList v-if="!isPostsLoading" :posts="sortedAndFilteredPosts" />
  </div>
</template>

<script>
  // import PostList from '@/components/PostList.vue'
  import PostForm from '@/components/PostForm.vue'

  import usePosts from '@/hooks/usePosts'
  import useSortedPosts from '@/hooks/useSortedPosts'
  import useSortedAndFilteredPosts from '@/hooks/useSortedAndFilteredPosts'

  export default {
    components: {
      // PostList,
      PostForm
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
    methods: {
      showDialog() {
        this.dialogVisible = true
      }
    },
    setup() {
      const { posts, lastPage, isPostsLoading } = usePosts(10)
      const { selectedSort, sortedPosts } = useSortedPosts(posts)
      const { searchQuery, sortedAndFilteredPosts } =
        useSortedAndFilteredPosts(sortedPosts)
      return {
        posts,
        lastPage,
        isPostsLoading,
        selectedSort,
        sortedPosts,
        searchQuery,
        sortedAndFilteredPosts
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
