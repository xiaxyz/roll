import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import socket from './plugins/socket'
import socketMessage from './plugins/socketMessage'
import userInfo from './plugins/userInfo'
import roll from './plugins/roll'

const app = createApp(App)

app.use(router)

app.use(socket, "ws://192.168.1.117:8080")
app.use(socketMessage)
app.use(userInfo)
app.use(roll)

app.mount('#app')
