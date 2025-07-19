<script setup>
import { inject, ref } from 'vue'


const message = inject("socketMessage")
const userInfo = inject("userInfo")
const chatMessage = ref("")
const socket = inject("socket")

const setUserInfo = (name) => {
  socket.send(JSON.stringify({ type: "setUserInfo", data: { userInfo: { name: name } } }))
}

const sendChat = () => {
  socket.send(JSON.stringify({ type: "chat", data: { chat: chatMessage.value } }))
  chatMessage.value = ""
}
</script>

<template>
  <div class="container">
    <div class="operation">
      <div>
        <label>
          用户名
          <input type="text" v-model="userInfo.name" @blur="setUserInfo(userInfo.name)" />
        </label>
      </div>
    </div>
    <div class="box">
      <div class="chat-box">
        <label>
          发送消息
          <textarea class="chat-input" type="text" v-model="chatMessage"></textarea>
        </label>
        <div>
          <button @click="sendChat(chatMessage)">发送</button>
        </div>
      </div>
      <ul class="chat-list">
        <li v-for="(item, index) of message" :key="index">
          <div>
            <p>{{ item.timestamp }}</p>
            <div v-if="item.text.type == 'newUserInfo'">
              <p>
                <span class="new-name">{{ item.sender }}</span>
                已连接
              </p>
            </div>
            <div v-else-if="item.text.type == 'setUserInfo'">
              <p>
                <span class="old-name">{{ item.text.data.oldUserInfo.name }}</span>
                更新用户名为
                <span class="new-name">{{ item.text.data.userInfo.name }}</span>
              </p>
            </div>
            <div v-else-if="item.text.type == 'chat'">
              <p>
                <span class="chat-name">{{ item.sender }}</span>
                :
                <span class="chat-message">{{ item.text.data.chat }}</span>
              </p>
            </div>
            <div v-else-if="item.text.type == 'roll'">
              <p>
                <span class="operate-name">{{ item.sender }}</span>
                从
                <span class="from-list">{{ item.text.data.rollResult.fromList }}</span>
                抽取了
                <span class="selected-list">{{ item.text.data.rollResult.selectedList }}</span>
              </p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: row;
  height: 100%;
}

.operation {
  width: 30%;
  height: 100%;
  background-color: #f0f0f0;
}

.box {
  width: 70%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.chat-box {
  height: 30%;
  width: 100%;
  display: flex;
}

.chat-box textarea {
  height: 50%;
}

.chat-box label {
  width: 50%;
  display: flex;
  flex-direction: column;
}

.chat-list {
  height: 80%;
  width: 100%;
  overflow-y: scroll;
}

.old-name {
  color: #ff0000;
}

.new-name {
  color: #00ff00;
}

.chat-name {
  color: #0000ff;
}

.operate-name {
  color: #ff00ff;
}

.from-list {
  color: #aaaa00;
}

.selected-list {
  color: #00aaaa;
}

.chat-message {
  word-wrap: break-word;
  white-space: pre-line;
}
</style>
