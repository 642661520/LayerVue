import { createApp } from 'vue'
import App from './App.vue'
import '../packages/theme/index.css'
import LayerVue from '../packages/index'
const app = createApp(App)
app.use(LayerVue)
app.mount('#app')