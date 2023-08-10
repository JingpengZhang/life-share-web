<template>
  <card>
    <template #title> 编辑分享 </template>
    <template #content>
      <!-- 表单 -->
      <div class="flex flex-col gap-4">
        <div class="flex items-center">
          <span class="w-24 text-slate-500 shrink-0">标题</span>
          <el-input v-model="title" size="large" placeholder="请输入标题" />
        </div>
        <div class="flex items-center">
          <span class="w-24 text-slate-500 shrink-0">分类</span>
          <el-select
            v-model="category"
            class="w-full"
            placeholder="请选择分类"
            size="large"
          >
            <el-option
              v-for="item in categories"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <!-- 封面选择 -->
        <span class="w-24 text-slate-500 shrink-0">封面</span>
        <div class="">
          <input
            type="file"
            id="headshot"
            class="sr-only"
            @change="changeImg($event)"
          />
          <label for="headshot">
            <div
              class="
                w-full
                h-96
                rounded-lg
                group
                overflow-hidden
                cursor-pointer
              "
            >
              <div
                class="w-full h-full flex relative justify-center items-center"
              >
                <i-add-pic theme="outline" size="24" />
                <img
                  :src="cover"
                  alt=""
                  class="h-96 w-full object-cover absolute top-0 left-0"
                />
              </div>
              <div
                class="
                  flex flex-col
                  gap-2
                  text-white
                  items-center
                  justify-center
                  w-full
                  h-96
                  bg-gray-700
                  group-hover:-translate-y-full
                  transition-all
                  duration-700
                  opacity-80
                "
              >
                <span class="">选择封面</span>
                <i-upload-two theme="outline" size="24" />
              </div>
            </div>
          </label>
        </div>
        <span class="w-24 text-slate-500 shrink-0">内容</span>
        <WEditor @contentChange="contentChange" :content="content"></WEditor>
        <button class="btn-primary w-full lg:w-fit" @click="saveEdit()">
          保存
        </button>
      </div>
    </template>
  </card>
</template>

<script>
import Card from "../../../components/Card.vue";
import WEditor from "../../../components/WEditor.vue";
import {
  getSelectCaregories,
  editShareCover,
  editShareData,
  editShare,
} from "../../../api/share";
import { ref, onMounted } from "vue";
import { getBase64 } from "../../../tools/functions";
import { ElMessage } from "element-plus";
import router from '../../../router';
export default {
  props: {
    id: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    // 富文本编辑器内容
    let content = ref("");
    // 富文本编辑器内容改变时的监听
    const contentChange = (value) => {
      content.value = value;
    };

    // 分类列表
    let categories = ref([]);
    // 选择的分类id
    let category = ref("");

    // 标题
    let title = ref("");

    // 分类
    let cover = ref("");
    let isChange = ref(false);

    const changeImg = (e) => {
      isChange.value = true;
      getBase64(e.target.files[0]).then((res) => {
        cover.value = res;
      });
    };

    const saveEdit = () => {
      editShare(props.id, {
        title: title.value,
        content: content.value,
        cate_id: category.value.value,
      }).then(() => {
        if (isChange.value) {
          editShareCover({
            id: props.id,
            cover: cover.value,
          }).then((result) => {
            ElMessage({
              message: "修改成功",
              type: "success",
            });
            router.push('/share/' + props.id)
          });
        } else {
          ElMessage({
            message: "修改成功",
            type: "success",
          });
          router.push('/share/' + props.id)
        }
      });
    };

    onMounted(() => {
      // 获取服务器分类列表
      getSelectCaregories().then((result) => {
        const { data } = result;
        categories.value = data;
      });
      // 初始化数据
      editShareData(props.id).then((result) => {
        title.value = result.data.TITLE;
        category.value = result.data.CATEGORY;
        cover.value = result.data.COVER;
        content.value = result.data.CONTENT;
      });
    });

    return {
      contentChange,
      categories,
      category,
      title,
      cover,
      content,
      changeImg,
      saveEdit,
    };
  },
  components: {
    Card,
    WEditor,
  },
};
</script>

<style>
</style>