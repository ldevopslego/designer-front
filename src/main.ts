import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import piniaStore from './store'
import { message as Message } from 'ant-design-vue'
// import './index.css'
// import ArcoVue from '@arco-design/web-vue'
// // 额外引入图标库
// import '@arco-design/web-vue/dist/arco.css'
// 支持SVG
import 'virtual:svg-icons-register'
import '@/permission'
import { registerGlobComp } from './config/registerGlobComp'

const app = createApp(App)

registerGlobComp(app)

app.use(router).use(piniaStore).mount('#app')

app.config.globalProperties.$message = Message
