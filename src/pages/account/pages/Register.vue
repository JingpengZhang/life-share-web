<template>
  <div class="w-screen h-screen bg-white flex flex-col items-center justify-center">
    <div class="flex flex-col items-center border w-11/12 lg:w-96 px-5 py-6 rounded-xl shadow-lg shadow-slate-300">
      <!-- 标题 -->
      <h1 class="text-2xl">注册</h1>
      <div class="w-full text-sm flex justify-center items-end mt-2">
        <span class="text-slate-400">已有账号？</span>
        <router-link to="/login">
          <span class="border-b border-blue-600 text-blue-600 cursor-pointer">点击登录</span>
        </router-link>
      </div>
      <!-- 表单项 -->
      <div class="mt-8 flex flex-col gap-4 w-full">
        <div class="flex flex-col gap-2">
          <span class="text-slate-700">电子邮箱</span>
          <div class="h-12 relative group">
            <input v-model="email" @blur="verifyEmail()" type="text" placeholder="请输入您的电子邮箱"
                   class="text-slate-500 placeholder-slate-400 px-12 h-full w-full border border-slate-300 rounded focus:outline-none focus:border focus:border-blue-600">
            <div class="text-slate-500 h-12 w-12 flex justify-center items-center absolute top-0 left-0">
              <i-at-sign theme="outline" size="20"/>
            </div>

          </div>
          <span
              v-show="email_tip.show"
              class="text-red-500 flex items-center gap-1"
          ><i-close-one theme="outline" size="16" class="fill-current"/>
            {{ email_tip.message }}
          </span>
        </div>
        <div class="flex flex-col gap-2">
          <span class="text-slate-700">密码</span>
          <div class="h-12 relative group">
            <input v-model="pass" @blur="verifyPass($event)" type="password" placeholder="请输入密码"
                   class="text-slate-500 placeholder-slate-400 px-12 h-full w-full border border-slate-300 rounded focus:outline-none focus:border focus:border-blue-600">
            <div class="text-slate-500 h-12 w-12 flex justify-center items-center absolute top-0 left-0">
              <i-lock theme="outline" size="20"/>
            </div>
          </div>
          <span
              v-show="pass_tip.show"
              class="text-red-500 flex items-center gap-1"
          ><i-close-one theme="outline" size="16" class="fill-current"/>
            {{ pass_tip.message }}
          </span>
        </div>
        <div class="flex flex-col gap-2">
          <span class="text-slate-700">确认密码</span>
          <div class="h-12 relative group">
            <input v-model="repass" @blur="verifyRepass($event)" type="password" placeholder="请再次输入密码"
                   class="text-slate-500 placeholder-slate-400 px-12 h-full w-full border border-slate-300 rounded focus:outline-none focus:border focus:border-blue-600">
            <div class="text-slate-500 h-12 w-12 flex justify-center items-center absolute top-0 left-0">
              <i-lock theme="outline" size="20"/>
            </div>
          </div>
          <span
              v-show="repass_tip.show"
              class="text-red-500 flex items-center gap-1"
          ><i-close-one theme="outline" size="16" class="fill-current"/>
            {{ repass_tip.message }}
          </span>
        </div>
        <button class="btn-primary mt-3 w-full" type="button" @click="submit()">注册</button>
      </div>

    </div>
  </div>
</template>

<script>
import {reactive, ref} from "@vue/reactivity";
import Reg from "../../../tools/reg.js";
import {register, login} from "../../../api/user.js";
import {ElMessage} from "element-plus";
import router from "../../../router/index.js";

export default {
  setup() {
    let email = ref("");
    let pass = ref("");
    let repass = ref("");

    let email_tip = reactive({
      show: false,
      pass: false,
      message: "",
    });
    let pass_tip = reactive({
      show: false,
      pass: false,
      message: "",
    });
    let repass_tip = reactive({
      show: false,
      pass: false,
      message: "",
    });

    const verifyEmail = () => {
      if (email.value === "") {
        email_tip.show = true;
        email_tip.message = "请输入电子邮箱";
        email_tip.pass = false;
      } else {
        if (!Reg.email.test(email.value)) {
          email_tip.show = true;
          email_tip.message = "邮箱格式不正确";
          email_tip.pass = false;
        } else {
          email_tip.show = false;
          email_tip.pass = true;
        }
      }
    };

    const verifyPass = () => {
      if (pass.value === "") {
        pass_tip.show = true;
        pass_tip.message = "请输入密码";
        pass_tip.pass = false;
      } else {
        if (!Reg.password.test(pass.value)) {
          pass_tip.show = true;
          pass_tip.message =
              "以字母开头，长度在6~18之间，只能包含字符、数字和下划线。";
          pass_tip.pass = false;
        } else {
          pass_tip.show = false;
          pass_tip.pass = true;
        }
      }
    };

    const verifyRepass = () => {
      if (repass.value === "") {
        repass_tip.show = true;
        repass_tip.message = "请再次输入密码";
        repass_tip.pass = false;
      } else {
        if (repass.value !== pass.value) {
          repass_tip.show = true;
          repass_tip.message = "两次密码不一致";
          repass_tip.pass = false;
        } else {
          repass_tip.show = false;
          repass_tip.pass = true;
        }
      }
    };

    const submit = () => {
      if (email_tip.pass && pass_tip.pass && repass_tip.pass) {
        register({
          email: email.value,
          password: pass.value,
          password_confirmation: repass.value,
        }).then((result) => {
          switch (result.code) {
            case 2001:
              ElMessage({
                message: "注册成功，已自动登录",
                type: "success",
              });
              login({email: email.value, password: pass.value}).then(
                  (result) => {
                    localStorage.setItem("token", result.data.token);
                    localStorage.setItem("user_id", result.data.userinfo.id);
                    localStorage.setItem(
                        "headshot",
                        result.data.userinfo.headshot
                    );
                    localStorage.setItem(
                        "username",
                        result.data.userinfo.username
                    );
                    localStorage.setItem("admin", result.data.userinfo.admin);
                  }
              );
              router.push("/init");
              break;
            case 2002:
              ElMessage({
                message: "邮箱已被注册",
                type: "error",
              });
              break;
            default:
              ElMessage({
                message: "未知错误，请稍后再试",
                type: "error",
              });
          }
        });
      } else {
        verifyEmail();
        verifyPass();
        verifyRepass();
      }
    };

    return {
      email,
      pass,
      repass,
      email_tip,
      pass_tip,
      repass_tip,
      verifyEmail,
      verifyPass,
      verifyRepass,
      submit,
    };
  },
};
</script>

<style>
</style>