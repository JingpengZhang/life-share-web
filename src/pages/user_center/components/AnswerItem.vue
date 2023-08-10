<template>
  <div class="border group relative shadow-md shadow-slate-300 p-5 bg-white rounded-lg">
    <div class="flex gap-2 items-center">
      <span class="text-xs bg-blue-600 text-white px-2 py-1 rounded">{{ answer.USER_MAJOR }}</span><span
        class="text-slate-400 text-xs mr-2 font-thin">{{ answer.CREATE_TIME }}</span>
      <p class="font-bold line-clamp-1"><span class="text-slate-400 text-sm mr-2 font-thin">回复</span>{{
          answer.Q_SKETCH
        }}
      </p>
    </div>
    <p class="line-clamp-3 mt-4 text-sm text-neutral-500">{{ answer.CONTENT }}</p>
    <div
        class="h-8 pr-2 pl-4 bg-black hidden group-hover:flex z-10 flex items-center justify-end gap-2 bg-white absolute top-0 right-0 rounded-bl-full">
      <router-link :to="'/ask/'+answer.ASK_ID">
        <button class="text-white hover:text-blue-700" title="查看">
          <i-link theme="outline" size="18"/>
        </button>
      </router-link>

      <button class="text-white hover:text-red-700" title="删除" @click="deleteData()">
        <i-delete-one theme="outline" size="18"/>
      </button>
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
        ID:'',
        ASK_ID: '',
        USER_MAJOR: '',
        CREATE_TIME: '',
        Q_SKETCH: '',
        CONTENT: ''
      }
    }
  },
  setup(props,context) {
    onMounted(() => {
      props.answer.USER_MAJOR = props.answer.USER_MAJOR.substring(props.answer.USER_MAJOR.lastIndexOf(" ") + 1)
      props.answer.CREATE_TIME = moment(props.answer.CREATE_TIME).format('YYYY-MM-DD HH:mm:ss')
    })


    const deleteData = () => {
      context.emit("deleteData", props.answer.ID);
    };

    return {
      deleteData
    }
  }
}
</script>

<style scoped>

</style>