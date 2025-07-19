<script setup>
import { inject, onBeforeUnmount } from 'vue';
import { RouterLink, RouterView } from 'vue-router'

const socket = inject("socket")
const userInfo = inject("userInfo")
const message = inject("socketMessage")
const targetString = inject("targetString")

const socketOpen = () => {
  socket.send(JSON.stringify({ type: "getUserInfo", data: {} }))
}

socket.addEventListener("open", socketOpen)

const socketMessage = (event) => {
  let data = JSON.parse(event.data)
  if (data.text.type == "getUserInfo") {
    userInfo.value = JSON.parse(JSON.stringify(data.text.data.userInfo))
    return
  }
  else if (data.text.type == "newUserInfo") {
    message.value.push(data)
  }
  else if (data.text.type == "setUserInfo") {
    message.value.push(data)
  }
  else if (data.text.type == "chat") {
    message.value.push(data)
  }
  else if (data.text.type == "roll") {
    message.value.push(data)
  }
  else if (data.text.type == "getAllUserInfo") {
    targetString.value += "\n" + data.text.data.allUserInfo.map((value) => { return `${value.name}` }).join("\n")
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
}

nav a:hover {
  background-color: #ffffdf;
}

nav a.router-link-exact-active {
  color: #00af00;
  background-color: #ffffef;
}

nav a.router-link-exact-active:hover {
  background-color: #ffffef;
}
</style>
