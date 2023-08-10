<template>
  <div class="pt-24 page pb-12">
    <div class="w-1050 px-8 m-auto">
      <!-- 头部 -->
      <div class="flex gap-5 justify-between">
        <!-- 标题 -->
        <input
          v-model="title"
          class="
            h-8
            border
            rounded-md
            focus:outline-none
            bg-gray-50
            px-3
            flex-auto
          "
          type="text"
          name=""
          id=""
        />
        <!-- 分类 -->
        <el-select v-model="category" placeholder="选择分类">
          <el-option
            v-for="item in categories"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <!-- 发布 -->
        <button class="btn-blue h-8 px-12" @click="saveBlog()">发布</button>
      </div>
      <!-- 封面图 -->
      <input
        @change="changeImg($event)"
        type="file"
        name=""
        id="pic"
        class="sr-only"
      />
      <label for="pic">
        <div class="w-full mt-8 h-48 md:h-96 upload-box">
          <span class="upload-text">点击此处上传封面</span>
          <img id="preImg" :src="cover" alt="" class="upload-img hidden" />
        </div>
      </label>

      <WEditor class="mt-8" @contentChange="contentChange"></WEditor>
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import WEditor from "../../../components/WEditor.vue";
import { getSelectCaregories, saveShare } from "../../../api/share";
import { onMounted } from "vue";
import { getBase64 } from "../../../tools/functions";
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

    onMounted(() => {
      // 获取服务器分类列表
      getSelectCaregories().then((result) => {
        const { data } = result;
        categories.value = data;
      });
    });

    // 发表
    const saveBlog = () => {
      saveShare({
        title: title.value,
        content: content.value,
        cover: cover.value,
        cate_id: category.value,
      }).then((result) => {
        console.log(result);
      });
      console.log(content.value);
    };

    return {
      contentChange,
      saveBlog,
      categories,
      category,
      title,
      changeImg,
      isChange,
      cover,
    };
  },
  components: {
    WEditor,
  },
};
</script>

<style lang="less" scoped>
.page {
  width: 100%;
  margin: 0 auto;
  background-color: #ffffff;
  @media screen and (max-width: 768px) {
    width: 100%;
  }
}
.w-e-toolbar {
  z-index: 2 !important;
}
</style>