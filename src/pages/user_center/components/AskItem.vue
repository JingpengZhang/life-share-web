<template>
  <div
       class="rounded-lg h-60 bg-white group border shadow-lg shadow-slate-300 p-8 flex flex-col justify-between hover:-translate-y-1 transition-all duration-500">
    <!-- 标题 -->
    <p class="line-clamp-3 italic">{{ ask.SKETCH }}</p>
    <div class="flex flex-col gap-2">
      <span class="text-sm font-bold">{{ ask.USERNAME }}</span>
      <span class="text-xs text-slate-400">{{ ask.MAJOR }}</span>
      <span class="text-xs text-slate-300">{{ ask.CREATE_TIME }}</span>
    </div>
    <div
        class="h-8 pr-2 pl-4 bg-black hidden group-hover:flex z-10 flex items-center justify-end gap-2 bg-white absolute top-0 right-0 rounded-bl-full">
      <button class="text-white hover:text-blue-700" title="查看" @click="go()">
        <i-link theme="outline" size="18"/>
      </button>
      <button class="text-white hover:text-purple-700" title="编辑" @click="editData()">
        <i-writing-fluently theme="outline" size="18"/>
      </button>
      <button class="text-white hover:text-red-700" title="删除" @click="deleteData()">
        <i-delete-one theme="outline" size="18"/>
      </button>
    </div>
  </div>
</template>

<script>
import {onMounted} from "vue";
import moment from "moment";
import router from "@/router";

export default {
  name: "ListItem",
  props: {
    ask: {
      type: Object,
      default: {
        ID: '',
        SKETCH: '',
        USERNAME: '',
        MAJOR: '',
        CREATE_TIME: ''
      }
    }
  },
  setup(props,context) {
    const go = () => {
      router.push('/ask/' + props.ask.ID)
    }

    onMounted(() => {
      props.ask.MAJOR = props.ask.MAJOR.substring(props.ask.MAJOR.lastIndexOf(" ") + 1)
      props.ask.CREATE_TIME = moment(props.ask.CREATE_TIME).format("YYYY年MM月DD日")
    })

    const editData = () =>{
      router.push('/user_center/editask/' + props.ask.ID)
    }

    const deleteData = () => {
      context.emit("deleteData", props.ask.ID);
    };


    return {
      go,editData,deleteData
    }
  }
}
</script>

<style scoped>

</style>