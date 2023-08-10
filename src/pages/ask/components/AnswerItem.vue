<template>
  <div class="w-full flex gap-3">
    <!-- 头像 -->
    <div class="w-16 h-16 overflow-hidden rounded-md shrink-0">
      <img :src="answer.USER_HEADSHOT" alt="" class="coverImg">
    </div>
    <!-- 右侧信息 -->
    <div class="flex flex-auto flex-col gap-2">
      <div class="flex justify-between items-center">
        <span class="font-semibold">{{ answer.USER_USERNAME }}</span>
        <span class="bg-blue-700 p-1 px-2 rounded-md text-xs text-white ">{{ answer.USER_MAJOR }}</span>
      </div>
      <p class="text-sm text-slate-700">
        {{ answer.CONTENT }}
      </p>
      <span class="text-xs text-slate-400">回复时间：{{ answer.CREATE_TIME }}</span>
    </div>
  </div>
</template>

<script>
import {onMounted} from "vue";
import moment from "moment";

export default {
  name: "AnswerItem",
  props: {
    answer: {
      type: Object,
      default: {
        USER_HEADSHOT: '',
        USER_USERNAME: '',
        USER_MAJOR: '',
        CONTENT: '',
        CREATE_TIME: ''
      }
    }
  },
  setup(props) {
    onMounted(() => {
      props.answer.USER_MAJOR = props.answer.USER_MAJOR.substring(props.answer.USER_MAJOR.lastIndexOf(" ") + 1)
      props.answer.CREATE_TIME = moment(props.answer.CREATE_TIME).format("YYYY-MM-DD HH:mm:ss")
    })
  }
}
</script>

<style scoped>

</style>