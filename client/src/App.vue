
<template>

  <div class="wrapper">

    <ErrorContainer :message="errorMsg" v-if="errorHappened" @input="handleErrorButtonClick"/>

    <InfoContainer type="winner" @handle-button-click="resetGame"/>
    <GameLoop @handle-error="handleError"/>
  </div>


</template>

<script setup lang="ts">
import { ref } from "vue";
import GameLoop from "./components/GameLoop.vue";
import ErrorContainer from "./components/ErrorContainer.vue";
import InfoContainer from "./components/InfoContainer.vue";

const errorMsg = ref( "" );
const errorHappened = ref( false );

const handleError = ( message: string ): void => {
  console.log( "error happened" );
  errorHappened.value = true;
  errorMsg.value = message;

};

const handleErrorButtonClick = (): void => {
  console.log( "closing error message" );
  errorHappened.value = false;
};

const resetGame = (): void => {
  console.log( "reloading page" );
  window.location.reload();
};

</script>

<style scoped lang="less">
  .wrapper {
    position: relative;
    display: flex;
    justify-content: center; /* Horizontally center the container */
    align-items: center; /* Vertically center the container */
    flex-direction: column;
    height: 100%;
    overflow: hidden;
  }

</style>






