<template>
  <body class="app">
  <header class="app-header fixed-top">
    <MenuBar></MenuBar>
    <Sidebar></Sidebar>
  </header>
    <div class="app-wrapper">

      <div class="app-content pt-3 p-md-3 p-lg-4">
        <div class="container-xl">
          <router-view></router-view>
        </div><!--//container-fluid-->
      </div><!--//app-content-->
<Footer></Footer>
     <!--//app-footer-->

    </div>
  </body>



</template>

<script setup>
import MenuBar from "./MenuBar.vue";
import Sidebar from "./Sidebar.vue";
import Footer from "./Footer.vue";

const isLoggedIn = localStorage.getItem('token');





</script>

<style scoped>

</style>