import axios from 'axios'
import { onMounted, ref } from 'vue'

// объявление переменных и логика по работе с ними находится в одном месте (в хуке или composable-функции)
export default function usePosts(limit) {
  const posts = ref([])
  const lastPage = ref(0)
  const isPostsLoading = ref(true)
  const fetching = async () => {
    try {
      isPostsLoading.value = true

      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/posts`,
        {
          params: {
            _page: 1,
            _limit: limit
          }
        }
      )
      lastPage.value = Math.ceil(response.headers['x-total-count'] / limit)
      posts.value = response.data
    } catch (e) {
      alert(e)
    } finally {
      isPostsLoading.value = false
    }
  }
  // можно использовать lifecycle хуки и computed, watched
  onMounted(fetching)
  return {
    posts,
    lastPage,
    isPostsLoading
  }
  //   computed()
  //   watched()
}
