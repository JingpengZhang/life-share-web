<template>
  <p class="text-3xl">失物招领</p>
    <div class="shadow rounded-lg shadow-slate-300 w-full p-5 md:p-8 mt-6 bg-white">
      <div class="flex items-center">
        <span class="text-gray-500 w-16 md:w-24">类型：</span>
        <div class="flex gap-3 md:gap-8">
          <router-link to="/lost/list/all" active-class="cate-active" class="cate-normal">
            全部
          </router-link>
          <router-link to="/lost/list/find" active-class="cate-active" class="cate-normal">
            招领启事
          </router-link>
          <router-link to="/lost/list/lost" active-class="cate-active" class="cate-normal">
            寻物启事
          </router-link>
        </div>
      </div>
    </div>
  
    <div class="mt-8">
      <router-view></router-view>
    </div>

</template>

<script>
export default {
};
</script>

<style lang="less" scoped>
</style>