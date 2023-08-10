<template>
  <div id="page" class="w-screen h-screen flex justify-center">
    <div class="flex flex-col items-center justify-center gap-2">
      <h1 id="status_code" class="text-9xl font-bold text-white font-sans">404</h1>
      <p class="text-3xl mt-8 text-blue-600">错误</p>
      <p class="text-base">访问的资源不存在！</p>
      <div class="mt-3 flex gap-8">
        <button id="back" class="shadow-lg hover:-translate-y-1 transition-all hover:shadow-none duration-500 shadow-blue-400 px-6 rounded-md text-white mt-8 py-2" @click="go()">返回首页</button>
      </div>
    </div>
  </div>
</template>

<script>
import router from "../../router";

export default {
  setup() {
    const go = () => {
      router.push("/home");
    };

    return {
      go,
    };
  },
};
</script>

<style lang="less" scoped>
#page {
  background-image: url("../../assets/imgs/status_bg.png");
  background-size: cover;
  background-position: center;
}

#status_code {
  text-shadow: 3px 3px 5px rgba(0, 0, 0, .2);
}

#back {
  background-image: linear-gradient(135deg, #43CBFF 10%, #9708CC 100%);
}
</style>