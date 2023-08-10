<template>
  <div class="card">
    <p class="text-xl text-blue-600">{{ ask.SKETCH }}</p>
    <div class="flex mt-4 items-end gap-6">
      <p class="text-slate-400 text-sm">{{ ask.MAJOR }}</p>
      <div class="flex text-sm">
        <span class="w-16">发布时间</span>
        <span>{{ ask.CREATE_TIME }}</span>
      </div>
      <div class="flex text-sm" v-show="ask.UPDATE_TIME !== null">
        <span class="w-16">更新时间</span>
        <span>{{ ask.UPDATE_TIME }}</span>
      </div>
    </div>
    <!-- 内容 -->
    <div class="m-auto max-w-none py-6" :innerHTML="ask.QUESTION"></div>
    <button class="btn-primary-plain" @click="openAnswer()">回答</button>
  </div>

  <!-- 关于推荐者 -->
  <div class="mt-8 flex gap-12 w-full bg-white p-5 shadow rounded-lg">
    <router-link :to="'/user/' + ask.USER_ID + '/ask'">
      <!-- 头像 -->
      <div
        class="cursor-pointer w-24 h-24 shrink-0 rounded-full overflow-hidden"
      >
        <img class="coverImg" :src="ask.USER_HEADSHOT" alt="" />
      </div>
    </router-link>

    <!-- 其他信息 -->
    <div class="flex flex-col gap-3">
      <!-- 用户名 -->
      <router-link :to="'/user/' + ask.USER_ID + '/ask'">
        <span
          class="
            font-bold
            text-2xl
            cursor-pointer
            transition-all
            duration-500
            hover:text-blue-700
          "
          >{{ ask.USER_USERNAME }}</span
        >
      </router-link>

      <span class="text-sm text-slate-500">关于发起者</span>
      <!-- 个人介绍 -->
      <p class="text-sm text-slate-500 line-clamp-2">
        {{ ask.USER_INTRODUCTION }}
      </p>
      <!-- 查看所有分享 -->
      <router-link :to="'/user/' + ask.USER_ID + '/ask'">
        <span
          class="
            italic
            text-neutral-500 text-sm
            inline-block
            w-fit
            border-b
            cursor-pointer
          "
          >查看作者发起的所有问题({{ user_ask_count }})</span
        >
      </router-link>
    </div>
  </div>
  <!-- 回答 -->
  <CardWithLine :class="AnswerBoxShow ? 'mt-8' : 'mt-8 hidden'">
    <template #title> 你的回答 </template>
    <template #content>
      <el-input
        v-model="my_answer"
        :rows="8"
        type="textarea"
        placeholder="请输入你关于此问题的见解。"
      />
      <button class="btn-primary mt-4" @click="saveAnswer()">提交</button>
    </template>
  </CardWithLine>
  <!-- 回答 -->
  <CardWithLine class="mt-8">
    <template #title> 回答 </template>
    <template #content>
      <div class="flex flex-col gap-10 bg-white">
        <AnswerItem
          v-for="item in answers"
          :key="item.ID"
          :answer="item"
        ></AnswerItem>
      </div>
      <div class="w-full flex justify-center items-center mt-8">
        <button
          :disabled="noMore"
          class="btn-primary"
          @click="getAnswersData()"
        >
          {{ noMore ? "没有更多数据了" : "加载更多" }}
        </button>
      </div>
    </template>
  </CardWithLine>
</template>

<script>
import AnswerItem from "@/pages/ask/components/AnswerItem.vue";
import CardWithLine from "@/components/CardWithLine.vue";
import {
  getUserAskCount,
  getDetail,
  submitAnswer,
  getAsksAnwsers,
} from "@/api/ask";
import { onMounted, ref } from "vue";
import moment from "moment";
import { ElMessage } from "element-plus";

export default {
  name: "Content",
  props: {
    id: { type: String, default: "" },
  },
  setup(props) {
    const id = props.id;

    let ask = ref({});
    let answers = ref([]);
    let answers_current_page = ref(0);
    let noMore = ref(false);

    let user_ask_count = ref("");
    onMounted(() => {
      // 获得问题详情
      getDetail(id).then((result) => {
        ask.value = result.data;
        console.log( ask.value);
        ask.value.MAJOR = ask.value.MAJOR.substring(
          ask.value.MAJOR.lastIndexOf(" ") + 1
        );
        ask.value.CREATE_TIME = moment(ask.value.CREATE_TIME).format(
          "YYYY-MM-DD HH:mm:ss"
        );
        ask.value.UPDATE_TIME = moment(ask.value.UPDATE_TIME).format(
          "YYYY-MM-DD HH:mm:ss"
        );
        if (ask.value.UPDATE_TIME == 'Invalid date') {
          ask.value.UPDATE_TIME = "--";
        } else {
          ask.value.UPDATE_TIME = moment(ask.value.UPDATE_TIME).format(
            "YYYY-MM-DD HH:mm:ss"
          );
        }
        getUserAskCount(ask.value.USER_ID).then((result) => {
          user_ask_count.value = result.data.count;
        });
      });

      // 获取答案
      getAnswersData();
    });

    // 获取回答
    const getAnswersData = () => {
      answers_current_page.value += 1;
      getAsksAnwsers(id, answers_current_page.value).then((result) => {
        answers.value = answers.value.concat(result.data);
        if (result.data.length == 0) return (noMore.value = true);
      });
    };

    // 展开回答区域
    let AnswerBoxShow = ref(false);
    const openAnswer = () => {
      AnswerBoxShow.value = true;
    };

    // 参与回答
    let my_answer = ref("");

    let saveAnswer = () => {
      submitAnswer(id, {
        content: my_answer.value,
      }).then((result) => {
        ElMessage({
          message: "提交答案成功！",
          type: "success",
        });
        answers_current_page.value = 0;
        answers.value = [];
        getAnswersData();
        AnswerBoxShow.value = false;
      });
    };

    return {
      ask,
      user_ask_count,
      my_answer,
      saveAnswer,
      answers,
      noMore,
      getAnswersData,
      openAnswer,
      AnswerBoxShow,
    };
  },
  components: {
    AnswerItem,
    CardWithLine,
  },
};
</script>

<style scoped>
</style>