<template>
  <!-- тут пишем разметку компонента -->
  <div>
    <h1>Страница с постами</h1>
    <MyInput
      :modelValue="searchQuery"
      @update:modelValue="setSearchQuery"
      placeholder="Поиск..."
    ></MyInput>
    <div class="app__btns">
      <MyButton @click="showDialog">Создать пост</MyButton>
      <MySelect
        :modelValue="selectedSort"
        @update:modelValue="setSelectedSort"
        :options="sortOptions"
      ></MySelect>
    </div>

    <MyDialog v-model:show="dialogVisible">
      <PostForm @createdPost="addPost" />
    </MyDialog>
    <!-- передаем пропс в компонент PostForm -->
    <PostList
      v-if="!isPostsLoading"
      :posts="sortedAndFilteredPosts"
      @removePost="removePost"
    />
    <div v-else>Загрузка...</div>
    <!-- Используем ref для получения доступа к DOM элементу -->
    <div v-intersection="loadMorePosts" class="observer"></div>
  </div>
</template>

<script>
  // описываем логику компонента,
  // обязательно дефолтно экспортирует объект
  import PostList from '@/components/PostList.vue' // @ - alias для src
  import PostForm from '@/components/PostForm.vue'
  import { mapState, mapActions, mapGetters, mapMutations } from 'vuex'

  export default {
    components: {
      PostList,
      PostForm
    },
    mounted() {
      this.fetchPosts()
    },

    computed: {
      // computed вызывается каждый раз при изменении зависимостей (в данном случае posts и selectedSort)

      ...mapState({
        post: (state) => state.post.post,
        isPostsLoading: (state) => state.post.isPostsLoading,
        selectedSort: (state) => state.post.selectedSort,
        searchQuery: (state) => state.post.searchQuery,
        page: (state) => state.post.page,
        limit: (state) => state.post.limit,
        lastPage: (state) => state.post.lastPage,
        sortOptions: (state) => state.post.sortOptions
      }),
      ...mapGetters({
        sortedPost: 'post/sortedPost',
        sortedAndFilteredPosts: 'post/sortedAndFilteredPosts'
      })
    },
    data() {
      // метод data возвращает объект, в котором описываются свойства компонента
      return {
        dialogVisible: false
      }
    },
    methods: {
      // указываем какие мутации и action-ы из store мы будем использовать
      ...mapMutations({
        setPage: 'post/setPage',
        setSearchQuery: 'post/setSearchQuery',
        setSelectedSort: 'post/setSelectedSort'
      }),
      ...mapActions({
        loadMorePosts: 'post/loadMorePosts',
        fetchPosts: 'post/fetchPosts'
      }),
      addPost(post) {
        this.posts.unshift(post)
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
