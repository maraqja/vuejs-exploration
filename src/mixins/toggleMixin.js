// миксины позволяют выносить логику, которая повторяется во множестве компонентов
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },

  methods: {
    hideDialog() {
      // если кликнули на затемнение за модальным окном, то скрываем его
      this.$emit('update:show', false)
    }
  },
  mounted() {
    //  хук из миксины отрабаывает перед хуком компонента
    console.log('mixin mounted')
  }
}
