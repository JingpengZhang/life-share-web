<template>
  <div class="flex gap-6 flex-col lg:flex-row">
    <!-- 基本信息 -->
    <card-with-line class="w-full lg:w-fit">
      <template #title> 基本信息 </template>
      <template #funs>
        <router-link
          tag="button"
          class="
            w-9
            h-9
            shadow-lg shadow-blue-400
            flex
            items-center
            justify-center
            text-white
            bg-blue-600
            rounded-full
            hover:-translate-y-1 hover:shadow-none
            transition-all
          "
          to="/user_center/editinfo"
        >
          <i-edit theme="outline" size="20" />
        </router-link>
      </template>
      <template #content>
        <div class="px-16">
          <!-- 头像以及用户名 -->
          <div class="flex flex-col items-center gap-6">
            <!-- 头像 -->
            <div class="h-24 w-24 shadow-2xl">
              <img
                class="coverImg rounded-lg"
                :src="headshot"
                :alt="username"
              />
            </div>
            <!-- 用户名 -->
            <span class="text-xl text-blue-600">{{ username }}</span>
          </div>
          <!-- 其他信息 -->
          <div class="mt-10 flex flex-col gap-4">
            <div
              class="flex gap-4 text-gray-500 items-center hover:text-blue-600"
            >
              <i-level theme="outline" size="20" />
              <span class="text-gray-500 text-sm">{{ grade }} 级</span>
            </div>
            <div
              class="flex gap-4 text-gray-500 items-center hover:text-blue-600"
            >
              <i-degree-hat theme="outline" size="20" />
              <span class="text-gray-500 text-sm">{{ major }}</span>
            </div>
            <div
              class="flex gap-4 text-gray-500 items-center hover:text-blue-600"
            >
              <i-cake theme="outline" size="20" />
              <span class="text-gray-500 text-sm">{{ birthday }}</span>
            </div>
            <div
              class="flex gap-4 text-gray-500 items-center hover:text-blue-600"
            >
              <i-local theme="outline" size="20" />
              <span class="text-gray-500 text-sm">{{ city }}</span>
            </div>
            <div
              class="flex gap-4 text-gray-500 items-center hover:text-blue-600"
            >
              <i-mail theme="outline" size="20" />
              <span class="text-blue-600 text-sm">{{ email }}</span>
            </div>
            <div
              class="flex gap-4 text-gray-500 items-center hover:text-blue-600"
            >
              <i-phone-telephone theme="outline" size="20" />
              <span class="text-gray-500 text-sm">{{ phone }}</span>
            </div>
            <div
              class="flex gap-4 text-gray-500 items-center hover:text-blue-600"
            >
              <i-calendar-three theme="outline" size="20" />
              <span class="text-gray-500 text-sm">{{ create_time }}</span>
            </div>
          </div>
        </div>
      </template>
    </card-with-line>
    <!-- 个人介绍 -->
    <card-with-line class="flex-auto">
      <template #title> 个人介绍 </template>
      <template #content>
        {{ introduction }}
      </template>
    </card-with-line>
  </div>
</template>

<script>
import CardWithLine from "../../../components/CardWithLine.vue";
import { onMounted, ref } from "vue";
import { getUserInfo } from "../../../api/user";
import moment from "moment";
export default {
  setup() {
    let headshot = ref("");
    let username = ref("");
    let email = ref("");
    let major = ref("");
    let grade = ref("");
    let birthday = ref("");
    let city = ref("");
    let phone = ref("");
    let create_time = ref("");
    let introduction = ref("");

    onMounted(() => {
      getUserInfo(localStorage.getItem("user_id")).then((result) => {
        let userinfo = result.data;
        headshot.value = userinfo.HEADSHOT;
        username.value = userinfo.USERNAME;
        email.value = userinfo.EMAIL;
        major.value = userinfo.MAJOR.substring(
          userinfo.MAJOR.lastIndexOf(" ") + 1
        );
        grade.value = moment(userinfo.GRADE).format("YYYY");
        birthday.value = moment(userinfo.BIRTHDAY).format("YYYY.MM.DD");
        city.value = userinfo.CITY;
        phone.value = userinfo.PHONE;
        create_time.value = moment(userinfo.CREATE_TIME).format(
          "YYYY-MM-DD HH:mm:ss"
        );
        introduction.value = userinfo.INTRODUCTION;
      });
    });

    return {
      headshot,
      username,
      email,
      major,
      grade,
      birthday,
      city,
      phone,
      create_time,
      introduction,
    };
  },
  components: {
    CardWithLine,
  },
};
</script>

<style>
</style>