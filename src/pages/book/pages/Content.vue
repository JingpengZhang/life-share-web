<template>
  <div class="card">
    <div class="mt-4 md:h-60 flex flex-col lg:flex-row gap-4">
      <div class="w-20 md:w-40 shrink-0 h-32 md:h-60">
        <img :src="book.COVER" alt="" class="headshot" />
      </div>
      <div
        class="flex-auto flex flex-col h-full justify-between gap-4 lg:gap-0"
      >
        <span class="text-blue-600 text-xl"
          >书名：<span class="text-blue-600">{{ book.NAME }}</span></span
        >
        <span class="text-gray-500"
          >作者：<span class="text-gray-700">{{ book.AUTHOR }}</span></span
        >
        <span class="text-gray-500"
          >出版社：<span class="text-gray-700">{{ book.PRESS }}</span></span
        >
        <span class="text-gray-500"
          >出版时间：<span class="text-gray-700">{{
            book.PUBLICATION_TIME
          }}</span></span
        >
        <span class="text-gray-500"
          >页数：<span class="text-gray-700">{{ book.PAGE_NUM }}</span></span
        >
        <span class="text-gray-500"
          >ISBN：<span class="text-gray-700">{{ book.ISBN }}</span></span
        >
        <span class="text-gray-500"
          >推荐发布日期：<span class="text-gray-700">{{
            book.CREATE_TIME
          }}</span></span
        >
      </div>
    </div>
    <div class="mt-8">
      <span class="text-base text-blue-600">推荐语：</span>
      <div
        style="white-space: pre-wrap"
        class="w-full px-3 mt-2"
        v-html="book.RECOMMEND"
      ></div>
    </div>
  </div>
  <!-- 关于推荐者 -->
  <div class="mt-8 flex gap-12 w-full bg-white p-5 shadow rounded-lg">
    <!-- 头像 -->
    <router-link :to="'/user/' + book.USER_ID + '/book'">
      <div
        class="cursor-pointer w-24 h-24 shrink-0 rounded-full overflow-hidden"
      >
        <img class="coverImg" :src="book.USER_HEADSHOT" alt="" />
      </div>
    </router-link>
    <!-- 其他信息 -->
    <div class="flex flex-col gap-3">
      <!-- 用户名 -->
      <router-link :to="'/user/' + book.USER_ID + '/book'">
        <span
          class="
            font-bold
            text-2xl
            cursor-pointer
            transition-all
            duration-500
            hover:text-blue-700
          "
          >{{ book.USER_USERNAME }}</span
        >
      </router-link>

      <span class="text-sm text-slate-500">关于推荐者</span>
      <!-- 个人介绍 -->
      <p class="text-sm text-slate-500 line-clamp-2">
        {{ book.USER_INTRODUCTION }}
      </p>
      <!-- 查看所有分享 -->
      <router-link :to="'/user/' + book.USER_ID + '/book'">
        <span
          class="
            italic
            text-neutral-500 text-sm
            inline-block
            w-fit
            border-b
            cursor-pointer
          "
          >查看作者所有推荐({{ user_book_count }})</span
        >
      </router-link>
    </div>
  </div>
</template>

<script>
import { getDetail, getUserCount } from "@/api/book";
import { ref, onMounted } from "vue";
import moment from "moment";
export default {
  props: {
    id: { type: String, default: 1 },
  },
  setup(props) {
    const id = props.id;
    const book = ref({});

    let user_book_count = ref();

    onMounted(() => {
      getDetail(id)
        .then((result) => {
          let data = result.data;
          data.PUBLICATION_TIME = moment(data.PUBLICATION_TIME).format(
            "YYYY-MM"
          );
          data.CREATE_TIME = moment(data.CREATE_TIME).format(
            "YYYY-MM-DD HH:mm:ss"
          );
          book.value = data;
        })
        .then(() => {
          getUserCount(book.value.USER_ID).then((result) => {
            user_book_count.value = result.data.count;
          });
        });
    });

    return {
      book,
      user_book_count,
    };
  },
};
</script>

<style>
</style>