import { ref } from "vue"

export default {
  install: (app) => {

    const allChessRoom = ref([])
    const joinedRoom = ref({})

    app.config.globalProperties.$allChessRoom = allChessRoom
    app.config.globalProperties.$joinedRoom = joinedRoom
    app.provide("allChessRoom", allChessRoom)
    app.provide("joinedRoom", joinedRoom)
  }
}
