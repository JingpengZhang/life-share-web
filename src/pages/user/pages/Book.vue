<template>
  <el-empty v-if="isEmpty" description="空空如也" />
  <div class="flex flex-col gap-4">
    <BookItem v-for="item in data" :key="item.id" :book="item"></BookItem>
  </div>

  <!-- 加载更多 -->
  <div v-if="!isEmpty" class="w-full flex justify-center items-center mt-6">
    <button :disabled="noMore" class="btn-primary" @click="getData()">
      {{ noMore ? "没有更多数据了" : "加载更多" }}
    </button>
  </div>
</template>

<script>
import BookItem from "@/pages/user/components/BookItem.vue";
import { onMounted, ref } from "vue";
import { getListByUserID, getUserCount } from "@/api/book";
export default {
  name: "Book",
  props: {
    id: { type: String, default: "" },
  },
  setup(props) {
    const id = props.id;
    let data = ref([]);
    let noMore = ref(false);
    let current_page = ref(0);

    // 获取更多
    const getData = () => {
      current_page.value += 1;
      getListByUserID(id, current_page.value).then((result) => {
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
      getUserCount(id)
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
      noMore,
      getData,
      isEmpty,
    };
  },
  components: {
    BookItem,
  },
};
</script>

<style scoped>
</style>