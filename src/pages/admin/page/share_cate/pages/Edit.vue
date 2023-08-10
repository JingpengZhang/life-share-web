<template>
  <card-with-line>
    <template #title> 编辑分类 </template>
    <template #funs>
      <button class="btn-white-sm" @click="toList()">返回列表</button>
    </template>
    <template #content>
      <!-- 表单 -->
      <div class="flex flex-col gap-4">
        <div class="flex items-center">
          <span class="text-slate-500 w-24 shrink-0">分类名称</span>
          <el-input
            v-model="name"
            size="large"
            placeholder="请输入分类名称，例如：美食"
          />
        </div>
        <div class="flex items-center">
          <span class="text-slate-500 w-24 shrink-0">主题色</span>
          <el-select
            v-model="color"
            class="w-full"
            placeholder="请选择分类主题色"
            size="large"
            @change="colorChange()"
          >
            <el-option
              v-for="item in colors"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div class="flex items-center">
          <span class="text-slate-500 w-24 shrink-0">预览</span>
          <div class="flex items-center gap-8">
            <div :class="colorBar"></div>
            <span :class="colorText">{{ name }}</span>
          </div>
        </div>
        <button class="btn-primary w-full lg:w-fit mt-8" @click="saveCate()">
          保存
        </button>
      </div>
    </template>
  </card-with-line>
</template>

<script>
import CardWithLine from "../../../../../components/CardWithLine.vue";
import { CATE_COLORS } from "../../../../../tools/constant";
import { ref } from "@vue/reactivity";
import router from "../../../../../router";
import {
  getShareCateInfo,
  saveShareCate,
  editShareCate,
} from "../../../../../api/share";
import { onMounted } from "@vue/runtime-core";
import { ElMessage } from "element-plus";
export default {
  props: {
    id: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    let name = ref("");
    let color = ref("");

    let colors = CATE_COLORS;

    let colorBar = ref("w-10 h-2 bg-orange-500 rounded-full");
    let colorText = ref("text-orange-500");

    const colorChange = () => {
      colorBar.value = "w-10 h-2 bg-" + color.value + "-500 rounded-full";
      colorText.value = "text-" + color.value + "-500";
    };

    const toList = () => {
      router.push("/admin/share_cate");
    };

    onMounted(() => {
      getShareCateInfo(props.id).then((result) => {
        name.value = result.data.NAME;
        color.value = result.data.COLOR;
        colorChange();
      });
    });

    const saveCate = () => {
      editShareCate(props.id, {
        name: name.value,
        color: color.value,
      }).then((result) => {
        ElMessage({
          message: "修改成功",
          type: "success",
        });
      });
    };

    return {
      toList,
      name,
      color,
      colors,
      colorChange,
      colorBar,
      colorText,
      saveCate,
    };
  },
  components: {
    CardWithLine,
  },
};
</script>

<style>
</style>