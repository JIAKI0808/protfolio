import { createApp } from 'vue'
import App from './App.vue'
import router from './router'   // ① 引入路由
import './assets/styles/adapter.js'   // 最朴素写法，不用 @ 别名
import './assets/styles/global-font.scss'

const app = createApp(App)
app.use(router)                 // ② 使用路由
app.mount('#app')