<template>
  <div class="grid sm:grid-cols-2 md:grid-cols-3 gap-5 lg:grid-cols-4">
    <BookItem
        v-for="item in data"
        :key="item.id"
        :book="item"
        @deleteData="deleteData"
    >
    </BookItem>
  </div>
  <div class="mt-10">
    <pagination
        :current_page="1"
        :pages="pages"
        @changePage="changePage"
    ></pagination>
  </div>
  <!-- 删除对话框 -->
    <el-dialog v-model="dialogVisible" title="删除" width="80%">
      <span>确认删除此内容？该操作无法回复。</span>
      <template #footer>
        <span class="flex gap-2 justify-end">
          <button class="btn-white-sm" @click="dialogVisible = false">
            取消
          </button>
          <button class="btn-danger-sm" @click="confirmDelete()">确认</button>
        </span>
      </template>
    </el-dialog>
</template>

<script>
import BookItem from "@/pages/user_center/components/BookItem.vue";
import Pagination from "@/components/Pagination.vue";
import {onMounted, ref} from "vue";
import {getListByUserID, getUserCount,deleteItem} from "@/api/book";
import {ElMessage} from "element-plus";

export default {
  name: "MyBook",
  setup() {
    // 初始化数据
    let data = ref([]);
    // 分页数组
    let pages = ref([]);
    // 总条数
    let count = ref();
    // 计算需要的页数
    let pages_num = ref();
    // 切换页面数据
    const changePage = (page) => {
      getListByUserID(localStorage.getItem("user_id"), page).then(
          (result) => {
            data.value = result.data;
          }
      );
    };

    onMounted(() => {
      // 获取用户分享总数量（分页用）
      getUserCount(localStorage.getItem("user_id")).then((result) => {
        count.value = result.data.count;
        pages_num.value = Math.ceil(count.value / 12);
        // 将页数存入数组
        for (let i = 1; i <= pages_num.value; i++) {
          pages.value[i - 1] = i;
        }
      });
      changePage(1);
    });

    // 删除对话框
    let dialogVisible = ref(false);
    let deleteID = ref();
    const deleteData = (val) => {
      dialogVisible.value = true;
      deleteID.value = val;
    };
    const confirmDelete = () => {
      deleteItem(deleteID.value).then((result) => {
        ElMessage({
          message: "删除成功",
          type: "success",
        });
        changePage(1);
        dialogVisible.value = false;
      });
    };

    return {
      data,
      pages,
      count,
      pages_num,
      changePage,dialogVisible,confirmDelete,deleteData
    }

  },
  components: {
    BookItem,
    Pagination
  }
}
</script>

<style scoped>

</style>