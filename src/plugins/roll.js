import { ref } from "vue"

export default {
  install: (app) => {

    const rollTargetString = ref("")
    const rollFromList = ref([])
    const rollSelectedCount = ref(1)
    const rollSelectedList = ref([])

    app.config.globalProperties.$rollTargetString = rollTargetString
    app.config.globalProperties.$rollFromList = rollFromList
    app.config.globalProperties.$rollSelectedCount = rollSelectedCount
    app.config.globalProperties.$rollSelectedList = rollSelectedList
    app.provide("rollTargetString", rollTargetString)
    app.provide("rollFromList", rollFromList)
    app.provide("rollSelectedCount", rollSelectedCount)
    app.provide("rollSelectedList", rollSelectedList)
  }
}
