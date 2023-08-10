<template>
  <div class="w-screen h-screen bg-white flex flex-col items-center justify-center">
    <div class="flex flex-col items-center border w-11/12 lg:w-96 px-5 py-6 rounded-xl shadow-lg shadow-slate-300">
      <!-- 标题 -->
      <h1 class="text-2xl">登录</h1>
      <!-- 表单项 -->
      <div class="mt-8 flex flex-col gap-4 w-full">
        <div class="flex flex-col gap-2">
          <span class="text-slate-700">电子邮箱</span>
          <div class="h-12 relative group">
            <input v-model="email" type="text" placeholder="请输入您的电子邮箱" class="text-slate-500 placeholder-slate-400 px-12 h-full w-full border border-slate-300 rounded focus:outline-none focus:border focus:border-blue-600">
            <div class="text-slate-500 h-12 w-12 flex justify-center items-center absolute top-0 left-0">
              <i-at-sign theme="outline" size="20"/>
            </div>
          </div>
        </div>
        <div class="flex flex-col gap-2">
          <span class="text-slate-700">密码</span>
          <div class="h-12 relative group">
            <input v-model="password" type="password" placeholder="请输入密码" class="text-slate-500 placeholder-slate-400 px-12 h-full w-full border border-slate-300 rounded focus:outline-none focus:border focus:border-blue-600">
            <div class="text-slate-500 h-12 w-12 flex justify-center items-center absolute top-0 left-0">
              <i-lock theme="outline" size="20"/>
            </div>
          </div>
        </div>
        <span v-show="tip.show" class="text-red-500 flex items-center gap-1"
        ><i-close-one theme="outline" size="16" class="fill-current" />
          {{ tip.message }}
        </span>
        <button class="btn-primary mt-3" type="button" @click="submit()">登录</button>
        <div class="w-full text-sm flex justify-center items-end mt-6">
          <span class="">没有账号？</span>
          <router-link to="/register">
            <span class="border-b border-blue-600 text-blue-600 cursor-pointer">点击注册</span>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from "@vue/reactivity";
import { login } from "../../../api/user";
import router from "../../../router";
import { ElMessage } from "element-plus";
export default {
  setup(props, context) {
    let tip = reactive({
      show: false,
      message: "登录失败，电子邮箱或密码错误",
    });

    let email = ref("");
    let password = ref("");

    // 登录
    const submit = () => {
      // 检查是否为空
      if (email.value === "" || password.value === "") {
        tip.show = true;
        tip.message = "电子邮箱或密码不能为空。";
      } else {
        tip.show = false;
        tip.message = "电子邮箱或密码不能为空。";
        // 发送请求
        login({
          email: email.value,
          password: password.value,
        }).then((result) => {
          switch (result.code) {
            case 2003:
              ElMessage({
                message: "登录成功",
                type: "success",
              });
              localStorage.setItem("token", result.data.token);
              localStorage.setItem("user_id", result.data.userinfo.id);
              localStorage.setItem("headshot", result.data.userinfo.headshot);
              localStorage.setItem("username", result.data.userinfo.username);
              localStorage.setItem("admin", result.data.userinfo.admin);
              router.push("/share");
              break;
            case 2004:
              ElMessage({
                message: "登录失败，邮箱不存在",
                type: "error",
              });
              break;
            case 2005:
              ElMessage({
                message: "登录失败，密码错误",
                type: "error",
              });
              break;
            default:
              ElMessage({
                message: "登录失败，邮箱或密码错误",
                type: "error",
              });
              break;
          }
        });
      }
    };

    return {
      email,
      password,
      submit,
      tip,
    };
  },
};
</script>

<style>
</style>