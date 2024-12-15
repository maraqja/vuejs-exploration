export default {
  mounted(el, binding) {
    console.log(el, binding)

    // const { $data: componendData } = binding.instance

    const options = {
      rootMargin: '0px',
      threshold: 1.0
    }
    const callback = (entries) => {
      if (
        entries[0].isIntersecting
        // && componendData.page < componendData.lastPage
      ) {
        console.log(binding.instance.lastPage)
        binding.value() // заменяем this на binding и вызываем ту функциюю, которая передается в v-intersection
      }
    }
    const observer = new IntersectionObserver(callback, options)
    observer.observe(el) // заменяем ref на el
  },
  name: 'intersection'
}
