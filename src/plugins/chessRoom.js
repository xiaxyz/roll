import { ref } from "vue"

export default {
  install: (app) => {

    const allChessRoom = ref([])

    app.config.globalProperties.$allChessRoom = allChessRoom
    app.provide("allChessRoom", allChessRoom)
  }
}
