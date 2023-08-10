<template>
  <el-empty v-if="isEmpty" description="空空如也" />
  <div class="grid grid-cols-1 lg:grid-cols-3 mt-8 gap-y-5">
    <ListItem v-for="item in data" :key="item.id" :lost="item"></ListItem>
  </div>

  <!-- 加载更多 -->
  <div v-if="!isEmpty" class="w-full flex justify-center items-center mt-6">
    <button :disabled="noMore" class="btn-primary" @click="getData()">
      {{ noMore ? "没有更多数据了" : "加载更多" }}
    </button>
  </div>
</template>

<script>
import {getNumByType,getAllByType} from "../../../../api/lost";
import { onMounted, ref } from "vue";
import ListItem from "../../components/ListItem.vue";
export default {
  setup() {
    let data = ref([]);
    let noMore = ref(false);
    let current_page = ref(0);

    // 获取更多
    const getData = () => {
      current_page.value += 1;
      getAllByType('寻物',current_page.value).then((result) => {
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
      getNumByType('寻物')
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
    ListItem,
  },
};
</script>

<style>
</style>