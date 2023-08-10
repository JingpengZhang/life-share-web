<template>
  <div @click="to()"
       class="rounded-lg h-60 bg-white border cursor-pointer shadow-lg shadow-slate-300 p-8 flex flex-col justify-between hover:-translate-y-1 transition-all duration-500">
    <!-- 标题 -->
    <p class="line-clamp-3 italic">{{ ask.SKETCH }}</p>
    <div class="flex flex-col gap-2">
      <span class="text-sm font-bold">{{ ask.USERNAME }}</span>
      <span class="text-xs text-slate-400">{{ ask.MAJOR }}</span>
      <span class="text-xs text-slate-300">{{ ask.CREATE_TIME }}</span>
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
  setup(props) {
    const to = () => {
      router.push('/ask/' + props.ask.ID)
    }

    onMounted(() => {
      props.ask.MAJOR = props.ask.MAJOR.substring(props.ask.MAJOR.lastIndexOf(" ") + 1)
      props.ask.CREATE_TIME = moment(props.ask.CREATE_TIME).format("YYYY年MM月DD日")
    })

    return {
      to
    }
  }
}
</script>

<style scoped>

</style>