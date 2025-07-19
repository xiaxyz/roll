import { ref } from "vue"

export default {
  install: (app) => {

    const socketMessage = ref([])

    app.config.globalProperties.$socketMessage = socketMessage
    app.provide('socketMessage', socketMessage)
  }
}
