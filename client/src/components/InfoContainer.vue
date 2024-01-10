<template>
  <div class="info-container">
    <h3 class="info__title">{{ title }}</h3>
    <p>{{ paragraph }}</p>
    <button @click="() => onHandleButtonClick()">Try again</button>
    <button>Leaderboard</button>
  </div>
</template>

<script setup lang="ts">
import { ref, toRefs, watch, onBeforeUnmount } from "vue";

type Props = {
  type: string
}

const props = defineProps<Props>();
const emits = defineEmits( [ "handleButtonClick" ] );


const title = props.type === "winner" ? "Congratulations" : "Game over";
const paragraph = props.type === "winner" ? "You kicked ass!" : "Better luck next time";

const onHandleButtonClick = (): void => {
  console.log( "clicked button on info container" );
  emits( "handleButtonClick" );
};

</script>

<style scoped lang="less">

.info-container {
  position: absolute;
  background-color: rgb(18, 27, 38);
  padding: 1rem 1.75rem;  padding: 2rem;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
}


</style>
