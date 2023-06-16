<template>
  <!--
<TransitionGroup name="fade">
    <div v-if="props.answeredQuestions" class="points-container">
      <div class="flex" v-for="(answer, index) in props.answeredQuestions" :key="index">
        <IconComponent v-if="answer === 'correct'" icon-name="check-mark" />
        <IconComponent v-else-if="answer === 'wrong'" icon-name="close-mark" />
        <IconComponent v-else-if="index === props.questionIndex" icon-name="question-mark" />
        <IconComponent v-else icon-name="question-mark--light" />
      </div>
    </div>
  </TransitionGroup>
-->

  <div v-if="props.answeredQuestions" class="points-container">
    <transition-group name="fade">
      <div class="flex" v-for="(answer, index) in props.answeredQuestions" :key="index">
        <transition
          name="fade"
          mode="out-in"
          :key="getIconKey(answer, index)"
          @before-enter="beforeEnter"
          @after-enter="afterEnter"
        >
          <IconComponent :icon-name="getIconName(answer, index)" />
        </transition>
      </div>
    </transition-group>
  </div>
</template>

<script setup lang="ts">
import IconComponent from "./IconComponent.vue";

//import { computed, onBeforeEnter, onAfterEnter, defineProps } from "vue";

type Props = {
  answeredQuestions: string[] | undefined;
  questionIndex: number;
}
/*
type Props = {
  answeredQuestions: string[] | undefined,
  questionIndex: number,
}*/

type IconProps = {
  iconName: string;
}

const props = defineProps<Props>();

const getIconName = ( answer: string, index: number ): string => {
  if ( answer === "correct" ) {
    return "check-mark";
  } else if ( answer === "wrong" ) {
    return "close-mark";
  } else if ( index === props.questionIndex ) {
    console.log( "current found" );
    return "question-mark";
  } else {
    return "question-mark--light";
  }
};

const getIconKey = ( answer: string, index: number ): string => {
  return `${ answer }_${ index }`;
};

const beforeEnter = ( el: HTMLElement ): void => {
  console.log( "beforeEnter" );
  el.style.opacity = "0"; // Set initial opacity to 0 before entering
};

const afterEnter = ( el: HTMLElement ): void => {
  el.style.opacity = "1"; // Set final opacity to 1 after entering
};

const onBeforeLeave = ( el: HTMLElement ): void => {
  el.style.opacity = "1"; // Set initial opacity to 0 before entering
};

const onAfterLeave = ( el: HTMLElement ): void => {
  el.style.opacity = "0"; // Set final opacity to 1 after entering
};

</script>

<style scoped lang="less">

.points-container {
  display: flex;
  gap: 0.5rem;

}
.fade-enter-from {
  opacity: 0;
  transform: translateY(100%);
  border: 1px solid rgb(255, 92, 47);

}

.fade-leave-to {
  opacity: 0;
  transform: translateY(-100%);
  border: 1px solid rgb(134, 47, 255);

}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s, transform 0.3s;
  border: 1px solid greenyellow;
}

</style>
