<script setup>
import { ref } from 'vue';
const pageTitle = ref('');
pageTitle.value = '';
</script>

<template>
  <router-view :title="pageTitle"></router-view>
</template>

<style scoped>

</style>
