<script setup>
import { inject, onMounted, useTemplateRef } from 'vue'


const joinedRoom = inject("joinedRoom")

const gridSize = 40
const canvas = useTemplateRef("chessBoard")

onMounted(() => {
  drawBoard()
})

const drawBoard = () => {
  canvas.value.Width = canvas.value.clientWidth
  canvas.value.height = canvas.value.clientHeight
  let ctx = canvas.value.getContext("2d")
  ctx.lineWidth = 2
  ctx.beginPath()
  for (let i = 1; i <= 10; ++i) {
    ctx.moveTo(gridSize, i * gridSize)
    ctx.lineTo(gridSize * 9, i * gridSize)
    ctx.stroke()
  }
  for (let i = 1; i <= 9; ++i) {
    ctx.moveTo(i * gridSize, gridSize)
    ctx.lineTo(i * gridSize, gridSize * 5)
    ctx.moveTo(i * gridSize, gridSize * 10)
    ctx.lineTo(i * gridSize, gridSize * 6)
    ctx.stroke()
  }
}

</script>

<template>
  <div class="container">
    <div class="chess-room">
      <p>当前房间: {{ joinedRoom.room.name }}</p>
      <p>当前房间类型: {{ joinedRoom.room.type }}</p>
      <p>当前用户身份: {{ joinedRoom.userType }}</p>
    </div>
    <div class="chess-board">
      <canvas ref="chessBoard" :width="gridSize * 10" :height="gridSize * 12"></canvas>
    </div>
  </div>
</template>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.chess-room {
  width: 50%;
  height: 10%;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
</style>
