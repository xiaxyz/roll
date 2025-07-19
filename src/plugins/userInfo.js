import { ref } from "vue"

export default {
  install: (app) => {

    const userInfo = ref({})

    app.config.globalProperties.$userInfo = userInfo
    app.provide('userInfo', userInfo)
  }
}
