<template>
  <card-with-line>
    <template #title> 增加分类 </template>
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
import { ref } from "@vue/reactivity";
import CardWithLine from "../../../../../components/CardWithLine.vue";
import { CATE_COLORS } from "../../../../../tools/constant";
import { saveShareCate } from "../../../../../api/share";
import { ElMessage } from "element-plus";
import router from "../../../../../router";
export default {
  setup() {
    let colors = ref(CATE_COLORS);
    let color = ref("orange");
    let name = ref("示例");

    let colorBar = ref("w-10 h-2 bg-orange-500 rounded-full");
    let colorText = ref("text-orange-500");

    const colorChange = () => {
      colorBar.value = "w-10 h-2 bg-" + color.value + "-500 rounded-full";
      colorText.value = "text-" + color.value + "-500";
      console.log(color.value);
    };

    const saveCate = () => {
      saveShareCate({
        name: name.value,
        color: color.value,
      }).then((result) => {
        ElMessage({
          message: "保存成功",
          type: "success",
        });
        color.value = "orange";
        name.value = "示例";
      });
    };

    const toList = () => {
      router.push("/admin/share_cate");
    };

    return {
      colors,
      color,
      name,
      colorBar,
      colorText,
      colorChange,
      saveCate,
      toList,
    };
  },
  components: {
    CardWithLine,
  },
};
</script>

<style>
</style>