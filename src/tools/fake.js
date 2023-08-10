// 个人信息
export const USERINFO = {
  id: 1,
  headshot: 'https://5b0988e595225.cdn.sohucs.com/q_70,c_zoom,w_640/images/20180320/d817dd9a52e545af81c34c1ca03bb159.jpeg',
  email: 'Example@email.com',
  username: 'ExampleUsername',
  realname: 'ExampleRealname',
  phone: '18712345678',
  birthday: '2000-01-01',
  school: '安徽化工大学',
  department: '计算机系',
  major: '网络工程',
  grade: '2018',
  introduction: '<p>我的座右铭是：花自己的时间为大家生产快乐！我不去想身后会不会袭来寒风冷雨，既然目标是伟岸的大山，那么留给世界的就只能是认真塌实的足迹；我不去想未来的道路是平坦还是泥泞，只要心中充满执着和热爱一切都在意料之中！</p><p>记得阿基米德以前说过一句话：给我一个支点，我会翘起整个地球！当然了我的口气没有那么大我想要说的是给我一个舞台，我必须会实现自己的价值，让大家看到我的潜力。</p>',
  reg_time: '2022-03-01'
}

// 书
export const BOOK = {
  id: 1,
  title: '文城',
  pic: 'https://img12.360buyimg.com/n11/jfs/t1/218063/23/1826/273699/61767bfaEc74a88ec/066de9740d4ed1a1.jpg',
  author: '余华',
  press: '北京十月文艺出版社',
  publication_time: '2021-3',
  page_num: 348,
  ISBN: '9787530221099',
  recommend: '<p>时隔八年，余华全新长篇重磅归来！</p><p>人生就是自己的往事和他人的序章</p><p>时代的洪流推着每个人做出各自的选择。</p><p>这是一个荒蛮的年代，结束的尚未结束，开始的尚未开始。</p>',
  post_time: '2022-03-17 15:08:27',
  user_id: 1
}

// 讨论
export const DISCUSSION = {
  id: 1,
  title: 'vue能否胜任比较大型的web应用的开发？',
  content: '最近在看vue.js, vue+webpack的方式看起来很不错，之前一直在用angular做SPA，但是angular跟webpack，bowserify， requirejs等模块化的东西混合用起来都很蛋疼，都会增加不少项目的复杂度，在组件方面，angular有很多不错的组件（ui-grid等）， vue的开源组件好像不多，不知用更加轻量的vue.js去代替angular做spa相关的东西是否合理？',
  post_time: '2022-03-14 09:50:14',
  user_id: 1
}

// 失物
export const LOST = {
  id: 1,
  user_id: 1,
  name: '钥匙串',
  pic: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fi05.c.aliimg.com%2Fimg%2Fibank%2F2012%2F647%2F614%2F656416746_1229097843.jpg&refer=http%3A%2F%2Fi05.c.aliimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1650079397&t=6eacd7ef0324c14680cfcd30b3d93554',
  type: '寻物', // 0 - 寻物 ， 1 - 招领
  state: '未解决', // 0 - 已解决 ， 1 - 未解决
  linkman: '龚先生',
  link_way: '18712349876',
  description: '打球的时候放旁边，回来的时候不见了，是白色的，望拾到者归还，谢谢。打球的时候放旁边，回来的时候不见了，是白色的，望拾到者归还，谢谢。打球的时候放旁边，回来的时候不见了，是白色的，望拾到者归还，谢谢。',
  postition: '学校风雨操场',
  post_time: '2022-3-16 12:02:34'
}



// 学校
export const SCHOOLS = [{
  value: "安徽",
  label: "安徽",
  children: [{
    value: "合肥",
    label: "合肥",
    children: [{
      value: "安徽化工大学",
      label: "安徽化工大学"
    }, ],
  }, ],
}, ]

// 院系
export const DEPARTMENTS = [{
    value: '计算机系',
    label: '计算机系',
  },
  {
    value: '教师教育系',
    label: '教师教育系'
  }
]

// 专业
export const MAJORS = [{
    value: '网络工程',
    label: '网络工程'
  },
  {
    value: '计算机科学与技术',
    label: '计算机科学与技术'
  }
]

// 年级
export const GRADES = [{
    value: '2018',
    label: '2018'
  },
  {
    value: '2017',
    label: '2017'
  },
  {
    value: '2016',
    label: '2016'
  },
  {
    value: '2015',
    label: '2015'
  }
]


// 讨论回复
export const REPLY = {
  id: 1,
  discussion_id:1,
  content: '<p>可以。</p>Vue是一款友好的、多用途且高性能的JavaScript框架，通过尽可能简单的 API 实现响应的数据绑定和组合的视图组件。目前市面上比较火的低代码平台是前端用vue的，相对于传统通过代码开发方式构建应用系统，低代码开发平台具有众多优势，比如MyApps低代码开发平台就有以下特点。1.提供源码低代码开发平台可以提供全部源码，保障用户在不同的应用阶段、不同层次和不同规模的服务需求都能得到满足，确保用户没有任何后顾之忧；用户在全部源码的基础上，可以根据自身需求实现个性化业务场景，极大摆脱对原厂商的依赖。2.技术先进低代码开发平台技术主要体现在三方面：（1）采用业内领先的SpringBoot微服务架构、支持SpringCloud模式，完善了平台的扩增基础，满足了系统快速开发、灵活拓展、无缝集成和高性能应用等综合能力；（2）采用前后端分离模式，前端采购JQ和VUE架构，技术与业务逻辑分离，系统升级不影响公司业务，系统运维升级更方便；（3）采用高可用性架构，通过nginx实现负载均衡、zuul作为网关服务，并且平台分成运行时服务、设计时服务、授权时服务，不同服务执行不同工作，以保证平台性能处于最好状态。',
  post_time: '2022-3-16 10:51:23',
  user_id: 1
}


export default {
  BOOK,
  DISCUSSION,
  LOST,
  USERINFO,
  SCHOOLS,
  DEPARTMENTS,
  MAJORS,
  GRADES,
}