<template>
  <div class="border rounded-md bg-white py-3">
    <div class="w-full px-6 h-12 flex items-center justify-between">
      <div class=""></div>
      <div class="flex h-full items-center">
        <button class="btn-primary" @click="toAdd()">增加</button>
      </div>
    </div>
    <!-- 表格 -->
    <table class="text-sm w-full text-left mt-3">
      <tr class="bg-blue-100 h-10">
        <th class="pl-6 w-1/12">#</th>
        <th class="pl-6 w-1/12">ID</th>
        <th class="pl-6 w-3/12">分类名称</th>
        <th class="pl-6 w-2/12">主题色</th>
        <th class="pl-6 w-3/12">创建日期</th>
        <th class="pl-6 w-2/12">操作</th>
      </tr>
      <tr v-for="(item, index) in data" :key="item.ID" class="h-12 border-b">
        <td class="pl-6">{{ index + 1 }}</td>
        <td class="pl-6">{{ item.ID }}</td>
        <td class="pl-6">{{ item.NAME }}</td>
        <td class="pl-6">
          <div class="h-full flex items-center">
            <div :class="item.COLOR"></div>
          </div>
        </td>
        <td class="pl-6">{{ item.CREATE_TIME }}</td>
        <td class="pl-6 h-full">
          <div class="h-full flex items-center gap-2">
            <button class="btn-secondary-plain" @click="toEdit(item.ID)">
              编辑
            </button>
            <button class="btn-danger-plain" @click="deleteItem(item.ID)">
              删除
            </button>
          </div>
        </td>
      </tr>
    </table>
    <!-- 分页 -->
    <pagination
      class="mt-5 px-6"
      :pages="pages"
      :current_page="1"
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
import { ref } from "@vue/reactivity";
import {
  getCateList,
  deleteShareCate,
  getShareCateNum,
} from "../../../../../api/share";
import { onMounted } from "@vue/runtime-core";
import moment from "moment";
import router from "../../../../../router";
import { ElMessage } from "element-plus";
import Pagination from "../../../../../components/Pagination.vue";
export default {
  setup() {
    let data = ref([]);
    let current_page = ref(1);

    // 切换页面数据
    const changePage = (page) => {
      getCateList(page).then((result) => {
        let preData = result.data;

        for (let i = 0; i < preData.length; i++) {
          preData[i].CREATE_TIME = moment(preData[i].CREATE_TIME).format(
            "YYYY-MM-DD HH:mm:ss"
          );
          preData[i].COLOR =
            "w-10 h-2 bg-" + preData[i].COLOR + "-500 rounded-full";
        }
        data.value = preData;
      });
    };

    const toAdd = () => {
      router.push("/admin/share_cate/add");
    };

    // 删除
    let dialogVisible = ref(false);
    let delete_id = ref();

    const deleteItem = (id) => {
      delete_id.value = id;
      dialogVisible.value = true;
    };

    const confirmDelete = () => {
      deleteShareCate(delete_id.value).then((result) => {
        dialogVisible.value = false;
        ElMessage({
          message: "删除成功",
          type: "success",
        });
      });
    };

    // 分页
    let pages = ref([]);
    // 总条数
    let count = ref();
    // 计算需要的页数
    let pages_num = ref();

    onMounted(() => {
      // 获取用户分享总数量（分页用）
      getShareCateNum().then((result) => {
        count.value = result.data.count;
        pages_num.value = Math.ceil(count.value / 30);
        // 将页数存入数组
        for (let i = 1; i <= pages_num.value; i++) {
          pages.value[i - 1] = i;
        }
      });
      changePage(1);
    });

    // 去编辑
    const toEdit = (id) => {
      router.push("/admin/share_cate/edit/" + id);
    };

    return {
      data,
      toAdd,
      dialogVisible,
      deleteItem,
      confirmDelete,
      pages,
      current_page,
      changePage,
      toEdit,
    };
  },
  components: {
    Pagination,
  },
};
</script>

<style>
</style>