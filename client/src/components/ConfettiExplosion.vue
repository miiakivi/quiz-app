<template>
  <div>
    <button class="btn" @click="triggerConfetti">Click Me!</button>
    <canvas ref="confettiCanvas" class="confetti-canvas"></canvas>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, toRef } from "vue";
import confetti from "canvas-confetti";

const confettiCanvas = ref<HTMLCanvasElement | null>( null );

const confettiCanvasRef = toRef( confettiCanvas, "value" );

onMounted( () => {
  confettiCanvas.value = confettiCanvasRef.value;
} );

const triggerConfetti = (): void => {
  if ( confettiCanvas.value ) {
    const options = {
      particleCount: 70,
      startVelocity: 20,
      spread: 70,
      angle: 120,
      scalar: 0.75,
      colors: [ "#F266C1", "#66F2F2", "#F2E852" ],
    };

    confetti( options );
  }
};
</script>

<style scoped>
.confetti-canvas {
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 9999;
}
</style>
