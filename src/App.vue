<script setup>
import { ref } from 'vue';
import { onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const pageTitle = ref('');
pageTitle.value = '';

onMounted(() => {
  const lastVisitedRoute = localStorage.getItem("lastVisitedRoute");
  if (lastVisitedRoute) {
    router.push(lastVisitedRoute);
  }
});
</script>

<template>
  <router-view :title="pageTitle"></router-view>
</template>

<style scoped>

</style>
