<template>
  <div v-show="!loading">
    <div class="progress-bar-container">
      <div class="progress-bar" :style="{ width: progress + '%'}" ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, toRefs, watch, onBeforeUnmount } from "vue";

type Props = {
  timerDuration: number,
  loading: boolean;
  pauseTimer: boolean;
}

const props = defineProps<Props>();

const { pauseTimer } = toRefs( props );

const time = ref( props.timerDuration ); // Current time in seconds
const interval = ref<number | null>( null );
const timerRunning = ref( true );

const progress = ref( 0 );

watch( pauseTimer, ( ) => {
  if ( timerRunning.value ) {
    clearInterval( interval.value! );
  }
  timerRunning.value = !timerRunning.value;
} );

watch( time, () => {
  progress.value = ( ( props.timerDuration - time.value ) / props.timerDuration ) * 100;
} );

const startTimer = (): void => {
  interval.value = setInterval( () => {
    if ( time.value > 0 ) {
      time.value--;
    } else {
      endTimer();
    }
  }, 1000 );
};

const endTimer = (): void => {
  console.log( "game over" );
  clearInterval( interval.value! ); // Add "!" to assert non-null value
  // Timer has ended, perform any necessary actions here
};

const toggleTimer = (): void => {
  if ( timerRunning.value ) {
    clearInterval( interval.value! );
  } else {
    startTimer();
  }
  timerRunning.value = !timerRunning.value;
};

onBeforeUnmount( () => {
  clearInterval( interval.value! ); // Add "!" to assert non-null value
} );


startTimer();
</script>

<style scoped>
.timer {
  font-size: 24px;
}

.progress-bar-container {
  width: 100%;
  height: 0.75rem;
  margin: 1rem 0 2rem;
  border: 2px solid #2F3761;
  overflow: hidden;
  border-radius: var(--border-radius)
}

.progress-bar {
  height: 100%;
  background-image: linear-gradient(to right, #232946, #2b3456, #334066, #3b4c77, #435888, #496197, #506aa6, #5673b5, #5e7ac6, #6782d6, #7189e7, #7c90f7);
  transition: all 1s linear;
}

.red-border {
  border: 2px solid red;
}

.blue-border {
  border: 2px solid rgb(0, 123, 255);
}

</style>
