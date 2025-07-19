<script setup>
import ChessBoard from '@/components/ChessBoard.vue';
// import { inject } from 'vue';


// const socket = inject("socket")

</script>

<template>
  <div class="container">
    <div class="session">
      <ChessBoard />
    </div>
    <div class="room"></div>
  </div>
</template>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  display: flex;
}

.session {
  width: 50%;
  height: 100%;
}

.room {
  width: 50%;
  height: 100%;
}
</style>
