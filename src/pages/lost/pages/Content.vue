<template>
  <!-- 详细信息 -->
  <div class="card">
    <div class="flex flex-col gap-4">
      <span class="text-blue-600 text-xl">{{ lost.NAME }}</span>
      <div class="flex gap-3 items-center border-b pb-5">
        <span :class="type_class">{{ lost.TYPE }}</span>
        <span class="text-sm text-slate-400">{{ lost.STATE }}</span>
        <span class="text-sm"
          ><span class="text-slate-400">发布于：</span
          >{{ lost.CREATE_TIME }}</span
        >
      </div>
      <div class="flex flex-col lg:flex-row gap-8 lg:gap-5 mt-8">
        <div class="w-64 h-64 m-auto shrink-0 rounded-lg overflow-hidden">
          <img :src="lost.PIC" alt="" class="coverImg" />
        </div>
        <div class="flex-auto flex flex-col justify-between gap-4">
          <div class="flex flex-col gap-4">
            <div class="flex items-center">
              <span class="w-32 text-slate-500 shrink-0">丢失/拾到地点</span>
              <p>{{ lost.POSITION }}</p>
            </div>
            <div class="flex items-center">
              <span class="w-32 text-slate-500 shrink-0">事件描述</span>
              <p>{{ lost.DESCRIPTION }}</p>
            </div>
          </div>
          <div class="flex flex-col lg:flex-row gap-4 lg:gap-8">
            <div class="flex items-center">
              <span class="w-32 lg:w-20 text-slate-500 shrink-0">联系人</span>
              <p>{{ lost.LINKMAN }}</p>
            </div>
            <div class="flex items-center">
              <span class="w-32 lg:w-20 text-slate-500 shrink-0">联系方式</span>
              <p>{{ lost.LINK_WAY }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- 关于推荐者 -->
  <div class="mt-8 flex gap-12 w-full bg-white p-5 shadow rounded-lg">
    <!-- 头像 -->
    <router-link :to="'/user/' + lost.USER_ID + '/lost'">
      <div
        class="cursor-pointer w-24 h-24 shrink-0 rounded-full overflow-hidden"
      >
        <img class="coverImg" :src="lost.USER_HEADSHOT" alt="" />
      </div>
    </router-link>

    <!-- 其他信息 -->
    <div class="flex flex-col gap-3">
      <!-- 用户名 -->
      <router-link :to="'/user/' + lost.USER_ID + '/lost'">
        <span
          class="
            font-bold
            text-2xl
            cursor-pointer
            transition-all
            duration-500
            hover:text-blue-700
          "
          >{{ lost.USER_USERNAME }}</span
        >
      </router-link>

      <span class="text-sm text-slate-500">关于发起者</span>
      <!-- 个人介绍 -->
      <p class="text-sm text-slate-500 line-clamp-2">
        {{ lost.USER_INTRODUCTION }}
      </p>
      <!-- 查看所有分享 -->
      <router-link :to="'/user/' + lost.USER_ID + '/lost'">
        <span
          class="
            italic
            text-neutral-500 text-sm
            inline-block
            w-fit
            border-b
            cursor-pointer
          "
          >查看作者所有失物招领启事({{ user_lost_count }})</span
        >
      </router-link>
    </div>
  </div>
</template>

<script>
import { getDetail, getUserLostCount } from "../../../api/lost";
import { ref, onMounted } from "vue";
import moment from "moment";

export default {
  props: {
    id: { type: String, default: 1 },
  },
  setup(props) {
    const id = props.id;

    let lost = ref({});
    let user_lost_count = ref("");

    let type_class = ref("");

    onMounted(() => {
      getDetail(id)
        .then((result) => {
          let data = result.data;
          data.CREATE_TIME = moment(data.CREATE_TIME).format(
            "YYYY-MM-DD HH:mm:ss"
          );
          lost.value = data;
          if (lost.value.TYPE == "寻物") {
            type_class.value =
              "text-sm bg-blue-600 px-2 py-1 rounded-md text-white w-fit";
          } else {
            type_class.value =
              "text-sm bg-green-600 px-2 py-1 rounded-md text-white w-fit";
          }
        })
        .then(() => {
          getUserLostCount(lost.value.USER_ID).then((result) => {
            user_lost_count.value = result.data.count;
          });
        });
    });

    return {
      lost,
      user_lost_count,
      type_class,
    };
  },
};
</script>

<style>
</style>