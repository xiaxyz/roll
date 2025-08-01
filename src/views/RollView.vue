<script setup>
import { computed, inject } from 'vue';


const socket = inject("socket")


const targetString = inject("rollTargetString")

const fromList = inject("rollFromList")
const selectedCount = inject("rollSelectedCount")
const selectedList = inject("rollSelectedList")

const targetList = computed(() => {

  return [...new Set(targetString.value.split('\n').filter(item => item.trim() !== ""))]
})

const allFrom = computed(() => {
  return fromList.value.length == targetList.value.length
})

const toggleAll = () => {
  if (fromList.value.length === targetList.value.length) {
    fromList.value = []
  } else {
    fromList.value = targetList.value.map((value) => { return value });
  }
}

const getAllUser = () => {
  let message = {
    type: "getRollAllUserInfo",
    data: {}
  }
  socket.send(JSON.stringify(message))
}

const getDefault = () => {
  targetString.value += "\n测试1\n测试2\n测试3\n测试4\n测试5\n测试6\n测试7\n测试8\n测试9\n测试10"
}

const shuffle = () => {
  let arr = [...fromList.value]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  selectedList.value = arr.slice(0, selectedCount.value).map((value) => { return value })
  let message = {
    type: "roll",
    data: {
      rollResult: {
        fromCount: fromList.value.length,
        fromList: fromList.value,
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
          <button @click="getDefault()">获取预设</button>
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
              <input type="checkbox" v-model="fromList" :value="item" checked>
              {{ item }}
            </label>
          </li>
        </ul>
      </div>
    </div>
    <div class="select-target">
      <label>抽取个数</label>
      <select v-model="selectedCount">
        <option v-for="(item, index) of Array.from({ length: fromList.length }, (_, i) => { return i + 1 })"
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
