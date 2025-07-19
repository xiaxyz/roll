<script setup>
import { computed, inject } from 'vue';


const socket = inject("socket")


const targetString = inject("targetString")

const fromListIndex = inject("fromListIndex")
const selectedCount = inject("selectedCount")
const selectedList = inject("selectedList")

const targetList = computed(() => {
  return targetString.value.split("\n").filter(item => item !== "")
})

const allFrom = computed(() => {
  return fromListIndex.value.length == targetList.value.length
})

const toggleAll = () => {
  if (fromListIndex.value.length === targetList.value.length) {
    fromListIndex.value = []
  } else {
    fromListIndex.value = targetList.value.map((_, index) => { return index });
  }
}

const getAllUser = () => {
  let message = {
    type: "getAllUserInfo",
    data: {}
  }
  socket.send(JSON.stringify(message))
}

const shuffle = () => {
  let arr = [...fromListIndex.value]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  selectedList.value = arr.slice(0, selectedCount.value).map((value) => { return targetList.value[value] })
  let fromList = fromListIndex.value.map((value) => { return targetList.value[value] })
  let message = {
    type: "roll",
    data: {
      rollResult: {
        fromCount: fromListIndex.value.length,
        fromList: fromList,
        selectedCount: selectedCount.value,
        selectedList: selectedList.value
      }
    }
  }
  socket.send(JSON.stringify(message))
}

</script>

<template>
  <div class="container">
    <div class="set-target">
      <div class="show-input">
        <div class="load-input">
          <button @click="getAllUser()">获取已连接所有用户</button>
        </div>
        <textarea class="input-target" v-model="targetString"></textarea>
      </div>
      <div class="show-target">
        <label>
          <input type="checkbox" v-model="allFrom" @change="toggleAll()">
          全选
        </label>
        <ul class="target-list">
          <li v-for="(item, index) of targetList" :key="index">
            <label class="target-name">
              <input type="checkbox" v-model="fromListIndex" :value="index">
              {{ item }}
            </label>
          </li>
        </ul>
      </div>
    </div>
    <div class="select-target">
      <label>抽取个数</label>
      <select v-model="selectedCount">
        <option v-for="(item, index) of Array.from({ length: fromListIndex.length }, (_, i) => { return i + 1 })"
          :key="index" :value="item">{{ item }}</option>
      </select>
      <button @click="shuffle()">启动！</button>
      <p>抽取结果：<span class="selected-result">{{ selectedList }}</span></p>
    </div>
  </div>
</template>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  display: flex;
}

.set-target {
  width: 50%;
  display: flex;
}

.show-input {
  width: 50%;
}

.load-input {
  height: 10%;
}

.input-target {
  height: 80%;
  width: 100%;
}

.show-target {
  width: 50%;
  display: flex;
  flex-direction: column;
}

.target-list {
  height: 100%;
  overflow-y: scroll;
  width: 100%;
}

.target-name {
  display: flex;
  width: 100%;
}

.selected-result {
  color: #00aaaa;
}

ul {
  margin: 0;
  padding: 0 5%;
}

li {
  list-style: none;
}
</style>
