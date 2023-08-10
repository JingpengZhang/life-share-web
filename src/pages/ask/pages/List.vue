<template>
  <p class="text-3xl">问答中心</p>
  <el-empty v-if="isEmpty" description="空空如也" />
  <div class="grid grid-cols-4 mt-8 gap-5">
    <list-item v-for="item in data" :key="item.ID" :ask="item"></list-item>
  </div>

  <div v-if="!isEmpty" class="w-full flex justify-center items-center mt-8">
    <button :disabled="noMore" class="btn-primary" @click="getData()">
      {{ noMore ? "没有更多数据了" : "加载更多" }}
    </button>
  </div>
</template>

<script>
import ListItem from "@/pages/ask/components/ListItem.vue";
import { onMounted, ref } from "vue";
import { getAll, getAsksNum } from "@/api/ask";

export default {
  name: "List",
  setup() {
    let data = ref([]);
    let noMore = ref(false);
    let current_page = ref(0);

    // 获取更多
    const getData = () => {
      current_page.value += 1;
      getAll(current_page.value).then((result) => {
        data.value = data.value.concat(result.data);
        if (current_page.value === 1 && data.value.length === 0) {
          isEmpty.value = true;
        }
        if (data.value.length === dataCount.value) return (noMore.value = true);
      });
    };
    let dataCount = ref();

    let isEmpty = ref(false);

    onMounted(() => {
      getAsksNum()
        .then((result) => {
          dataCount.value = result.data.count;
        })
        .then(() => {
          // 获取数据
          getData();
        });
    });

    return {
      data,
      getData,
      noMore,isEmpty
    };
  },
  components: {
    ListItem,
  },
};
</script>

<style scoped>
</style>