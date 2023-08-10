<template>
  <router-link :to="'/share/' + share.ID">
    <div class="w-full flex flex-col gap-4 border-b pb-3 cursor-pointer group">
      <div class="flex w-full justify-between items-center group-hover:-translate-x-1 transition-all duration-500">
        <p class="w-10/12 font-semibold line-clamp-1">{{ share.TITLE }}</p>
        <div class="w-2/12 flex items-center justify-end shrink-0">
          <span :class="cate_class">{{ share.CATE_NAME }}</span>
        </div>
      </div>
      <span
          class="text-sm text-slate-400 group-hover:-translate-x-1 transition-all duration-500">{{ share.CREATE_TIME }}</span>
    </div>
  </router-link>

</template>

<script>
import {onMounted,ref} from "vue";
import moment from "moment";

export default {
  name: "ShareItem",
  props: {
    share: {
      type: Object,
      default: {
        ID: "",
        TITLE: "",
        CATE_NAME: "",
        CATE_COLOR: '',
        CREATE_TIME: ''
      },
    },
  },
  setup(props, context) {

    let cate_class = ref('')
    onMounted(() => {
      props.share.CREATE_TIME = moment(props.share.CREATE_TIME).format('YYYY-MM-DD HH:mm:ss')
      cate_class.value = 'bg-'+ props.share.CATE_COLOR +'-500 text-white text-xs px-2 py-1 rounded'
    })

    return {
      cate_class
    };
  },
};
</script>

<style>
</style>