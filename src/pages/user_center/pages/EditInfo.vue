<template>
  <div class="flex flex-col gap-6">
    <div class="flex gap-6 flex-col md:flex-row">
      <!-- 修改头像 -->
      <card class="w-full md:w-fit">
        <template #title> 修改头像 </template>
        <template #content>
          <div class="flex justify-center">
            <div class="w-48 flex gap-8 flex-col items-center">
              <input
                type="file"
                id="headshot"
                class="sr-only"
                @change="changeImg($event)"
              />
              <label for="headshot">
                <div
                  class="
                    w-24
                    h-24
                    rounded-lg
                    group
                    overflow-hidden
                    cursor-pointer
                  "
                >
                  <div
                    class="
                      w-full
                      h-full
                      flex
                      relative
                      justify-center
                      items-center
                    "
                  >
                    <i-add-pic theme="outline" size="24" />
                    <img
                      :src="headshot"
                      alt=""
                      class="h-24 w-24 object-cover absolute top-0 left-0"
                    />
                  </div>
                  <div
                    class="
                      flex flex-col
                      gap-2
                      text-white
                      items-center
                      justify-center
                      w-24
                      h-24
                      bg-gray-700
                      group-hover:-translate-y-full
                      transition-all
                      duration-700
                      opacity-80
                    "
                  >
                    <span class="">选择图片</span>
                    <i-upload-two theme="outline" size="24" />
                  </div>
                </div>
              </label>
              <button
                :disabled="!isChange"
                class="btn-primary mt-5"
                @click="updateHeadshot()"
              >
                保存头像
              </button>
            </div>
          </div>
        </template>
      </card>
      <card class="flex-auto">
        <template #title> 修改基本资料 </template>
        <template #content>
          <div class="flex lg:flex-row flex-col gap-5">
            <div class="flex flex-col gap-2 w-full lg:w-5/12">
              <span class="text-sm text-slate-400">用户名</span>
              <el-input
                v-model="username"
                size="large"
                placeholder="请输入用户名"
              />
            </div>
            <div class="flex flex-col gap-2 w-full lg:w-5/12">
              <span class="text-sm text-slate-400">手机号</span>
              <el-input
                v-model="phone"
                size="large"
                placeholder="请输入手机号"
              />
            </div>
            <div class="flex flex-col gap-2 flex-auto">
              <span class="text-sm text-slate-400">出生日期</span>
              <el-date-picker
                v-model="birthday"
                type="date"
                size="large"
                placeholder="选择日期"
              />
            </div>
          </div>
          <div class="flex lg:flex-row flex-col gap-5 mt-5">
            <div class="flex flex-col gap-2 lg:w-5/12">
              <span class="text-sm text-slate-400">所在地</span>
              <el-cascader v-model="city" :options="cities" size="large" />
            </div>

            <div class="flex flex-col gap-2 w-full lg:w-5/12">
              <span class="text-sm text-slate-400">专业</span>
              <el-cascader
                v-model="major"
                :show-all-levels="false"
                :options="majors"
                size="large"
              />
            </div>
            <div class="flex flex-col gap-2 flex-auto">
              <span class="text-sm text-slate-400">年级</span>
              <el-date-picker
                v-model="grade"
                type="year"
                size="large"
                placeholder="请选择入学年份"
              />
            </div>
          </div>
          <button class="btn-primary mt-8" @click="saveBaseInfo()">
            保存修改
          </button>
        </template>
      </card>
    </div>
    <!-- 个人介绍 -->
    <card>
      <template #title> 个人介绍 </template>
      <template #content>
        <el-input
          v-model="introduction"
          :rows="5"
          type="textarea"
          placeholder="请输入一段话介绍自己吧...."
        />
        <button class="btn-primary mt-8" @click="saveBaseInfo()">
          保存修改
        </button>
      </template>
    </card>
  </div>
</template>

<script>
import Card from "../../../components/Card.vue";
import { getUserInfo, updateUserInfo, saveHeadshot } from "../../../api/user";
import { onMounted, ref } from "@vue/runtime-core";
import { MAJORS, CITIES } from "../../../tools/constant";
import { getBase64 } from "../../../tools/functions";
import { ElMessage } from "element-plus";
export default {
  setup() {
    let headshot = ref("");
    let username = ref("");
    let phone = ref("");
    let birthday = ref("");
    let major = ref("");
    let city = ref([]);
    let grade = ref("");
    let introduction = ref("");

    let majors = MAJORS;
    let cities = CITIES;

    onMounted(() => {
      getUserInfo(localStorage.getItem("user_id")).then((result) => {
        const userinfo = result.data;
        console.log(userinfo);
        headshot.value = userinfo.HEADSHOT;
        username.value = userinfo.USERNAME;
        phone.value = userinfo.PHONE;
        birthday.value = userinfo.BIRTHDAY;
        city.value = userinfo.CITY.split(" ");
        major.value = userinfo.MAJOR.split(" ");
        grade.value = userinfo.GRADE;
        introduction.value = userinfo.INTRODUCTION;
      });
    });

    // 上传头像
    let isChange = ref(false);
    const changeImg = (e) => {
      isChange.value = true;
      getBase64(e.target.files[0]).then((res) => {
        headshot.value = res;
      });
    };

    // 保存头像
    const updateHeadshot = () => {
      saveHeadshot({
        imgdata: headshot.value,
      }).then((result) => {
        ElMessage({ message: "保存成功,刷新网页查看修改效果。", type: "success" });
        isChange.value = false;
        localStorage.setItem("headshot", result.data);
      });
    };

    // 保存基本信息
    const saveBaseInfo = () => {
      updateUserInfo({
        username: username.value,
        phone: phone.value,
        birthday: birthday.value,
        major: major.value[0] + " " + major.value[1] + " " + major.value[2],
        grade: grade.value,
        city: city.value[0] + " " + city.value[1],
        introduction: introduction.value,
      }).then((result) => {
        localStorage.setItem("major", major.value[2]);
        localStorage.setItem("username", username.value);
        ElMessage({
          message: "修改成功！",
          type: "success",
        });
      });
    };

    return {
      headshot,
      username,
      phone,
      birthday,
      major,
      city,
      majors,
      grade,
      cities,
      introduction,
      saveBaseInfo,
      changeImg,
      isChange,
      updateHeadshot,
    };
  },
  components: {
    Card,
  },
};
</script>

<style>
</style>