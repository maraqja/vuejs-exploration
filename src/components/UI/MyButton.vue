<template>
  <button class="btn">
    <slot></slot>
    <!--  вставляем содержимое тега в котором используем компонент -->
  </button>
</template>

<script>
  export default {}
</script>

<style scoped>
  .btn {
    padding: 10px 15px;
    background: none;
    color: teal;
    border: 1px solid teal;
  }
</style>
