<template>
  <div class="dialog" v-if="show === true" @click.stop="hideDialog">
    <!-- модификатор stop останавливает всплытие события и равносилен event.stopPropagation() -->
    <div @click.stop class="dialog__content">
      <slot></slot>
      <!-- в слот подставляется разметка из родительского компонента -->
    </div>
  </div>
</template>

<script>
  import toggleMixin from '@/mixins/toggleMixin'

  export default {
    name: 'MyDialog',
    mixins: [toggleMixin],
    mounted() {
      // хук компонента отрабатывает после хука миксин
      console.log('component mounted')
    }
  }
</script>

<style scoped>
  .dialog {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .dialog__content {
    background: white;
    border-radius: 12px;
    min-height: 50px;
    min-width: 300px;
    padding: 20px;
  }
</style>
