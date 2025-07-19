import { ref } from "vue"

export default {
  install: (app) => {

    const targetString = ref("")
    const fromListIndex = ref([])
    const selectedCount = ref(1)
    const selectedList = ref([])

    app.config.globalProperties.$targetString = targetString
    app.config.globalProperties.$fromListIndex = fromListIndex
    app.config.globalProperties.$selectedCount = selectedCount
    app.config.globalProperties.$selectedList = selectedList
    app.provide("targetString", targetString)
    app.provide("fromListIndex", fromListIndex)
    app.provide("selectedCount", selectedCount)
    app.provide("selectedList", selectedList)
  }
}
