export default {
  install: (app, url) => {

    const socket = new WebSocket(url)

    app.config.globalProperties.$socket = socket
    app.provide('socket', socket)

    socket.onopen = () => {
      console.log("已连接")
    }

  }
}
