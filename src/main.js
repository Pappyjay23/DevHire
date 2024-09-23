import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'
import router from './router'
import { OhVueIcon, addIcons } from 'oh-vue-icons'
import {
  MdCloseTwotone,
  RiMenuFill,
  RiMenu2Line,
  IoLocationSharp,
  MdWarningRound,
  BiArrowLeftShort,
  BiArrowUpRight,
  FaEdit,
  BiTrashFill,
  BiEyeFill,
  BiEyeSlashFill
} from 'oh-vue-icons/icons'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'

const app = createApp(App)
const pinia = createPinia()

pinia.use(piniaPluginPersistedstate)

addIcons(
  MdCloseTwotone,
  RiMenuFill,
  RiMenu2Line,
  IoLocationSharp,
  MdWarningRound,
  BiArrowLeftShort,
  BiArrowUpRight,
  FaEdit,
  BiTrashFill,
  BiEyeFill,
  BiEyeSlashFill
)

app.use(router)
app.use(pinia)
app.use(Toast)

app.component('v-icon', OhVueIcon)

app.mount('#app')
