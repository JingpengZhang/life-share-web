<template>
  <navigator></navigator>
  <div class="pt-24 page pb-24">
  <router-view></router-view>
  </div>
  <footers></footers>
</template>

<script>
import Navigator from "../../components/Navigator.vue";
import Footers from "../../components/Footer.vue";
export default {
  components: {
    Footers,Navigator
  },
};
</script>

<style lang="less" scoped>
.page {
  width: 1200px;
  margin: 0 auto;
  @media screen and (max-width: 768px) {
    width: 90%;
  }
}
</style>