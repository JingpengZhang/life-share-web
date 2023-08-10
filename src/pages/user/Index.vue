<template>
  <navigator></navigator>
  <div class="pt-24 page pb-24">
    <div class="card flex flex-col lg:flex-row gap-4">
      <div class="flex gap-4 shrink-0">
        <div class="h-24 w-24 rounded-md overflow-hidden shrink-0">
          <img :src="headshot" alt="" class="coverImg">
        </div>
        <div class="flex flex-col justify-between shrink-0">
          <span class="text-2xl font-semibold">{{ username }}</span>
          <span class="text-xs bg-purple-500 rounded-md px-2 py-1 text-white w-fit">{{ grade }} {{ major }}</span>
          <span class="text-sm text-slate-400">{{ city }}</span>
        </div>
      </div>

      <div class="">
        <p class="line-clamp-4 ">
          {{ introduction }}
        </p>
      </div>
    </div>
    <div class="card mt-5">
      <div class="flex border-b justify-between items-end">
        <div class="flex gap-2 lg:gap-5">
          <router-link :to="'/user/'+id+'/share'"
                       class="user-normal text-sm px-3"
                       active-class="user-active"
          >
            <i-sunny theme="outline" size="18"/>
            分享
          </router-link>
          <router-link :to="'/user/'+id+'/ask'"
                       class="user-normal text-sm px-3"
                       active-class="user-active"
          >
            <i-two-ellipses theme="outline" size="18"/>
            问题
          </router-link>
          <router-link :to="'/user/'+id+'/answer'"
                       class="user-normal text-sm px-3"
                       active-class="user-active"
          >
            <i-comment-one theme="outline" size="18"/>
            回答
          </router-link>
          <router-link :to="'/user/'+id+'/lost'"
                       class="user-normal text-sm px-3"
                       active-class="user-active"
          >
            <i-broadcast theme="outline" size="18"/>
            失物招领
          </router-link>
          <router-link :to="'/user/'+id+'/book'"
                       class="user-normal text-sm px-3"
                       active-class="user-active"
          >
            <i-thumbs-up theme="outline" size="18"/>
            推荐
          </router-link>
        </div>

      </div>
      <div class="w-full mt-8">
        <router-view></router-view>
      </div>

    </div>
  </div>
  <footers></footers>
</template>

<script>
import Navigator from "../../components/Navigator.vue";
import Footers from "../../components/Footer.vue";
import {onMounted, ref} from "vue";
import {getUserInfo} from "@/api/user";
import moment from "moment";

export default {
  name: "Index",
  props: {
    id: {type: String, default: ''}
  },
  setup(props){
    let headshot = ref('')
    let username = ref('')
    let grade = ref('')
    let major = ref('')
    let city = ref('')
    let introduction = ref('')

    onMounted(()=>{
      getUserInfo(props.id).then(result=>{
        headshot.value = result.data.HEADSHOT
        username.value = result.data.USERNAME
        grade.value = result.data.GRADE
        grade.value = moment(grade.value).format("YYYY")
        major.value = result.data.MAJOR
        city.value = result.data.CITY
        introduction.value = result.data.INTRODUCTION
      })
    })

    return {
      headshot,
      username,
      grade,
      major,
      city,
      introduction
    }
  },
  components: {
    Footers, Navigator
  },
}
</script>

<style lang="less" scoped>
.page {
  width: 1200px;
  margin: 0 auto;
  @media screen and (max-width: 768px) {
    width: 90%;
  }
}
</style>