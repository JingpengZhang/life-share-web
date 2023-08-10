<template>
  <div class="flex bg-gray-100 h-screen w-screen overflow-hidden ">
    <!-- 侧边 -->
    <div
      id="nav"
      class="
        border-r
        min-h-screen
        flex flex-col
        h-screen
        transition-all
        w-64
        shrink-0
        overflow-hidden
        bg-white
      "
    >
      <!-- logo -->
      <div
        class="
          w-full
          shrink-0
          h-16
          bg-slate-200
          text-xl
          flex
          items-center
          justify-center
        "
      >
        <span>管理中心</span>
      </div>
      <!-- 导航 -->
      <ul class="scroll-box px-4 pt-5 flex flex-col gap-3 overflow-y-scroll">
        <li class="">
          <div class="nav_item user_center_nav_normal">
            <div class="flex gap-4 items-center">
              <i-user theme="outline" size="24" />
              <span class="">用户管理</span>
            </div>
            <i-right
              class="transition-all duration-500"
              theme="outline"
              size="18"
            />
          </div>
          <!-- 二级导航 -->
          <ul class="transition-all duration-500 overflow-hidden">
            <router-link
              to="/admin/user"
              class="second_item user_center_nav_normal_second"
              active-class="user_center_nav_active_second"
            >
              <span class="text-3xl">·</span>
              <span class="text-sm">用户列表</span>
            </router-link>
          </ul>
        </li>
        <li class="">
          <div class="nav_item user_center_nav_normal">
            <div class="flex gap-4 items-center">
              <i-sunny theme="filled" size="24"/>
              <span class="">分享管理</span>
            </div>
            <i-right
              class="transition-all duration-500"
              theme="outline"
              size="18"
            />
          </div>
          <!-- 二级导航 -->
          <ul class="transition-all duration-500 overflow-hidden">
            <router-link
              to="/admin/share"
              class="second_item user_center_nav_normal_second"
              active-class="user_center_nav_active_second"
            >
              <span class="text-3xl">·</span>
              <span class="text-sm">分享列表</span>
            </router-link>
            <router-link
              to="/admin/share_cate"
              class="second_item user_center_nav_normal_second"
              active-class="user_center_nav_active_second"
            >
              <span class="text-3xl">·</span>
              <span class="text-sm">分类管理</span>
            </router-link>
          </ul>
        </li>
        <li class="">
          <div class="nav_item user_center_nav_normal">
            <div class="flex gap-4 items-center">
              <i-two-ellipses theme="outline" size="24"/>
              <span class="">问答管理</span>
            </div>
            <i-right
                class="transition-all duration-500"
                theme="outline"
                size="18"
            />
          </div>
          <!-- 二级导航 -->
          <ul class="transition-all duration-500 overflow-hidden">
            <router-link
                to="/admin/ask"
                class="second_item user_center_nav_normal_second"
                exact-active-class="user_center_nav_active_second"
            >
              <span class="text-3xl">·</span>
              <span class="text-sm">问题列表</span>
            </router-link>
            <router-link
                to="/admin/ask/answer"
                class="second_item user_center_nav_normal_second"
                exact-active-class="user_center_nav_active_second"
            >
              <span class="text-3xl">·</span>
              <span class="text-sm">回答列表</span>
            </router-link>
          </ul>
        </li>
        <li class="">
          <div class="nav_item user_center_nav_normal">
            <div class="flex gap-4 items-center">
              <i-broadcast theme="outline" size="24"/>
              <span class="">启事管理</span>
            </div>
            <i-right
                class="transition-all duration-500"
                theme="outline"
                size="18"
            />
          </div>
          <!-- 二级导航 -->
          <ul class="transition-all duration-500 overflow-hidden">
            <router-link
                to="/admin/lost"
                class="second_item user_center_nav_normal_second"
                exact-active-class="user_center_nav_active_second"
            >
              <span class="text-3xl">·</span>
              <span class="text-sm">寻物启事</span>
            </router-link>
            <router-link
                to="/admin/lost/lost"
                class="second_item user_center_nav_normal_second"
                exact-active-class="user_center_nav_active_second"
            >
              <span class="text-3xl">·</span>
              <span class="text-sm">招领启事</span>
            </router-link>
          </ul>
        </li>
        <li class="">
          <div class="nav_item user_center_nav_normal">
            <div class="flex gap-4 items-center">
              <i-thumbs-up theme="outline" size="24"/>
              <span class="">推荐管理</span>
            </div>
            <i-right
                class="transition-all duration-500"
                theme="outline"
                size="18"
            />
          </div>
          <!-- 二级导航 -->
          <ul class="transition-all duration-500 overflow-hidden">
            <router-link
                to="/admin/book"
                class="second_item user_center_nav_normal_second"
                exact-active-class="user_center_nav_active_second"
            >
              <span class="text-3xl">·</span>
              <span class="text-sm">推荐列表</span>
            </router-link>
          </ul>
        </li>
      </ul>
    </div>
    <!-- 右侧内容 -->
    <div class="relative flex-auto flex flex-col justify-between max-h-screen">
      <!-- 顶部栏 -->
      <div
        class="
          shrink-0
          bg-white
          h-16
          px-4
          lg:px-10 lg:pl-5
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
          <div class="h-full flex items-center gap-3">
            <!-- 收缩 -->
            <i-menu-unfold-one
              id="navFolder"
              class="cursor-pointer"
              @click="toggleNav()"
              theme="outline"
              size="24"
            />
            <!-- logo -->
            <div class="hidden lg:block">
              <!-- <h1 class="text-2xl">大学生生活</h1> -->
            </div>
          </div>
        </div>
        <!-- 右 -->
        <div class="">
          <!-- 登陆后 -->
          <div class="">
            <!-- 账号相关 -->
            <div class="relative">
              <!-- 头像 -->
              <button
                @focus="openOperation()"
                @blur="closeOperation()"
                class="w-8 h-8 rounded-full overflow-hidden cursor-pointer"
              >
                <img
                  class="h-full w-full object-cover"
                  :src="headshot"
                  :alt="username"
                />
              </button>
              <!-- 操作 -->
              <div
                id="operation"
                class="hidden w-36 absolute right-0 top-11 z-40"
              >
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
                <router-link to="/share">
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
                    <i-home theme="filled" size="16" />
                    <span>返回首页</span>
                  </li>
                </router-link>
                
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
                      <i-me theme="outline" size="16" />
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
                <i-layers theme="filled" size="16" />
                <span>内容管理</span>
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
                    <i-logout theme="outline" size="16" />
                    <span>退出登录</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 内容区 -->
      <div class="scroll-box w-full flex-auto px-5 overflow-y-scroll">
        <div class="pt-5 pb-3">
          <router-view></router-view>
        </div>
      </div>
      <!-- 底部 -->
      <div
        class="
          w-full
          h-8
          bg-transparent
          flex
          items-center
          pl-5
          justify-center
          lg:justify-start
        "
      >
        <span class="text-xs">Copyright © 2022-2022 大学生生活网站</span>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import router from "../../router";
import { onMounted } from "vue";
export default {
  setup() {
    // 声明头像，用户名，专业信息
    let headshot = ref("");
    let username = ref("");
    let major = ref("");
    let user_id = ref("");
    user_id.value = localStorage.getItem("user_id");
    // 声明菜单栏状态标记
    let navState = ref(true);
    // 展开与折叠状态栏
    const toggleNav = () => {
      document.getElementById("nav").style.transition = "all ease 0.5s";
      document.getElementById("navFolder").style.transition = "all ease 0.5s";
      if (navState.value) {
        document.getElementById("nav").classList.add("w-0");
        document.getElementById("navFolder").style.transform = "rotate(180deg)";
        navState.value = false;
      } else {
        document.getElementById("nav").classList.remove("w-0");
        document.getElementById("navFolder").style.transform = "rotate(0)";
        navState.value = true;
      }
    };

    // 打开与关闭操作面板
    const openOperation = () => {
      document.getElementById("operation").classList.remove("hidden");
    };
    const closeOperation = () => {
      setTimeout(() => {
        document.getElementById("operation").classList.add("hidden");
      }, 100);
    };

    // 退出登录
    const logout = () => {
      localStorage.clear();
      router.push("/home");
    };

    onMounted(() => {
      // 获取头像，用户名，专业
      headshot.value = localStorage.getItem("headshot");
      username.value = localStorage.getItem("username");
      major.value = localStorage.getItem("major");

      // 展开二级导航栏
      // 获取一级导航
      let items = document.getElementsByClassName("nav_item");
      // 获取每一级导航栏的二级导航高度
      let items_children_hight = [];
      let items_state = [];
      for (let i = 0; i < items.length; i++) {
        let ul = items[i].nextElementSibling;
        items_children_hight[i] = ul.clientHeight;
        items_state[i] = false;
        ul.style.height = "0px";

        items[i].addEventListener("click", () => {
          if (items_state[i]) {
            ul.style.height = "0px";
            items[i].lastChild.classList.remove("rotate-90");
          } else {
            ul.style.height = items_children_hight[i] + "px";
            items[i].lastChild.classList.add("rotate-90");
          }
          items_state[i] = !items_state[i];
        });
      }

      // 点击二级菜单改变一级菜单高亮显示
      let second_items = document.getElementsByClassName("second_item");
      for (let i = 0; i < second_items.length; i++) {
        second_items[i].addEventListener("click", () => {
          for (let j = 0; j < items.length; j++) {
            items[j].classList.remove("user_center_nav_active");
            items[j].classList.add("user_center_nav_normal");
          }
          second_items[i].parentElement.previousElementSibling.classList.remove(
            "user_center_nav_normal"
          );
          second_items[i].parentElement.previousElementSibling.classList.add(
            "user_center_nav_active"
          );
        });
      }
    });

    return {
      headshot,
      username,
      major,
      toggleNav,
      openOperation,
      closeOperation,
      logout,
      user_id,
    };
  },
};
</script>

<style>
</style>