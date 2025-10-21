import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './styles/dark.scss'

import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件
import '@leafer-in/resize' // 导入缩放插件
import '@leafer-in/export' // 导入导出插件
import '@leafer-in/text-editor' // 导入文本编辑插件
import '@leafer-in/filter'  // 导入滤镜插件

createApp(App).use(ElementPlus).mount('#app')
