<template>
  <button class="btn">
    <slot></slot>
    <!--  вставляем содержимое тега в котором используем компонент -->
  </button>
</template>

<script>
  export default {
    name: ['MyButton']
  }
</script>

<style scoped>
  .btn {
    padding: 10px 15px;
    background: none;
    color: teal;
    border: 1px solid teal;
    cursor: pointer;
  }
</style>
