<script setup>
import { inject, onBeforeUnmount } from 'vue';
import { RouterLink, RouterView } from 'vue-router'

const socket = inject("socket")
const userInfo = inject("userInfo")
const allUserInfo = inject("allUserInfo")
const message = inject("socketMessage")
const rollTargetString = inject("rollTargetString")
const allChessRoom = inject("allChessRoom")
const joinedRoom = inject("joinedRoom")

const socketOpen = () => {
  socket.send(JSON.stringify({ type: "createUserInfo", data: {} }))
}

socket.addEventListener("open", socketOpen)

const socketMessage = (event) => {
  let data = JSON.parse(event.data)
  if (data.text.type == "createUserInfo") {
    userInfo.value = data.text.data.userInfo
  }
  else if (data.text.type == "newUserInfo") {
    message.value.push(data)
  }
  else if (data.text.type == "setUserInfo") {
    message.value.push(data)
  }
  else if (data.text.type == "getAllUserInfo") {
    allUserInfo.value = data.text.data.allUserInfo
  }
  else if (data.text.type == "chat") {
    message.value.push(data)
  }
  else if (data.text.type == "roll") {
    message.value.push(data)
  }
  else if (data.text.type == "getRollAllUserInfo") {
    rollTargetString.value += "\n" + data.text.data.allUserInfo.map((value) => { return `${value.name}` }).join("\n")
  }
  else if (data.text.type == "getAllChessRoom") {
    allChessRoom.value = data.text.data.allChessRoom
  }
  else if (data.text.type == "createChessRoom") {
    joinedRoom.value.room = data.text.data.room
    joinedRoom.value.userType = data.text.data.userType
    allChessRoom.value.push(joinedRoom.value)
  }
  else if (data.text.type == "setChessRoom") {
    if (joinedRoom.value?.room.id == data.text.data.room.id) {
      joinedRoom.value.room = data.text.data.room
    }
    allChessRoom.value = allChessRoom.value.map(room => {
      if (room.id === joinedRoom.value.room.id) {
        return joinedRoom.value.room
      }
      return room
    })
  }
  else if (data.text.type == "newChessRoom") {
    allChessRoom.value.push(data.text.data.room)
  }
  else if (data.text.type == "joinChessRoom") {
    joinedRoom.value.room = data.text.data.room
    joinedRoom.value.userType = data.text.data.userType
  }
  else if (data.text.type == "leaveChessRoom") {
    joinedRoom.value = {}
  }
  else if (data.text.type == "deleteChessRoom") {
    allChessRoom.value = allChessRoom.value.filter(room => room.id != data.text.data.room.id)
    if (joinedRoom.value.room && joinedRoom.value.room.id == data.text.data.room.id) {
      joinedRoom.value = {}
    }
  }
  else {
    console.warn("Unknown message:", data)
  }
}

socket.addEventListener('message', socketMessage)

onBeforeUnmount(() => {
  socket.removeEventListener("open", socketOpen)
  socket.removeEventListener("message", socketMessage)
})


</script>

<template>
  <div class="container">
    <div class="nav">
      <nav>
        <RouterLink to="/chat">
          <div class="nav-item">聊天</div>
        </RouterLink>
        <RouterLink to="/roll">
          <div class="nav-item">抽人</div>
        </RouterLink>
      </nav>
    </div>
    <div class="router-view">
      <RouterView />
    </div>
  </div>
</template>

<style scoped>
.contianer {
  width: 100vw;
  height: 100vh;
}

.router-view {
  height: 90vh;
}

.nav {
  height: 10vh;
}

nav {
  width: 100%;
  height: 100%;
  display: flex;
  background-color: #e0e0e0;
}


nav a {
  padding: 0 5%;
  height: 100%;
  color: var(--color-text);
  display: flex;
  text-decoration: none;
  align-items: center;
  background-color: #dfffdf;
  box-sizing: border-box;
}

nav a:hover {
  background-color: #ffffdf;
}

nav a.router-link-exact-active {
  color: #00af00;
  background-color: #ffffef;
  border-color: #50a0f0;
  border-style: double;
  border-width: 3px;
}

nav a.router-link-exact-active:hover {
  background-color: #ffffef;
}
</style>
