<template>
  <div class="card">
    <h1 class="text-xl md:text-2xl text-center">编辑推荐</h1>
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
            <img :src="book.pic" alt="" class="upload-img" />
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

      <button class="btn-blue w-full md:w-24 mt-6" @click="submit()">
        发布
      </button>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from "@vue/reactivity";
import { BOOK } from "../../../tools/fake";
import { onMounted } from "vue";
import { getDetail, changePic, editItem } from "../../../api/book";
import { getBase64 } from "../../../tools/functions";
import { ElMessage } from "element-plus";
import router from "../../../router";
export default {
  props: { id: { type: String, default: 0 } },
  setup(props) {
    const id = props.id;

    let book = reactive({
      pic: BOOK.pic,
      title: BOOK.title,
      author: BOOK.author,
      press: BOOK.press,
      publication_time: BOOK.publication_time,
      page_num: BOOK.page_num,
      ISBN: BOOK.ISBN,
      recommend: BOOK.recommend,
    });

    let isPicChange = ref(false); // 判断封面是否被改变

    onMounted(() => {
      // 初始化数据
      getDetail(id).then((result) => {
        book.pic = result.book.pic;
        book.title = result.book.title;
        book.author = result.book.author;
        book.press = result.book.press;
        book.publication_time = result.book.publication_time;
        book.page_num = result.book.page_num;
        book.ISBN = result.book.ISBN;
        book.recommend = result.book.recommend;
      });
    });

    // 上传物品图
    const changeImg = (e) => {
      isPicChange.value = true;
      getBase64(e.target.files[0]).then((res) => {
        book.pic = res;
      });
    };

    // 提交
    const submit = () => {
      editItem(id, {
        title: book.title,
        author: book.author,
        press: book.press,
        publication_time: book.publication_time,
        page_num: book.page_num,
        ISBN: book.ISBN,
        recommend: book.recommend,
      }).then((result) => {
        if (!isPicChange.value) {
          ElMessage({ message: "修改成功", type: "success" });
          router.push("/book/" + id);
        } else {
          // 修改物品图
          changePic({
            id: id,
            pic: book.pic,
          }).then((result) => {
            ElMessage({ message: "修改成功", type: "success" });
            router.push("/book/" + id);
          });
        }
      });
    };

    return {
      book,
      changeImg,
      submit,
    };
  },
};
</script>

<style>
</style>