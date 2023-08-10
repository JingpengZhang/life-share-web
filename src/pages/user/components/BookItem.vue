<template>
  <div class="flex gap-3 pb-3 border-b">
    <!-- 封面 -->
    <div class="h-24 w-16 overflow-hidden rounded ">
      <img :src="book.cover" alt="" class="coverImg">
    </div>
    <div class="flex flex-col justify-between">
      <div class="flex flex-col">
        <span class="font-semibold">{{book.name}}</span>
        <span class="text-sm">{{book.author}}</span>
      </div>
      <span class="text-sm text-slate-400">{{book.create_time}}</span>
    </div>
  </div>
</template>

<script>
import { onMounted } from 'vue'
import moment from 'moment'

export default {
  props:{
    book:{
      type:Object,
      default:{
        id:"",
        cover:'',
        name:'',
        author:'',
        create_time:''
      }
    }
  },
  setup(props){
    onMounted(()=>{
      props.book.create_time = moment(props.book.create_time).format('YYYY-MM-DD HH:mm:ss')
    })
  }
}
</script>

<style>

</style>