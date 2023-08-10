<template>
  <p class="text-3xl">生活分享</p>
  <div class="grid grid-cols-1 md:grid-cols-3 w-full mt-8 gap-8">
    <list-slide class="md:col-span-2"></list-slide>
    <list-item class="m-auto" v-for="item in data" :key="item.id" :share="item"></list-item>
  </div>
  <!-- 加载更多 -->
  <div class="w-full flex justify-center items-center mt-6">
    <button :disabled="noMore" class="btn-primary" @click="getData()">
      {{ noMore ? "没有更多数据了" : "加载更多" }}
    </button>
  </div>
</template>

<script>
import ListItem from "../components/ListItem.vue";
import Category from "../components/Category.vue";
import ListSlide from "../components/Slide.vue";
import {getAll, getShareCount} from "../../../api/share";
import {onMounted, ref} from "vue";

export default {
  setup() {
    // 本页数据
    let data = ref([]);
    let noMore = ref(false);
    let current_page = ref(0)

    // 获取更多
    const getData = () => {
      current_page.value += 1;
      getAll(current_page.value).then((result) => {
        data.value = data.value.concat(result.data);
        if (data.value.length === dataCount.value) return (noMore.value = true);
      });
    };

    let dataCount = ref();

    onMounted(() => {
      getShareCount().then((result) => {
        dataCount.value = result.data.count
      }).then(() => {
        // 获取数据
        getData()
      })
    });

    return {
      data, getData, noMore
    };
  },
  components: {
    ListItem,
    Category,
    ListSlide,
  },
};
</script>

<style lang="less" scoped>
</style>