<template>
  <!-- 导航栏 -->
  <div
      class="
      fixed
      top-0
      left-0
      z-40
      bg-white
      h-16
      px-4
      lg:px-10
      w-full
      shadow-md shadow-gray-200
      flex
      justify-between
      items-center
    "
  >
    <!-- 左 -->
    <div class="h-full">
      <!-- 大屏（lg） -->
      <div class="hidden h-full lg:flex items-center">
        <!-- logo -->
        <div class="">
          <h1 class="text-2xl">大学生生活</h1>
        </div>
        <!-- 导航栏 -->
        <ul class="ml-8 h-full flex gap-1 items-center">
          <router-link to="/share" class="nav-normal" active-class="nav-active">
            <i-sunny theme="filled" size="18"/>
            <span class="">生活分享</span>
          </router-link>
          <router-link to="/ask" class="nav-normal" active-class="nav-active">
            <i-two-ellipses theme="outline" size="18"/>
            <span class="">问答中心</span>
          </router-link>
          <router-link to="/lost" class="nav-normal" active-class="nav-active">
            <i-find-one theme="outline" size="18"/>
            <span>失物招领</span>
          </router-link>
          <router-link to="/book" class="nav-normal" active-class="nav-active">
            <i-book theme="outline" size="18"/>
            <span class="">好书推荐</span>
          </router-link>
        </ul>
      </div>
      <!-- 小屏 -->
      <button
          @focus="openSmallNav()"
          @blur="closeSmallNav()"
          class="h-full flex lg:hidden items-center justify-center"
      >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
        >
          <path fill="none" d="M0 0h24v24H0z"/>
          <path d="M3 4h18v2H3V4zm0 7h18v2H3v-2zm0 7h18v2H3v-2z"/>
        </svg>
      </button>
      <!-- 小屏导航 -->
      <div
          id="smallNav"
          class="hidden absolute left-0 top-0 min-h-screen w-64 bg-white"
      >
        <!-- logo -->
        <div
            class="
            w-full
            h-16
            bg-slate-200
            text-xl
            flex
            items-center
            justify-center
          "
        >
          <span>大学生生活</span>
        </div>
        <!-- 导航 -->
        <ul class="px-4 pt-5 flex flex-col gap-3">
          <router-link
              to="/share"
              class="nav-normal-small"
              active-class="nav-active-small"
          >
            <i-sunny theme="filled" size="18"/>
            <span class="">生活分享</span>
          </router-link>
          <router-link
              to="/ask"
              class="nav-normal-small"
              active-class="nav-active-small"
          >
            <i-two-ellipses theme="outline" size="18"/>
            <span class="">问答中心</span>
          </router-link>
          <router-link
              to="/lost"
              class="nav-normal-small"
              active-class="nav-active-small"
          >
            <i-find-one theme="outline" size="18"/>
            <span class="">失物招领</span>
          </router-link>
          <router-link
              to="/book"
              class="nav-normal-small"
              active-class="nav-active-small"
          >
            <i-book theme="outline" size="18"/>
            <span class="">好书推荐</span>
          </router-link>
        </ul>
      </div>
    </div>
    <!-- 右 -->
    <div class="">
      <!-- 登录前 -->
      <div id="beforeLogin" class="flex gap-5">
        <router-link to="/login">
          <button class="btn-primary">登录</button>
        </router-link>
        <router-link to="/register">
          <button class="btn-primary">注册</button>
        </router-link>
      </div>
      <!-- 登录后 -->
      <div id="afterLogin" class="hidden">
        <!-- 账号相关 -->
        <div class="relative flex gap-8 items-center">
          <!-- 创作 -->
          <button @focus="openCreateItems()"
                  @blur="closeCreateItems()"
                  class="flex gap-2 items-center justify-center text-sm px-4 rounded text-blue-700 hover:bg-blue-700 transition-all duration-500 hover:text-white border border-blue-700 h-8">
            <i-newlybuild theme="filled" size="18"/>
            发布内容
          </button>
          <!-- 操作 -->
          <div id="create_items" class="hidden w-36 flex flex-col items-end absolute right-16 top-11 z-40">
            <!-- 小三角 -->
            <div
                class="
                absolute
                w-0
                h-0
                -top-4
                right-2
                border-b-slate-300
                border-8
                border-r-transparent
                border-l-transparent
                border-t-transparent
              "
            ></div>
            <!-- 按钮区 -->
            <div
                class="
                w-fit
                p-2
                bg-white
                border
                rounded-md
                overflow-hidden
                border-slate-300
                grid
                grid-cols-2
                gap-2
              "
            >
              <router-link to="/user_center/createshare">
                <div class="flex flex-col items-center justify-center text-blue-500 text-sm gap-1">
                  <i-sunny theme="filled" size="18"/>
                  分享
                </div>
              </router-link>
              <router-link to="/user_center/createask">
                <div class="flex flex-col items-center justify-center text-orange-500 text-sm gap-1">
                  <i-two-ellipses theme="outline" size="18"/>
                  提问
                </div>
              </router-link>
              <router-link to="/user_center/createlost">
                <div class="flex flex-col items-center justify-center text-yellow-500 text-sm gap-1">
                  <i-broadcast theme="outline" size="18"/>
                  启事
                </div>
              </router-link>
              <router-link to="/user_center/createbook">
                <div class="flex flex-col items-center justify-center text-green-500 text-sm gap-1">
                  <i-thumbs-up theme="outline" size="18"/>
                  推荐
                </div>
              </router-link>
            </div>
          </div>
          <!-- 头像 -->
          <button
              @focus="openOperations()"
              @blur="closeOperations()"
              class="w-8 h-8 rounded-full overflow-hidden cursor-pointer"
          >
            <img
                class="h-full w-full object-cover"
                :src="headshot"
                :alt="username"
            />
          </button>
          <!-- 操作 -->
          <div id="operations" class="hidden w-36 absolute right-0 top-11 z-40">
            <!-- 小三角 -->
            <div
                class="
                absolute
                w-0
                h-0
                -top-4
                right-2
                border-b-slate-300
                border-8
                border-r-transparent
                border-l-transparent
                border-t-transparent
              "
            ></div>
            <!-- 顶部(用户名以及专业) -->
            <div
                class="
                w-full
                px-4
                rounded-t-md
                py-3
                flex flex-col
                gap-1
                bg-slate-300
              "
            >
              <span class="">{{ username }}</span>
              <span class="font-thin text-sm">{{ major }}</span>
            </div>
            <!-- 按钮区 -->
            <ul
                class="
                w-full
                px-2
                bg-white
                border
                rounded-b-md
                overflow-hidden
                border-slate-300
              "
            >
              <router-link :to="'/user/' + user_id + '/share'">
                <li
                    class="
                    flex
                    border-b border-gray-100
                    gap-2
                    items-center
                    text-sm
                    h-10
                    pl-3
                    hover:text-blue-600
                    cursor-pointer
                  "
                >
                  <i-me theme="outline" size="16"/>
                  <span>个人主页</span>
                </li>
              </router-link>
              <router-link to="/user_center">
                <li
                    class="
                  flex
                  border-b border-gray-100
                  gap-2
                  items-center
                  text-sm
                  h-10
                  pl-3
                  hover:text-blue-600
                  cursor-pointer
                "
                >
                  <i-layers theme="filled" size="16"/>
                  <span>内容管理</span>
                </li>
              </router-link>
              <router-link to="/admin">
                <li
                    v-if="admin == 1"
                    @click="toAdmin()"
                    class="
                  flex
                  border-b border-gray-100
                  gap-2
                  items-center
                  text-sm
                  h-10
                  pl-3
                  hover:text-blue-600
                  cursor-pointer
                "
                >
                  <i-category-management theme="filled" size="16"/>
                  <span>系统管理</span>
                </li>
              </router-link>

              <li
                  @click="logout()"
                  class="
                  flex
                  gap-2
                  items-center
                  text-sm
                  h-10
                  pl-3
                  hover:text-blue-600
                  cursor-pointer
                "
              >
                <i-logout theme="outline" size="16"/>
                <span>退出登录</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- 小屏导航背景 -->
  <div
      id="smallNavBg"
      class="
      hidden
      h-screen
      w-screen
      absolute
      left-0
      top-0
      bg-slate-500
      z-30
      opacity-40
    "
  ></div>
</template>

<script>
import {ElMessage} from "element-plus";
import {ref, onMounted} from "vue";
import router from "../router";

export default {
  name: "Navigator",
  setup() {
    // 声明头像，用户名，专业参数
    let headshot = ref("");
    let username = ref("");
    let major = ref("");
    let admin = ref(0);
    let user_id = ref("");
    user_id.value = localStorage.getItem('user_id')
    // 初始化
    onMounted(() => {
      const token = localStorage.getItem("token");
      username.value = localStorage.getItem("username");
      headshot.value = localStorage.getItem("headshot");
      major.value = localStorage.getItem("major");
      admin.value = localStorage.getItem("admin");
      if (token) {
        document.getElementById("beforeLogin").classList.add("hidden");
        document.getElementById("afterLogin").classList.remove("hidden");
      }
    });

    // 退出登录
    const logout = () => {
      localStorage.clear();
      document.getElementById("beforeLogin").classList.remove("hidden");
      document.getElementById("afterLogin").classList.add("hidden");
      ElMessage({message: "退出成功", type: "success"});
    };

    // 小屏导航栏打开与关闭
    const openSmallNav = () => {
      document.getElementById("smallNav").classList.remove("hidden");
      document.getElementById("smallNavBg").classList.remove("hidden");
    };
    const closeSmallNav = () => {
      setTimeout(() => {
        document.getElementById("smallNav").classList.add("hidden");
        document.getElementById("smallNavBg").classList.add("hidden");
      }, 100);
    };

    // 个人操作面板打开与关闭
    const openOperations = () => {
      document.getElementById("operations").classList.remove("hidden");
    };
    const closeOperations = () => {
      setTimeout(() => {
        document.getElementById("operations").classList.add("hidden");
      }, 100);
    };

    // 创作面板打开与关闭
    const openCreateItems = () => {
      document.getElementById("create_items").classList.remove("hidden");
    }
    const closeCreateItems = () => {
      setTimeout(() => {
        document.getElementById("create_items").classList.add("hidden");
      }, 100);
    };

    return {
      headshot,
      username,
      major,
      logout,
      openSmallNav,
      closeSmallNav,
      openOperations,
      closeOperations,
      admin,
      user_id, openCreateItems, closeCreateItems
    };
  },
};
</script>

<style>
</style>