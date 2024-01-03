<template>
  <div v-if="props.answeredQuestions" class="points-container">
    <TransitionGroup name="fade">
      <div class="flex" v-for="(answer, index) in props.answeredQuestions" :key="index">
        <Transition name="fade" mode="out-in">
          <IconComponent icon-name="check-mark" v-if="answer === 'correct'"/>
          <IconComponent icon-name="close-mark" v-else-if="answer === 'wrong'"/>
          <IconComponent icon-name="question-mark" v-else-if="index === props.questionIndex"/>
          <IconComponent icon-name="question-mark--light" v-else/>
        </Transition>
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import IconComponent from "./IconComponent.vue";

type Props = {
  answeredQuestions: string[] | undefined;
  questionIndex: number;
}

const props = defineProps<Props>();

</script>

<style scoped lang="less">

.points-container {
  display: flex;
  gap: 0.5rem;
}
.fade-enter-from {
  opacity: 0;
  transform: translateY(100%);
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(-100%);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}

</style>
