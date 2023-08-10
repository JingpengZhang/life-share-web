export const LOSTTYPE = [{
  value: '寻物',
  label: '寻物'
}, {
  value: '招领',
  label: '招领'
}]

export const LOSTSTATE = [{
  value: '未解决',
  label: '未解决'
}, {
  value: '已解决',
  label: '已解决'
}]

export const LINK_WAY_TYPE = [
  {
    value:'0',
    label: '自定义'
  },
  {
  value:'1',
  label:'默认手机号'
},{
  value:'2',
  label: '默认邮箱'
}]

export const CATE_COLORS = [{
    value: 'slate',
    label: '深蓝灰色'
  }, {
    value: 'gray',
    label: '灰色'
  },
  {
    value: 'zinc',
    label: '锌色'
  },
  {
    value: 'neutral',
    label: '中性色'
  },

  {
    value: 'stone',
    label: '石青色'
  },
  {
    value: 'red',
    label: '红色'
  },
  {
    value: 'orange',
    label: '橘色'
  },
  {
    value: 'amber',
    label: '琥珀色'
  },
  {
    value: 'yellow',
    label: '黄色'
  },
  {
    value: 'lime',
    label: '酸橙绿色'
  },
  {
    value: 'green',
    label: '绿色'
  },
  {
    value: 'emerald',
    label: '翠绿色'
  },
  {
    value: 'teal',
    label: '深蓝绿色'
  },
  {
    value: 'cyan',
    label: '蓝绿色'
  },
  {
    value: 'sky',
    label: '天空蓝'
  },
  {
    value: 'blue',
    label: '蓝色'
  },
  {
    value: 'indigo',
    label: '靛蓝色'
  },
  {
    value: 'violet',
    label: '紫罗兰色'
  },
  {
    value: 'purple',
    label: '紫色'
  },
  {
    value: 'fuchsia',
    label: '紫红色'
  },
  {
    value: 'pink',
    label: '粉色'
  },
  {
    value: 'rose',
    label: '玫瑰红'
  },

]

export const MAJORS = [{
  value: '工学',
  label: '工学',
  children: [{
    value: '计算机类',
    label: '计算机类',
    children: [{
        value: '计算机科学与技术',
        label: '计算机科学与技术'
      }, {
        value: '软件工程',
        label: '软件工程'
      }, {
        value: '网络工程',
        label: '网络工程'
      }, {
        value: '信息安全',
        label: '信息安全'
      }, {
        value: '物联网工程',
        label: '物联网工程'
      }, {
        value: '数字媒体技术',
        label: '数字媒体技术'
      },
      {
        value: '智能科学与技术',
        label: '智能科学与技术'
      },
      {
        value: '空间信息与数字技术',
        label: '空间信息与数字技术'
      },
      {
        value: '电子与计算机工程',
        label: '电子与计算机工程'
      },
    ]
  }, {
    value: '土木类',
    label: '土木类',
    children: [{
      value: '土木工程',
      label: '土木工程'
    }, {
      value: '建筑环境与能源应用工程',
      label: '建筑环境与能源应用工程'
    }, {
      value: '给排水科学与工程',
      label: '给排水科学与工程'
    }, {
      value: '建筑电气与智能化',
      label: '建筑电气与智能化'
    }, {
      value: '城市地下空间工程',
      label: '城市地下空间工程'
    }, {
      value: '道路桥梁与渡河工程',
      label: '道路桥梁与渡河工程'
    }]
  }]
}]

export const CITIES = [{
    value: "安徽省",
    label: "安徽省",
    children: [{
        value: "合肥市",
        label: "合肥市",
      },
      {
        value: "芜湖市",
        label: "芜湖市",
      },
      {
        value: "蚌埠市",
        label: "蚌埠市",
      },
      {
        value: "淮南市",
        label: "淮南市",
      },
      {
        value: "马鞍山市",
        label: "马鞍山市",
      },
      {
        value: "淮北市",
        label: "淮北市",
      },
      {
        value: "铜陵市",
        label: "铜陵市",
      },
      {
        value: "安庆市",
        label: "安庆市",
      },
      {
        value: "黄山市",
        label: "黄山市",
      },
      {
        value: "滁州市",
        label: "滁州市",
      },
      {
        value: "阜阳市",
        label: "阜阳市",
      },
      {
        value: "宿州市",
        label: "宿州市",
      },
      {
        value: "六安市",
        label: "六安市",
      },
      {
        value: "亳州市",
        label: "亳州市",
      },
      {
        value: "池州市",
        label: "池州市",
      },
      {
        value: "宣城市",
        label: "宣城市",
      },
    ]
  }


]

export default {

  LOSTTYPE,
  LOSTSTATE
}