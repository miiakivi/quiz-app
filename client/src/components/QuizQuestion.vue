<template>
  <div class="question-container">
    <h2 class="question--subtitle">Question</h2>
    <p class="question--title" v-if="loading">...loading</p>
    <p class="question--title" v-else v-html="props.question"></p>
  </div>
</template>

<script setup lang="ts">

type Props = {
  question: string;
  loading: boolean;
}

const props = defineProps<Props>();


</script>
<style scoped lang="less">

.question-container {
  padding: 1.5rem;
  border: var(--border-width) solid var(--color-main-border);
  border-radius: var(--border-radius);
  text-align: center;

  .question--subtitle {
    font-size: 0.875rem;
    text-transform: uppercase;
    color: var(--color-main-border);
  }

  .question--title {
    font-size: 1.25rem;
    font-weight: 700;
    letter-spacing: 0.5px;
  }
}

</style>