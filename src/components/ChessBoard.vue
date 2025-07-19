<script setup>
import { onMounted, useTemplateRef } from 'vue'


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
    <canvas ref="chessBoard" :width="gridSize * 10" :height="gridSize * 12"></canvas>
  </div>
</template>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  display: flex;
}

</style>
