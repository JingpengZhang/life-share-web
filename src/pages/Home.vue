<template>
  <navigator></navigator>
  <div id="index" class="w-screen h-screen flex items-center justify-center">
   
  </div>
</template>

<script>
import Navigator from "../components/Navigator.vue";
export default {
  components: {
    Navigator
  },
};
</script>

<style lang="less" scoped>
#navigation {
  background-color: inherit;
  color: white;
}
#index {
  background-image: url("../assets/imgs/index_bg.jpg");
  background-size: 100% 100%;
}
</style>