import {
  createApp
} from 'vue'
import App from './App.vue'

const app = createApp(App)

// css
import '@/assets/css/app.css'

// tailwindcss
import '@/assets/css/tailwind.css'

// element-ui
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
app.use(ElementPlus, {
  locale: zhCn
})

// iconpark
import {
  install
} from '@icon-park/vue-next/es/all'
import '@icon-park/vue-next/styles/index.css'

// 路由模块
import router from '@/router/index.js'
app.use(router)

install(app, 'i')


app.mount('#app')