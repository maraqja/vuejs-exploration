<template>
  <NavigationBar></NavigationBar>
  <div class="app">
    <!-- сюда встраиваются компоненты, соответствующие адресу в URL -->
    <router-view></router-view>
  </div>
</template>

<script>
  import NavigationBar from './components/NavigationBar.vue'
  export default {
    components: { NavigationBar }
  }
</script>

<style>
  /* описываем стили (scoped - только для этого компонента) */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  } /* классическое обнуление стилей (у браузеров есть дефолтные стили) */
  .app {
    padding: 20px;
  }
</style>
