<template>
  <div
      @click="go()"
      class="
      group
      w-full
      h-96
      overflow-hidden
      cursor-pointer
      rounded-xl
    "
  >
    <!-- 背景图 -->
    <img
        class="w-full h-full object-cover"
        :src="share.COVER"
        alt=""
    />
    <!-- 信息 -->
    <div
        class="
        absolute
        left-0
        bottom-0
        h-1/2
        bg-gradient-to-t
        from-black
        to-transparent
        w-full
        flex flex-col
        p-8
        justify-center
        gap-3
        group-hover:pb-20
        transition-all
        duration-500
           rounded-xl
      "
    >
      <!-- 标签 -->
      <div class="">
        <span class="font-semibold text-sm text-orange-600">{{ share.CATE_NAME }}</span>
      </div>
      <!-- 标题 -->
      <div class="text-white font-bold text-2xl">
        <p class="line-clamp-2">
          {{ share.TITLE }}
        </p>
      </div>
      <!-- 其他信息 -->
      <div class="text-white text-xs flex gap-1">
        <span>{{ share.CREATE_TIME }}</span>
        <span class="font-bold">·</span>
        <span>{{ share.AUTHOR }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import {onMounted} from "vue";
import moment from "moment";
import router from "@/router";

export default {
  name: "SlideItem",
  props: {
    share: {
      type: Object,
      default: {
        ID: "",
        COVER: '',
        TITLE: '',
        AUTHOR: '',
        CREATE_TIME: '',
        CATE_NAME: '',
        CATE_COLOR: '',
      }
    }
  },
  setup(props) {
    onMounted(() => {
      props.share.CREATE_TIME = moment(props.share.CREATE_TIME).format('YYYY年MM月DD日')
    })

    const go = () => {
      router.push('/share/' + props.share.ID)
    }

    return {
      go
    }
  }
};
</script>

<style>
</style>