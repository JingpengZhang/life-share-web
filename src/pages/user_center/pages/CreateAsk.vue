<template>
  <CardWithLine>
    <template #title>
      发起问题
    </template>
    <template #content>
      <div class="flex items-center">
        <span class="w-16 text-slate-500 shrink-0">简述</span>
        <el-input v-model="sketch" size="large" placeholder="请输入问题简要描述"/>
      </div>
      <WEditor class="mt-5" @contentChange="contentChange" :content="content"></WEditor>
      <button class="btn-primary mt-4 w-full lg:w-fit" @click="saveQ()">保存</button>
    </template>
  </CardWithLine>
</template>

<script>
import CardWithLine from "@/components/CardWithLine.vue";
import WEditor from "../../../components/WEditor.vue";
import {createItem} from "@/api/ask";
import {ref} from "vue";
import {ElMessage} from "element-plus";
import router from "@/router";

export default {
  name: "CreateAsk",
  setup() {
    let sketch = ref('')

    // 富文本编辑器内容
    let content = ref("");
    // 富文本编辑器内容改变时的监听
    const contentChange = (value) => {
      content.value = value;
    };

    // 保存
    const saveQ = () => {
      createItem({
        sketch:sketch.value,
        question: content.value
      }).then(result => {
        ElMessage({
          message: '保存成功，正在跳转详情页。',
          type: 'success'
        })
        router.push('/ask/' + result.data)
      })
    }

    return {
      content,
      contentChange,
      saveQ,sketch
    }
  },
  components: {
    CardWithLine, WEditor
  }
}
</script>

<style scoped>

</style>