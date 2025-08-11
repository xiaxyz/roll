<script setup>
import ChessBoard from '@/components/ChessBoard.vue';
import ChessRoom from '@/components/ChessRoom.vue';
import { inject } from 'vue';


const joinedRoom = inject("joinedRoom")

</script>

<template>
  <div class="container">
    <div class="session" v-if="Object.keys(joinedRoom).length > 0">
      <ChessBoard></ChessBoard>
    </div>
    <div class="room" v-else-if="Object.keys(joinedRoom).length == 0">
      <ChessRoom></ChessRoom>
    </div>
  </div>
</template>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  display: flex;
}

.session {
  width: 100%;
  height: 100%;
}

.room {
  width: 100%;
  height: 100%;
}
</style>
