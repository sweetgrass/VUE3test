import { createApp,reactive } from 'vue'
import App from './App.vue'
import './index.css'
import router from './router'
import store from './store'

let myapp = createApp(App);
myapp.use(router);
myapp.use(store);
myapp.mount('#app');