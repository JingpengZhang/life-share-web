<template>
  <div class="border bg-white rounded-md">
    <!-- 顶部 -->
    <div class="flex justify-between px-5 py-6 items-center">
      <!-- 左侧 -->
      <div class="">
        <span class="text-lg"> <slot name="title"></slot></span>
      </div>

      <!-- 右侧 -->
      <slot name="funs"></slot>
    </div>
    <!-- 内容 -->
    <div class="px-5 py-3 pb-10">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "Card",
};
</script>

<style>
</style>