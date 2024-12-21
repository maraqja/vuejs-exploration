import { computed, ref } from 'vue'

export default function useSortedAndFilteredPosts(sortedPosts) {
  // ожидаем что sortedPosts - это ref, поэтому используем .value
  const searchQuery = ref('')
  const sortedAndFilteredPosts = computed(() =>
    sortedPosts.value.filter((post) =>
      post.title.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  )

  return {
    searchQuery,
    sortedAndFilteredPosts
  }
}
