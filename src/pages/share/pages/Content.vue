<template>
  <div class="card">
    <!-- 标题 -->
    <h1 class="font-bold text-3xl text-blue-600">
      {{ share.TITLE }}
    </h1>
    <!-- 封面 -->
    <div class="w-full h-96 rounded-md overflow-hidden mt-8">
      <img :src="share.COVER" alt="" class="coverImg"/>
    </div>
    <!-- 内容 -->
    <div
        class="w-11/12 m-auto max-w-none py-8 prose"
        :innerHTML="share.CONTENT"
    ></div>
    <!-- 分类 -->
    <div class="">
        <span>分类：</span
        ><span :class="cate_class">{{
        share.CATE_NAME
      }}</span>
    </div>
    <!-- 其他信息 -->
    <div class="flex mt-8 items-center gap-5">
      <!--        <div class="flex gap-1 items-center text-neutral-600">
                <i-comments class="fill-current" theme="filled" size="14" />
                <span class="text-xs">188 条评论</span>
              </div>-->
      <div class="flex gap-1 items-center text-neutral-600">
        <i-calendar-three class="fill-current" theme="filled" size="14"/>
        <span class="text-xs">{{ share.CREATE_TIME }}</span>
      </div>
    </div>
    <!--       评论-->
    <!--      <block-title class="mt-8">评论列表</block-title>-->
    <!-- 评论列表 -->
    <!--      <comment
            v-for="item in comments"
            :key="item.id"
            :comment="item"
            @openReply="openReply"
          ></comment>-->
    <!-- <comment class="ml-16 pl-8 border-l"></comment> -->
    <!-- 分页 -->
    <!--      <ul class="pagination mt-8">
            <li class="pagination-li">
              <i-arrow-left class="fill-current" theme="filled" size="18" />
            </li>
            <li class="pagination-li">1</li>
            <li class="pagination-li">2</li>
            <li class="pagination-li">3</li>
            <li class="pagination-li">
              <i-arrow-right class="fill-current" theme="filled" size="18" />
            </li>
          </ul>
          <block-title class="mt-8">评论</block-title>
          <textarea
            v-model="comment_content"
            class="textarea mt-8"
            placeholder="留下你的评论吧..."
          ></textarea>
          <button class="btn-blue px-24 rounded-full mt-5" @click="leaveComment()">
            发布
          </button>-->
  </div>
  <!-- 关于作者 -->
  <div class="mt-8 flex gap-12 w-full bg-white p-5 shadow rounded-lg">
    <!-- 头像 -->
    <router-link :to="'/user/'+share.USER_ID+'/share'">
      <div
          class="cursor-pointer w-24 h-24 shrink-0 rounded-full overflow-hidden"
      >
        <img class="coverImg" :src="share.USER_HEADSHOT" alt=""/>
      </div>
    </router-link>

    <!-- 其他信息 -->
    <div class="flex flex-col gap-3">
      <!-- 用户名 -->
      <router-link :to="'/user/'+share.USER_ID+'/share'">
           <span
               class="
              font-bold
              text-2xl
              cursor-pointer
              transition-all
              duration-500
              hover:text-blue-700
            "
           >{{ share.USER_USERNAME }}</span
           >
      </router-link>

      <span class="text-sm text-slate-500">关于作者</span>
      <!-- 个人介绍 -->
      <p class="text-sm text-slate-500 line-clamp-2">
        {{ share.USER_INTRODUCTION }}
      </p>
      <!-- 查看所有分享 -->
      <router-link :to="'/user/'+share.USER_ID+'/share'">
        <span
            class="
              italic
              text-neutral-500 text-sm
              inline-block
              w-fit
              border-b
              cursor-pointer
            "
        >查看作者所有分享({{ user_share_count }})</span
        >
      </router-link>

    </div>
  </div>

  <!-- 回复 -->
  <!--  <reply-dialog
      :username="replyTo"
      :hidden="replyHidden"
      :share_id="id"
      :parent_id="comment_id"
      @closeReply="closeReply"
    ></reply-dialog>-->
</template>

<script>
import {ref} from "@vue/reactivity";
import BlockTitle from "../../../components/BlockTitle.vue";
import Comment from "../components/Comment.vue";
import ReplyDialog from "../components/ReplyDialog.vue";
import {
  getDetail,
  getUserShareCount,
  comment,
  getShareComments,
} from "../../../api/share";
import {onMounted} from "@vue/runtime-core";
import moment from "moment";

export default {
  props: {id: {type: String, default: ""}},
  setup(props) {
    // 分享ID
    const share_id = props.id;

    // 分享详情
    let share = ref({
      COVER: "",
    });

    // 作者分享数量
    let user_share_count = ref("");

    // 评论列表
    /*    let comments = ref([]);*/
    let cate_class = ref('')
    onMounted(() => {
      // 初始化分享数据
      getDetail(share_id)
          .then((result) => {
            share.value = result.data[0];
            share.value.CREATE_TIME = moment(share.value.CREATE_TIME).format(
                "YYYY.MM.DD HH:mm:ss"
            );
            cate_class.value = 'text-' + share.value.CATE_COLOR + '-500 underline italic cursor-pointer'
          })
          .then(() => {
            // 查询作者分享数量
            getUserShareCount(share.value.USER_ID).then((result) => {
              user_share_count.value = result.data.count;
            });
          });
      // 获取评论列表
      /*getShareComments(share_id).then((result) => {
        comments.value = result.data;
        console.log(result);
      });*/
    });

    // 评论
    /*let comment_content = ref("");
    const leaveComment = () => {
      comment(share_id, {
        parent_id: "0",
        content: comment_content.value,
      }).then((result) => {
        console.log(result);
      });
    };*/

    /**
     * 回复框
     */
    // 回复框隐藏关闭标签
    /*    let replyHidden = ref(true);*/
    // 回复对象用户名
    /*    let replyTo = ref("");*/
    // 回复评论ID
    /*    let comment_id = ref("");*/
    // 打开回复框
    /*let openReply = ([username, c_id]) => {
      replyHidden.value = false;
      replyTo.value = username;
      comment_id.value = c_id;
      console.log(comment_id.value);
    };*/
    // 关闭回复框
    /*let closeReply = () => {
      replyHidden.value = true;
    };*/

    return {
      /* replyHidden,
       replyTo,
       openReply,
       closeReply,*/
      share,
      user_share_count,
      cate_class
      /*      leaveComment,
            comment_content,
            comments,
            comment_id,*/
    };
  },
  components: {
    BlockTitle,
    Comment,
    ReplyDialog,
  },
};
</script>

<style lang="less" scoped>

</style>