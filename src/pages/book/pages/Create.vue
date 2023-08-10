<template>
  <div class="card">
    <h1 class="text-xl md:text-2xl text-center">发布推荐</h1>
    <div class="mt-5 flex flex-col gap-3">
      <div class="flex">
        <span class="w-20 md:w-24">封面：</span>
        <input
          @change="changeImg($event)"
          type="file"
          name=""
          id="pic"
          class="sr-only"
        />
        <label for="pic">
          <div class="w-20 md:w-40 h-32 md:h-60 upload-box">
            <span class="upload-text">点击此处</span>
            <img id="preImg" :src="book.pic" alt="" class="upload-img hidden" />
          </div>
        </label>
      </div>

      <div class="flex items-center">
        <span class="w-20 md:w-24">书名：</span>
        <input
          v-model="book.title"
          type="text"
          name=""
          class="input w-full md:w-64"
        />
      </div>
      <div class="flex items-center">
        <span class="w-20 md:w-24">作者：</span>
        <input
          v-model="book.author"
          type="text"
          name=""
          class="input w-full md:w-64"
        />
      </div>
      <div class="flex items-center">
        <span class="w-20 md:w-24">出版社：</span>
        <input
          v-model="book.press"
          type="text"
          name=""
          class="input w-full md:w-64"
        />
      </div>
      <div class="flex items-center">
        <span class="w-20 md:w-24">出版时间：</span>
        <el-date-picker
          v-model="book.publication_time"
          type="month"
          placeholder="选择月份"
        />
      </div>
      <div class="flex items-center">
        <span class="w-20 md:w-24">页数：</span>
        <el-input-number v-model="book.page_num" :min="1" :max="99999" />
      </div>
      <div class="flex items-center">
        <span class="w-20 md:w-24">ISBN：</span>
        <input
          type="text"
          name=""
          v-model="book.ISBN"
          class="input w-full md:w-64"
        />
      </div>

      <div class="flex flex-col gap-3 mt-3">
        <span>推荐语：</span>
        <textarea
          class="textarea"
          v-model="book.recommend"
          cols="30"
          rows="10"
          placeholder="请输入一段文字描述这本书吸引你的亮点吧"
        ></textarea>
      </div>

      <button
        :disabled="!isChange"
        class="btn-blue w-full md:w-24 mt-6"
        @click="submit()"
      >
        发布
      </button>
    </div>
  </div>
</template>

<script>
import { reactive,ref } from "@vue/reactivity";
import { createItem } from "../../../api/book";
import { getBase64 } from "../../../tools/functions";
import { ElMessage } from "element-plus";
import router from "../../../router";
export default {
  setup() {
    let book = reactive({
      pic: "",
      title: "",
      author: "",
      press: "",
      publication_time: "",
      page_num: 1,
      ISBN: "",
      recommend: "",
    });

    let isChange = ref(false);

    // 上传物品图
    const changeImg = (e) => {
      document.getElementById("preImg").classList.remove("hidden");
      isChange.value = true;
      getBase64(e.target.files[0]).then((res) => {
        book.pic = res;
      });
    };

    // 提交
    const submit = () => {
      createItem({
        pic: book.pic,
        title: book.title,
        author: book.author,
        press: book.press,
        publication_time: book.publication_time,
        page_num: book.page_num,
        ISBN: book.ISBN,
        recommend: book.recommend,
      }).then((result) => {
        ElMessage({ message: "发布成功", type: "success" });
        router.push("/book/" + result.insertId);
      });
    };

    return {
      book,
      submit,
      changeImg,
      isChange,
    };
  },
};
</script>

<style>
</style>