import { createApp } from 'vue'
import App from './App'
import components from '@/components/UI' // импортируем все UI-компоненты
import directives from './directives'
import router from './router/router'

const app = createApp(App)

// console.log(components) // массив с компонентами
components.forEach((component) => {
  // перебираем все компоненты и регистрируем их - теперь можем использовать их в template без импорта в script
  app.component(component.name, component)
})

directives.forEach((directive) => {
  app.directive(directive.name, directive)
})

app.use(router) // подключаем роутер
app.mount('#app') // указываем куда будет монтироваться в index.html (в див с id = app) наше SPA-приложение
