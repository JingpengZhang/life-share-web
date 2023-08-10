<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 ">
    <AskItem v-for="item in data" :key="item.ID" :ask="item" @deleteData="deleteData"></AskItem>
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
import AskItem from "@/pages/user_center/components/AskItem.vue";
import Pagination from "@/components/Pagination.vue";
import {onMounted,ref} from "vue";
import {getUsersAsks,getUserAskCount,deleteItem} from "@/api/ask";
import {ElMessage} from "element-plus";

export default {
  name: "MyAsk",
  setup(){
    let data = ref([])
    let current_page = ref(1)

    // 分页数组
    let pages = ref([]);
    // 总条数
    let count = ref();
    // 计算需要的页数
    let pages_num = ref();
    // 切换页面数据
    const changePage = (page) => {
      getUsersAsks(localStorage.getItem("user_id"), page).then(
          (result) => {
            data.value = result.data;
          }
      );
      current_page.value = page;
    };

    onMounted(()=>{
      getUserAskCount(localStorage.getItem('user_id')).then(result=>{
        count.value = result.data.count;
        pages_num.value = Math.ceil(count.value / 12);
        // 将页数存入数组
        for (let i = 1; i <= pages_num.value; i++) {
          pages.value[i - 1] = i;
        }
      })
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
      data,
      current_page,
      pages,
      count,
      pages_num,
      changePage,
      dialogVisible,
      deleteData,
      confirmDelete,
    }
  },
  components:{
    AskItem,Pagination
  }
}
</script>

<style scoped>

</style>