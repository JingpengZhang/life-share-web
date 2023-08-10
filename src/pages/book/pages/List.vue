<template>
  <div class="">
    <h1 class="text-3xl">好书推荐</h1>
    <el-empty v-if="isEmpty" description="空空如也"/>
    <div class="pt-3 grid grid-cols-3 md:grid-cols-4 gap-2 gap-y-8 mt-3">
      <list-item v-for="item in books" :key="item.id" :book="item"></list-item>
    </div>
    <div v-if="!isEmpty" class="w-full flex justify-center items-center mt-6">
      <button :disabled="noMore" class="btn-primary" @click="getData()">
        {{ noMore ? "没有更多数据了" : "加载更多" }}
      </button>
    </div>
  </div>
</template>

<script>
import ListItem from "../components/ListItem.vue";
import {getAll, getBooksNum} from "../../../api/book";
import {ref, onMounted} from "vue";

export default {
  setup() {
    let books = ref([]);
    let noMore = ref(false);
    let current_page = ref(0);

    // 获取更多
    const getData = () => {
      current_page.value += 1;
      getAll(current_page.value).then((result) => {
        books.value = books.value.concat(result.books);
        if (current_page.value === 1 && books.value.length === 0) {
          isEmpty.value = true;
        }
        if (books.value.length === dataCount.value) return (noMore.value = true);
      });
    };
    let dataCount = ref();

    let isEmpty = ref(false);

    onMounted(() => {
      getBooksNum()
          .then((result) => {
            dataCount.value = result.data.count;
          })
          .then(() => {
            // 获取数据
            getData();
          });
    });

    return {
      books,
      noMore,
      getData,isEmpty
    };
  },
  components: {
    ListItem,
  },
};
</script>

<style>
</style>