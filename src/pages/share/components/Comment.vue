<template>
  <div class="flex py-5 gap-5">
    <!-- 头像 -->
    <div class="shrink-0 w-12 h-12 overflow-hidden rounded-full cursor-pointer">
      <img :src="comment.USER_HEADSHOT" alt="" class="coverImg" />
    </div>
    <!-- 其他 -->
    <div class="w-full">
      <!-- 评论内容 -->
      <p class="text-gray-500">
        {{ comment.CONTENT }}
      </p>
      <!-- 用户名、日期以及回复按钮 -->
      <div class="mt-2 flex w-full justify-between items-center">
        <!-- 用户名、日期 -->
        <div class="flex gap-8 items-end">
          <span class="font-bold cursor-pointer">
            {{ comment.USER_USERNAME }}
          </span>
          <span class="text-sm text-neutral-500">
            {{ comment.CREATE_TIME }}
          </span>
        </div>
        <!-- 回复按钮 -->
        <button
          class="italic text-neutral-500 text-sm inline-block w-fit border-b"
          @click="reply()"
        >
          回复
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import { onMounted } from "@vue/runtime-core";
export default {
  name: "Comment",
  props: {
    comment: {
      type: Object,
      default: {
        ID: "",
        USER_HEADSHOT: "",
        CONTENT: "",
        USER_USERNAME: "",
        CREATE_TIME: "",
      },
    },
  },
  setup(props, context) {
    const reply = () => {
      context.emit("openReply", [props.comment.USER_USERNAME,props.comment.ID]);
    };

    onMounted(() => {
      props.comment.CREATE_TIME = moment(props.comment.CREATE_TIME).format(
        "YYYY-MM-DD HH:mm:ss"
      );
    });

    return {
      reply,
    };
  },
};
</script>

<style>
</style>