<template>
  <div class="grid grid-cols-3 gap-y-5">
    <LostItem v-for="item in data" :key="item.ID" :lost="item" @deleteData="deleteData"></LostItem>
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
import LostItem from "@/pages/user_center/components/LostItem.vue";
import {getListByUserID,getUserLostCount} from "@/api/lost";
import {onMounted, ref} from "vue";
import {deleteItem} from "@/api/lost";
import {ElMessage} from "element-plus";
import Pagination from "@/components/Pagination.vue";

export default {
  name: "MyLost",
  setup() {
    let data = ref([])

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
      current_page.value = page;
    };

    let current_page = ref(1);
    onMounted(() => {
      // 获取用户分享总数量（分页用）
      getUserLostCount(localStorage.getItem("user_id")).then((result) => {
        count.value = result.data.count;
        pages_num.value = Math.ceil(count.value / 18);
        // 将页数存入数组
        for (let i = 1; i <= pages_num.value; i++) {
          pages.value[i - 1] = i;
        }
      });
      changePage(1);
    })

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
        changePage(current_page.value);
        dialogVisible.value = false;
      });
    };


    return {
      data, dialogVisible, deleteData, confirmDelete, pages,
      count,
      pages_num,
      changePage,
    }
  },
  components: {
    LostItem,Pagination
  }
}
</script>

<style scoped>

</style>