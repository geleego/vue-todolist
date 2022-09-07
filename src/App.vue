<template>
  <div id="app">
    <router-view />
    <window-confirm />
  </div>
</template>

<script>
import WindowConfirm from '@/components/todo/WindowConfirm.vue';
export default {
  name: 'App',
  components: {
    WindowConfirm
  }
}
</script>

<style>
</style>
