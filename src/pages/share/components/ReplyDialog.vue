<template>
  <div :hidden="hidden" class="fixed top-0 left-0 h-screen w-screen z-40">
    <!-- 背景 -->
    <div
      class="absolute w-screen h-screen top-0 left-0 bg-black opacity-50"
    ></div>
    <!-- 弹窗 -->
    <div
      class="
        absolute
        w-1/2
        bg-white
        top-1/3
        left-1/2
        -translate-x-1/2
        rounded-md
      "
    >
      <!-- topbar -->
      <div class="w-full p-5 flex justify-between items-center">
        <!-- 标题信息 -->
        <div class="">
          <span>回复：</span><span class="font-semibold">{{ username }}</span>
        </div>
        <!-- 关闭按钮 -->
        <div
          class="
            text-gray-700
            hover:text-red-700
            cursor-pointer
            transition-all
            duration-500
          "
          @click="closeReply()"
        >
          <i-close-one class="fill-current" theme="filled" size="24" />
        </div>
      </div>
      <!-- 框 -->
      <div class="p-5 pt-0">
        <textarea class="textarea" v-model="reply_content"></textarea>
        <button class="btn-blue px-24 rounded-full mt-5" @click="reply()">
          发布
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { comment } from "../../../api/share";
export default {
  name: "ReplyDialog",
  props: {
    hidden: { type: Boolean, default: true },
    username: { type: String, default: "" },
    share_id: { type: String, default: "" },
    parent_id: { type: String, default: "" },
  },
  setup(props, context) {
    const closeReply = () => {
      context.emit("closeReply");
    };

    // 回复
    let reply_content = ref("");

    const reply = () => {
      comment(props.share_id, {
        parent_id: props.parent_id,
        content: reply_content.value,
      }).then((result) => {
        console.log(result);
      });
    };

    return {
      closeReply,
      reply,reply_content
    };
  },
};
</script>

<style>
</style>