<script setup>
import { inject, onMounted } from 'vue';


const socket = inject("socket")
const allChessRoom = inject("allChessRoom")

onMounted(() => {
  socket.send(JSON.stringify({ type: "getAllChessRoom", data: {} }));
});


const createRoom = () => {
  let message = {
    type: "createChessRoom",
    data: {}
  }
  socket.send(JSON.stringify(message))
}


</script>

<template>
  <div class="container">
    <div class="operate">
      <p>房间列表</p>
      <button @click="createRoom()">创建房间</button>
    </div>
    <ul>
      <li v-for="room in allChessRoom" :key="room.id">
        {{ room.name }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
}
</style>
