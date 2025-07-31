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

const joinRoom = (room) => {
  let message = {
    type: "joinChessRoom",
    data: {
      room: room
    }
  }
  socket.send(JSON.stringify(message))
}

</script>

<template>
  <div class="container">
    <div class="operate">
      <p>房间列表</p>
      <button @click="createRoom()">创建房间</button>
      <ul class="room-list">
        <li class="room-item" v-for="room in allChessRoom" :key="room.id">
          <p>{{ room.name }}</p>
          <button @click="joinRoom(room)">加入房间</button>
        </li>
      </ul>
    </div>
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

.operate {
  width: 30%;
  height: 100%;
}

.room-item {
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
