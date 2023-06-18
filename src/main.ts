import { createApp } from 'vue'
import { ElInput, ElButton } from 'element-plus'
import 'element-plus/dist/index.css'
import 'view-ui-plus/dist/styles/viewuiplus.css'

import './components/index.scss'
import { registerComponents } from './index'
import { Input } from 'view-ui-plus'

import App from './App.vue'

registerComponents({
  input: ElInput,
  input2: Input
})

createApp(App).use(ElButton).mount('#app')