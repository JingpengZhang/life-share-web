<template>
  <div
    class="
      bg-white
      w-full
      rounded-xl
      overflow-hidden
      shadow-lg
      hover:shadow-2xl
      cursor-pointer
      transition-all
      duration-500
      hover:-translate-y-2
    "
    @click="detail()"
  >
    <div class="w-full h-56">
      <img class="w-full h-full object-cover" :src="share.COVER" alt="" />
    </div>
    <div class="w-full p-5 flex flex-col h-40 justify-between">
      <div class="">
        <!-- 分类 -->
        <div class="">
          <span :class="cate_class">{{
            share.CATE_NAME
          }}</span>
        </div>
        <!-- 标题 -->
        <p class="font-bold text-xl line-clamp-2 text-gray-800 mt-1">
          {{ share.TITLE }}
        </p>
      </div>

      <!-- 其他信息 -->
      <div class="text-gray-500 text-sm flex gap-1">
        <span>{{ share.CREATE_TIME }}</span>
        <span class="font-bold">·</span>
        <span>{{ share.AUTHOR }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import {onMounted, ref} from "vue";
import moment from "moment";
import router from "../../../router";
export default {
  name: "ListItem",
  props: {
    share: {
      type: Object,
      default: {
        ID: "",
        COVER: "",
        TITLE: "",
        CATE_NAME: "",
        CATE_COLOR:'',
        AUTHOR: "",
        CREATE_TIME: "",
      },
    },
  },
  setup(props) {
    let cate_class = ref('font-semibold text-sm text-orange-500')

    onMounted(() => {
      // 日期格式化
      props.share.CREATE_TIME = moment(props.share.CREATE_TIME).format(
        "M月D日"
      );
      cate_class.value = 'font-semibold text-sm text-'+props.share.CATE_COLOR+'-500'

    });

    // 浏览详情
    const detail = () => {
      router.push("/share/" + props.share.ID);
    };

    return {
      detail,cate_class
    };
  },
};
</script>

<style>
</style>