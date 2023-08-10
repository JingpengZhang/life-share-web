<template>
  <router-link :to="'/ask/' + answer.ASK_ID">
    <div class="w-full flex flex-col gap-4 border-b pb-3 cursor-pointer group">
      <div class="flex w-full justify-between items-center group-hover:-translate-x-1 transition-all duration-500">
        <div class="w-9/12 flex gap-2">
          <span class="text-slate-400">回复</span>
          <span class="font-semibold line-clamp-1">{{ answer.Q_SKETCH }}</span>
        </div>
        <div class="w-3/12 flex items-center justify-end shrink-0">
          <span class="px-2 py-1 text-xs text-white bg-blue-600 rounded-md">{{ answer.USER_MAJOR }}</span>
        </div>
      </div>
      <p class=" text-slate-400 text-sm line-clamp-1">{{answer.CONTENT}}</p>
      <span
          class="text-sm text-slate-400 group-hover:-translate-x-1 transition-all duration-500">{{
          answer.CREATE_TIME
        }}</span>
    </div>
  </router-link>
</template>

<script>
import {onMounted, ref} from "vue";
import moment from "moment";

export default {
  name: "AskItem",
  props: {
    answer: {
      type: Object,
      default: {
        ID: '',
        ASK_ID:'',
        Q_SKETCH: '',
        USER_MAJOR: '',
        CONTENT:'',
        CREATE_TIME: ''
      }
    }
  },
  setup(props){
    onMounted(() => {
      props.answer.CREATE_TIME = moment(props.answer.CREATE_TIME).format('YYYY-MM-DD HH:mm:ss')
      props.answer.USER_MAJOR = props.answer.USER_MAJOR.substring(props.answer.USER_MAJOR.lastIndexOf(" ") + 1)
    })
  }
}
</script>

<style scoped>

</style>