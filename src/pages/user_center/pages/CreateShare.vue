<template>
  <CardWithLine>
    <template #title> 发表分享 </template>
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
                border
              "
            >
              <div
                class="w-full h-full flex relative justify-center items-center"
              >
                <i-add-pic theme="outline" size="24" />
                <img
                  id="preImg"
                  :src="cover"
                  alt=""
                  class="h-96 w-full object-cover absolute top-0 left-0 hidden"
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
        <button
          :disabled="!isChange"
          class="btn-primary w-full lg:w-fit"
          @click="saveBlog()"
        >
          保存
        </button>
      </div>
    </template>
  </CardWithLine>
</template>

<script>
import CardWithLine from "../../../components/CardWithLine.vue";
import WEditor from "../../../components/WEditor.vue";
import { getSelectCaregories, saveShare } from "../../../api/share";
import { ref, onMounted } from "vue";
import { getBase64 } from "../../../tools/functions";
import { ElMessage } from "element-plus";
import router from "../../../router";
export default {
  setup() {
    // 分享标题
    let title = ref("");

    // 是否上传了封面
    let isChange = ref(false);

    // 分享封面
    let cover = ref("");
    const changeImg = (e) => {
      document.getElementById("preImg").classList.remove("hidden");
      isChange.value = true;
      getBase64(e.target.files[0]).then((res) => {
        cover.value = res;
      });
    };

    // 分类列表
    let categories = ref([]);
    // 选择的分类id
    let category = ref("");

    onMounted(() => {
      // 获取服务器分类列表
      getSelectCaregories().then((result) => {
        const { data } = result;
        categories.value = data;
      });
    });

    // 富文本编辑器内容
    let content = ref("");
    // 富文本编辑器内容改变时的监听
    const contentChange = (value) => {
      content.value = value;
    };

    // 发表
    const saveBlog = () => {
      saveShare({
        title: title.value,
        content: content.value,
        cover: cover.value,
        cate_id: category.value,
      }).then((result) => {
        ElMessage({
          message: "保存成功，正在跳转到详情页",
          type: "success",
        });
        router.push("/share/" + result.insertId);
      });
    };

    return {
      categories,
      changeImg,
      title,
      category,
      contentChange,
      saveBlog,
      cover,
      isChange,
    };
  },
  components: {
    CardWithLine,
    WEditor,
  },
};
</script>

<style>
</style>