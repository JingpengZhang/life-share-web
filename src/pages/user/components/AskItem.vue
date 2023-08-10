<template>
  <router-link :to="'/ask/' + ask.ID">
    <div class="w-full flex flex-col gap-4 border-b pb-3 cursor-pointer group">
      <div class="flex w-full justify-between items-center group-hover:-translate-x-1 transition-all duration-500">
        <div class="w-9/12 flex gap-2">
          <span class="font-semibold line-clamp-1">{{ ask.SKETCH }}</span>
        </div>
        <div class="w-3/12 flex items-center justify-end shrink-0">
          <span class="px-2 py-1 text-xs text-white bg-blue-600 rounded-md">{{ ask.MAJOR }}</span>
        </div>
      </div>
      <span
          class="text-sm text-slate-400 group-hover:-translate-x-1 transition-all duration-500">{{
          ask.CREATE_TIME
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
    ask: {
      type: Object,
      default: {
        ID: '',
        SKETCH: '',
        MAJOR: '',
        CREATE_TIME: ''
      }
    }
  },
  setup(props){
    onMounted(() => {
      props.ask.CREATE_TIME = moment(props.ask.CREATE_TIME).format('YYYY-MM-DD HH:mm:ss')
      props.ask.MAJOR = props.ask.MAJOR.substring(props.ask.MAJOR.lastIndexOf(" ") + 1)
    })
  }
}
</script>

<style scoped>

</style>