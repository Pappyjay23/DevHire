import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { OhVueIcon, addIcons } from 'oh-vue-icons'
import {
  MdCloseTwotone,
  RiMenuFill,
  RiMenu2Line,
  IoLocationSharp,
  MdWarningRound
} from 'oh-vue-icons/icons'

const app = createApp(App)

addIcons(MdCloseTwotone, RiMenuFill, RiMenu2Line, IoLocationSharp, MdWarningRound)

app.use(router)

app.component('v-icon', OhVueIcon)

app.mount('#app')
