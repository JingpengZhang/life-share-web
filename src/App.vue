<template>
<div class="min-h-screen w-full bg-gray-100">
  <router-view></router-view>
</div>

</template>

<script>
export default {};
</script>

<style>
@font-face {
  font-family: lansui;
  src: url("./assets/fonts/Iansui0.91-Regular.ttf");
}
@font-face {
  font-family: caramel;
  src: url("./assets/fonts/OzCaramel.ttf");
}
@font-face {
  font-family: MiSans;
  src: url("./assets/fonts/MiSans-Regular.ttf");
}

body {
  font: 16px/1.5 MiSans,Helvetica Neue, Helvetica, Arial, Microsoft Yahei,
    Hiragino Sans GB, Heiti SC, WenQuanYi Micro Hei, sans-serif;
  color: #333;
  /* background-color: #f0f2f5; */
/*  background-color: #FFFFFF;*/
/*   background-color: #f7f8f9;*/
  position: relative;
}
</style>