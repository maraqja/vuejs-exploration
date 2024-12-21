<template>
  <div class="navbar">
    <div @click="$router.push('/')">VUE 3 EXPLORATION</div>
    <div class="navbar__btns">
      <MyButton @click="$router.push('/posts')">Посты</MyButton>
      <MyButton @click="$router.push('/store')">Store</MyButton>
      <MyButton @click="$router.push('/about')">About</MyButton>
      <MyButton @click="$router.push('/composition')">Composition</MyButton>
      <!-- <router-link to="/posts">Посты</router-link>
      <router-link to="about">About</router-link> -->
    </div>
  </div>
</template>

<script>
  export default {}
</script>

<style scoped>
  .navbar {
    height: 50px;
    background-color: lightgray;
    box-shadow: 2px 2px 4px gray;
    display: flex;
    align-items: center;
    padding: 0 15px;
  }

  .navbar__btns {
    margin-left: auto;
    display: flex;
    gap: 15px;
  }
</style>
