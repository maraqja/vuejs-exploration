<template>
  <!-- тут пишем разметку компонента -->
  <div>
    <h1>{{ $store.state.isAuth ? 'Авторизован' : 'Авторизуйтесь !' }}</h1>
    <h1>{{ $store.state.likes }} {{ $store.getters.doubleLikes }}</h1>

    <div>
      <MyButton @click="$store.commit('incrementLikes')">Лайк</MyButton>
      <MyButton @click="$store.commit('decrementLikes')">Дизлайк</MyButton>
    </div>

    <h1>Страница с постами</h1>
    <MyInput v-model="searchQuery" placeholder="Поиск..."></MyInput>
    <div class="app__btns">
      <MyButton @click="showDialog">Создать пост</MyButton>
      <MySelect v-model="selectedSort" :options="sortOptions"></MySelect>
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
    <!-- <div v-else>Загрузка...</div> -->
    <!-- Используем ref для получения доступа к DOM элементу -->
    <div v-intersection="loadMorePosts" class="observer"></div>

    <!-- <div class="page__wrapper">
      <button
        v-for="pageNumber in pagesToShow"
        :key="pageNumber"
        class="page"
        @click="changePage(pageNumber)"
        :class="{ 'page--current': pageNumber === page ? true : false }"
      >
        {{ pageNumber }}
      </button>
    </div> -->
  </div>
</template>

<script>
  // описываем логику компонента,
  // обязательно дефолтно экспортирует объект
  import PostList from '@/components/PostList.vue' // @ - alias для src
  import PostForm from '@/components/PostForm.vue'
  import axios from 'axios'

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
      sortedPosts() {
        return [...this.posts].sort((post1, post2) =>
          post1[this.selectedSort]?.localeCompare(post2[this.selectedSort])
        )
      },
      sortedAndFilteredPosts() {
        // делаем computed свойство от computed свойства
        return this.sortedPosts.filter((post) =>
          post.title.toLowerCase().includes(this.searchQuery.toLowerCase())
        )
      }
      // pagesToShow() {
      //   // 1. Получаем общее количество страниц
      //   const totalPages = this.lastPage

      //   // 2. Получаем текущую страницу
      //   const currentPage = this.page

      //   // 3. Создаем пустой массив для хранения страниц, которые нужно отобразить
      //   const pages = []

      //   // 4. Определяем диапазон страниц для отображения
      //   // Мы хотим отобразить 5 страниц, при этом имея возможность перемещаться вперед и назад, поэтому берем текущую страницу и добавляем/вычитаем 2 (в результате текущая страинца будет по центру)
      //   // Math.max(1, currentPage - 2) гарантирует, что мы не выйдем за пределы первой страницы
      //   // Math.min(totalPages, currentPage + 2) гарантирует, что мы не выйдем за пределы последней страницы
      //   const startPage = Math.max(1, currentPage - 2)
      //   const endPage = Math.min(totalPages, currentPage + 2)

      //   // 5. Заполняем массив страниц, которые нужно отобразить
      //   for (let i = startPage; i <= endPage; i++) {
      //     pages.push(i)
      //   }

      //   // 6. Возвращаем массив страниц, которые нужно отобразить
      //   return pages
      // }
    },
    watch: {
      // // при изменении страницы триггерим получение постов
      // page() {
      //   this.fetchPosts()
      // }
    },
    data() {
      // метод data возвращает объект, в котором описываются свойства компонента
      return {
        dialogVisible: false,
        posts: [],
        isPostsLoading: false,
        selectedSort: '',
        sortOptions: [
          { value: 'title', name: 'По названию' },
          { value: 'body', name: 'По содержимому' }
        ],
        searchQuery: '',
        page: 1,
        limit: 10,
        lastPage: 0 // вычисляем при помощи хедера x-total-count (это кол-во постов) из респонса первого запроса с пагинацией
      }
    },
    methods: {
      addPost(post) {
        this.posts.unshift(post)
        this.dialogVisible = false
      },
      removePost(post) {
        this.posts = this.posts.filter((p) => p.id !== post.id)
      },
      showDialog() {
        this.dialogVisible = true
      },
      async fetchPosts() {
        try {
          this.isPostsLoading = true

          const response = await axios.get(
            `https://jsonplaceholder.typicode.com/posts`,
            {
              params: {
                _page: this.page,
                _limit: this.limit
              }
            }
          )
          this.lastPage = Math.ceil(
            response.headers['x-total-count'] / this.limit
          )
          this.posts = response.data
        } catch (e) {
          alert(e)
        } finally {
          this.isPostsLoading = false
        }
      },
      async loadMorePosts() {
        try {
          if (this.page === this.lastPage) return // ге фетчим больше если последняя страница была получена

          this.page += 1

          const response = await axios.get(
            `https://jsonplaceholder.typicode.com/posts`,
            {
              params: {
                _page: this.page,
                _limit: this.limit
              }
            }
          )
          this.posts = [...this.posts, ...response.data] // добавляем новые посты к уже имеющимся (для бесконечной прокрутки)
        } catch (e) {
          alert(e)
        }
      }
      // changePage(pageNumber) {
      //   this.page = pageNumber
      // }
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
