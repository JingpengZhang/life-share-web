<template>
  <div class="rounded-md shadow-lg relative group shadow-slate-300 overflow-hidden bg-white">
    <!-- 封面 -->
    <div class="w-full h-48 bg-yellow-300">
      <img :src="share.COVER" alt="" class="coverImg" />
    </div>

    <div class="p-4 bg-white">
      <!-- 标题 -->
      <h1 class="text-lg line-clamp-1 mt-2">{{ share.TITLE }}</h1>
      <div class="flex mt-5 items-end gap-3">
        <span :class="cate_class">{{ share.CATE_NAME }}</span>
        <span class="text-sm text-slate-400">{{share.CREATE_TIME}}</span>
      </div>
      <!-- 操作区 -->
      <div
          class="h-8 pr-2 pl-4 bg-black hidden group-hover:flex z-10 flex items-center justify-end gap-2 bg-white absolute top-0 right-0 rounded-bl-full">
        <router-link :to="'/share/'+share.ID">
          <button class="text-white hover:text-blue-700" title="查看">
            <i-link theme="outline" size="18"/>
          </button>
        </router-link>
        <button class="text-white hover:text-red-700" title="编辑" @click="editData()">
          <i-writing-fluently theme="outline" size="18"/>
        </button>
        <button class="text-white hover:text-red-700" title="删除" @click="deleteData()">
          <i-delete-one theme="outline" size="18"/>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import router from "../../../router";
import {ref,onMounted} from "vue";
import moment from "moment";
export default {
  name: "ShareItem",
  props: {
    share: {
      type: Object,
      default: {
        ID: "",
        COVER: "",
        TITLE: "",
        CATE_NAME:'',
        CATE_COLOR:'',
        CREATE_TIME:''
      },
    },
  },
  setup(props, context) {
    const viewContent = () => {
      router.push("/share/" + props.share.ID);
    };

    const deleteData = () => {
      context.emit("deleteData", props.share.ID);
    };

    const editData = () => {
      router.push("/user_center/editshare/" + props.share.ID);
    };

    let cate_class = ref('')

    onMounted(() => {
      props.share.CREATE_TIME = moment(props.share.CREATE_TIME).format('YYYY-MM-DD HH:mm:ss')
      cate_class.value = 'bg-'+ props.share.CATE_COLOR +'-500 text-white text-xs px-2 py-1 rounded'
    })

    return {
      viewContent,
      deleteData,
      editData,cate_class
    };
  },
};
</script>

<style>
</style>