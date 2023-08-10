<template>
  <div class="border rounded-md bg-white py-3">
    <div class="w-full px-6 h-12 flex items-center justify-between">
      <div class=""></div>
      <div class="flex h-full items-center">
        <!-- <button class="btn-primary" @click="toAdd()">增加</button> -->
      </div>
    </div>
    <!-- 表格 -->
    <table class="text-sm w-full text-left mt-3">
      <tr class="bg-blue-100 h-10">
        <th class="pl-6 w-fit">#</th>
        <th class="pl-6 w-fit">ID</th>
        <th class="pl-6 w-1/12">头像</th>
        <th class="pl-6 w-2/12">邮箱</th>
        <th class="pl-6 w-2/12">用户名</th>
        <th class="pl-6 w-2/12">手机号</th>
        <th class="pl-6 w-1/12">是否为管理员</th>
        <th class="pl-6 w-2/12">注册日期</th>
        <th class="pl-6 w-2/12">操作</th>
      </tr>
      <tr v-for="(item, index) in data" :key="item.ID" class="h-12 border-b">
        <td class="pl-6">{{ index + 1 }}</td>
        <td class="pl-6">{{ item.ID }}</td>
        <td class="pl-6">
          <div class="w-9 h-9 rounded-full overflow-hidden">
            <img :src="item.HEADSHOT" :alt="item.USERNAME" class="coverImg"/>
          </div>
        </td>
        <td class="pl-6">{{ item.EMAIL }}</td>
        <td class="pl-6">{{ item.USERNAME }}</td>
        <td class="pl-6">{{ item.PHONE }}</td>
        <td class="pl-6">
          <el-switch
              v-model="item.ADMIN"
              class="ml-2"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-value="1"
              inactive-value="0"
              active-text="是"
              inactive-text="否"
              inline-prompt
              @change="adminChange(item.ADMIN,item.ID)"
          />
        </td>
        <td class="pl-6">{{ item.CREATE_TIME }}</td>
        <td class="pl-6 h-full">
          <div class="h-full flex items-center gap-2">
            <router-link :to="'/user/' + item.ID + '/share'">
            <button class="btn-primary-plain">
              查看
            </button>
            </router-link>
            <button class="btn-danger-plain" @click="deleteShare(item.ID)">
              删除
            </button>
          </div>
        </td>
      </tr>
    </table>
  </div>
  <!-- 分页 -->
  <pagination
      class="mt-5 px-6"
      :pages="pages"
      :current_page="current_page"
      @changePage="changePage"
  ></pagination>
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
import {getAdminUserList, changeUserAdmin,getUserCount,deleteItem} from "../../../../api/user";
import moment from "moment";
import {ElMessage} from "element-plus";
import {onMounted,ref} from "vue";
import Pagination from "../../../../components/Pagination.vue";

export default {
  name: "Index",
  setup() {
    let data = ref([]);
    let current_page = ref(1);

    // 切换页面数据
    const changePage = (page) => {
      getAdminUserList(page).then((result) => {
        let preData = result.data;

        for (let i = 0; i < preData.length; i++) {
          preData[i].CREATE_TIME = moment(preData[i].CREATE_TIME).format(
              "YYYY-MM-DD HH:mm:ss"
          );
        }

        data.value = preData;
        current_page.value = page;
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
      getUserCount().then((result) => {
        count.value = result.data.count;
        pages_num.value = Math.ceil(count.value / 30);
        // 将页数存入数组
        for (let i = 1; i <= pages_num.value; i++) {
          pages.value[i - 1] = i;
        }
      });
      changePage(1);
    });

    // 改变 admin
    const adminChange = (admin, id) => {
      changeUserAdmin({
        id: id,
        admin: admin,
      }).then((result) => {
        ElMessage({
          message: "修改成功！",
          type: "success",
        });
      });
    };

    // 删除
    let dialogVisible = ref(false);
    let delete_id = ref();

    const deleteShare = (id) => {
      delete_id.value = id;
      dialogVisible.value = true;
    };

    const confirmDelete = () => {
      deleteItem(delete_id.value).then((result) => {
        dialogVisible.value = false;
        ElMessage({
          message: "删除成功",
          type: "success",
        });
        changePage(current_page.value);
      });
    };

    return {
      data,
      current_page,
      changePage,
      adminChange,
      pages,
      count,
      pages_num,
      dialogVisible,
      deleteShare,
      confirmDelete,
    }
  },
  components: {
    Pagination
  }
}
</script>

<style scoped>

</style>