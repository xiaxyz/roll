import { ref } from "vue"

export default {
  install: (app) => {

    const userInfo = ref({})
    const allUserInfo = ref([])

    app.config.globalProperties.$userInfo = userInfo
    app.config.globalProperties.$allUserInfo = allUserInfo
    app.provide("userInfo", userInfo)
    app.provide("allUserInfo", allUserInfo)
  }
}
