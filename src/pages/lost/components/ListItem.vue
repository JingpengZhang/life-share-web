<template>
  <div
      class="border m-auto shadow-md gap-3 hover:-translate-y-1 transition-all duration-500 hover:shadow-xl hover:shadow-slate-200 shadow-slate-200 w-96 h-fit p-3 bg-white rounded-lg flex">
    <!--    配图-->
    <div class="w-40 shrink-0 h-40 rounded-lg overflow-hidden">
      <img :src="lost.PIC" alt="" class="coverImg">
    </div>
    <!--其他信息-->
    <div class="flex flex-col flex-auto justify-between">
      <div class="flex flex-col gap-2">
        <p class="font-black line-clamp-1">{{ lost.NAME }}</p>
        <div class="flex gap-4 items-center">
          <span :class="type_class">{{ lost.TYPE }}</span>
          <span class="text-xs text-slate-400">{{ lost.STATE }}</span>
        </div>
        <div class="text-sm flex">
          <span class="w-10 shrink-0 text-slate-400">地点</span>
          <p class="line-clamp-1">{{ lost.POSITION }}</p>
        </div>
        <div class="text-sm flex">
          <span class="w-10 shrink-0 text-slate-400">时间</span>
          <p class="line-clamp-1">{{ lost.CREATE_TIME }}</p>
        </div>
      </div>

      <div class="flex justify-end">
        <router-link :to="'/lost/detail/' + lost.ID">
          <button class="btn-primary-plain-sm" >详情</button>
        </router-link>
      </div>

    </div>
  </div>
</template>

<script>
import router from "@/router";
import moment from 'moment'
import {onMounted, ref} from "vue";

export default {
  name: "ListItem",
  props: {
    lost: {
      type: Object,
      default: {
        ID: '',
        PIC: '',
        NAME: '',
        TYPE: '',
        STATE: '',
        POSITION: '',
        CREATE_TIME: ''
      }
    }
  },
  setup(props) {
    let type_class = ref('')

    onMounted(() => {
      props.lost.CREATE_TIME = moment(props.lost.CREATE_TIME).format('YYYY年MM月DD日')
      if (props.lost.TYPE == '寻物') {
        type_class.value = 'text-xs bg-blue-600 px-2 py-1 rounded-md text-white'
      } else {
        type_class.value = 'text-xs bg-green-600 px-2 py-1 rounded-md text-white'
      }
    })

    return {
      type_class
    }

  }
}
</script>

<style scoped>

</style>