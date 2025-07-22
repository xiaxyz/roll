import { ref } from "vue"

export default {
  install: (app) => {

    const rollTargetString = ref("")
    const rollFromListIndex = ref([])
    const rollSelectedCount = ref(1)
    const rollSelectedList = ref([])

    app.config.globalProperties.$rollTargetString = rollTargetString
    app.config.globalProperties.$rollFromListIndex = rollFromListIndex
    app.config.globalProperties.$rollSelectedCount = rollSelectedCount
    app.config.globalProperties.$rollSelectedList = rollSelectedList
    app.provide("rollTargetString", rollTargetString)
    app.provide("rollFromListIndex", rollFromListIndex)
    app.provide("rollSelectedCount", rollSelectedCount)
    app.provide("rollSelectedList", rollSelectedList)
  }
}
