<template>
  <div class="w-screen h-screen bg-white flex flex-col items-center justify-center">
    <div class="flex flex-col items-center border w-11/12 lg:w-fit px-5 py-6 rounded-xl shadow-lg shadow-slate-300">
      <!-- 标题 -->
      <h1 class="text-2xl">完善信息</h1>
      <div class="w-full text-sm flex justify-center items-end mt-2">
        <span class="text-slate-400">以下信息可在用户中心进行修改</span>
      </div>
      <!-- 表单项 -->
      <div class="mt-8 flex flex-col gap-4 w-full">
        <div class="flex flex-col lg:flex-row gap-4 lg:gap-5">
          <div class="flex flex-col gap-2">
            <span class="text-slate-700">用户名</span>
            <div class="h-12 relative group">
              <input v-model="username" type="text" placeholder="请输入您的用户名" class="text-slate-500 placeholder-slate-400 px-12 h-full w-full border border-slate-300 rounded focus:outline-none focus:border focus:border-blue-600">
              <div class="text-slate-500 h-12 w-12 flex justify-center items-center absolute top-0 left-0">
                <i-user theme="outline" size="20"/>
              </div>
            </div>
          </div>
          <div class="flex flex-col gap-2">
            <span class="text-slate-700">手机号</span>
            <div class="h-12 relative group">
              <input v-model="phone" type="text" placeholder="请输入您的手机号" class="text-slate-500 placeholder-slate-400 px-12 h-full w-full border border-slate-300 rounded focus:outline-none focus:border focus:border-blue-600">
              <div class="text-slate-500 h-12 w-12 flex justify-center items-center absolute top-0 left-0">
                <i-iphone theme="outline" size="20"/>
              </div>
            </div>
          </div>
        </div>
        <div class="flex flex-col lg:flex-row gap-4 lg:gap-5">
          <el-date-picker
              size="large"
              v-model="birthday"
              type="date"
              placeholder="请选择出生日期"
          />
          <el-cascader
              v-model="city"
              :options="cities"
              size="large"
              class="flex-auto"
              placeholder="请选择所在城市"
          />
        </div>
        <div class="flex flex-col lg:flex-row gap-4 lg:gap-5">
          <el-date-picker
              v-model="grade"
              type="year"
              size="large"
              placeholder="请选择入学年份"
          />
          <el-cascader
              v-model="major"
              :options="majors"
              size="large"
              class="flex-auto"
              :show-all-levels="false"
              placeholder="请选择专业"
          />
        </div>



        <el-input
            v-model="introduction"
            :rows="5"
            type="textarea"
            placeholder="请输入个人介绍"
        />
        <button class="btn-primary" type="button" @click="saveData()">
          保存
        </button>
        </div>
    </div>
  </div>
</template>

<script>
import {ref} from "@vue/reactivity";
import {MAJORS, CITIES} from "../../../tools/constant";
import {updateUserInfo} from "../../../api/user";
import {ElMessage} from "element-plus";
import router from "@/router";

export default {
  setup() {
    // 用户名
    let username = ref("");

    // 手机号
    let phone = ref("");

    // 出生日期
    let birthday = ref("");

    // 年级
    let grade = ref("");

    // 专业
    const majors = ref(MAJORS);
    let major = ref("");

    // 城市
    const cities = ref(CITIES);
    let city = ref("");

    // 个人介绍
    let introduction = ref("");

    // 保存
    const saveData = () => {
      updateUserInfo({
        username: username.value,
        phone: phone.value,
        birthday: birthday.value,
        major: major.value[0] + " " + major.value[1] + " " + major.value[2],
        grade: grade.value,
        city: city.value[0] + " " + city.value[1],
        introduction: introduction.value,
      }).then((result) => {
        localStorage.setItem('major', major.value[2])
        localStorage.setItem('username', username.value)
      }).then(() => {
        ElMessage({
          message: '资料填写完成，正在跳转首页',
          type: 'success'
        })
        router.push('/share')
      });
    };

    return {
      majors,
      major,
      cities,
      city,
      grade,
      username,
      phone,
      birthday,
      introduction,
      saveData,
    };
  },
};
</script>

<style>
</style>