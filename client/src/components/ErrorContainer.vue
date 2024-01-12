<template>
  <div class="error-container">
    <p class="error__title">Error</p>
    <p class="error__msg">{{ props.message }}</p>
    <button type="button" @click="() => emits('input')">OK</button>
  </div>
</template>

<script setup lang="ts">

  type Props = {
    message: string
  }

const props = defineProps<Props>();
const emits = defineEmits( [ "input" ] );

</script>

<style scoped lang="less">
  .error-container {
    position: absolute;
    top: 0;
    right: 0;
    text-align: center;
    background-color: rgb(18, 27, 38);
    padding: 1rem 1.75rem;
    border-radius: var(--border-radius);
    box-shadow: var(--box-shadow);
    width: 100%;
    max-width: 20rem;

    .error__title {
      color: var(--color-incorrect);
      font-weight: 700;
      letter-spacing: 1px;
      font-size: 1.2rem;
      //text-transform: uppercase;
    }
  }


</style>
