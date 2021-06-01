<template>
  <div id="app">
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, shrink-to-fit=no"
    />
    <link
      rel="stylesheet"
      href="https://use.fontawesome.com/releases/v5.5.0/css/all.css"
      integrity="sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU"
      crossorigin="anonymous"
    />
    <link rel="preconnect" href="https://fonts.gstatic.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" />
    <link
      href="https://fonts.googleapis.com/css2?family=Open+Sans&display=swap"
      rel="stylesheet"
    />
    <transition enter-active-class="animated fadeIn delay" leave-active-class="animated fadeOut delay" mode="out-in">
    <router-view />
    </transition>
  </div>
</template>
<script>
export default {
  name: "App",
  components: {},
};
</script>

<style>
@import "https://cdn.jsdelivr.net/npm/animate.css@3.5.1";

* {
  font-family: "Open Sans", sans-serif;
  box-sizing: border-box;
}
body{
   background-color: #f5f6fa;
}
.delay{
  animation-delay: 0.3s;
}
</style>
