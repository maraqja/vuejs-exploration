import axios from 'axios'

export const postModule = {
  state: () => ({
    posts: [],
    isPostsLoading: false,
    selectedSort: '',
    sortOptions: [
      // не изменяется, не делаем мутацию
      { value: 'title', name: 'По названию' },
      { value: 'body', name: 'По содержимому' }
    ],
    searchQuery: '',
    page: 1,
    limit: 10, // не изменяется, не делаем мутацию
    lastPage: 0
  }),
  getters: {
    // геттеры это по сути computed свойства
    sortedPosts(state) {
      return [...state.posts].sort((post1, post2) =>
        post1[state.selectedSort]?.localeCompare(post2[state.selectedSort])
      )
    },
    sortedAndFilteredPosts(state, getters) {
      // делаем computed свойство от computed свойства
      return getters.sortedPosts.filter((post) =>
        post.title.toLowerCase().includes(state.searchQuery.toLowerCase())
      )
    }
  },
  mutations: {
    setPosts(state, posts) {
      state.posts = posts
    },
    setIsPostsLoading(state, isLoading) {
      state.isPostsLoading = isLoading
    },
    setSelectedSort(state, sort) {
      state.selectedSort = sort
    },
    setSearchQuery(state, query) {
      state.searchQuery = query
    },
    setPage(state, page) {
      state.page = page
    },
    setLastPage(state, lastPage) {
      state.lastPage = lastPage
    }
  },
  actions: {
    async fetchPosts({ state, commit }) {
      // aciton принимает в себя объект контекста, включающий state, getters, dispatch (для вызова других action-ов), commit (для вызова мутаций), ...
      commit('setIsPostsLoading', true)
      try {
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/posts`,
          {
            params: {
              _page: state.page,
              _limit: state.limit
            }
          }
        )
        commit(
          'setLastPage',
          Math.ceil(response.headers['x-total-count'] / state.limit)
        )
        commit('setPosts', response.data)
      } catch (e) {
        alert(e)
      } finally {
        commit('setIsPostsLoading', false)
      }
    },
    async loadMorePosts({ commit, state }) {
      try {
        if (state.page === state.lastPage) return

        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/posts`,
          {
            params: {
              _page: state.page,
              _limit: state.limit
            }
          }
        )
        commit('setPage', state.page + 1)

        commit('setPosts', [...state.posts, ...response.data])
      } catch (e) {
        alert(e)
      }
    }
  },
  namespaced: true
}
