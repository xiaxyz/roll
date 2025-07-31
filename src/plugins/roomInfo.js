import { ref } from "vue"

export default {
  install: (app) => {

    const joinedRoom = ref({})

    app.config.globalProperties.$joinedRoom = joinedRoom
    app.provide("joinedRoom", joinedRoom)
  }
}
