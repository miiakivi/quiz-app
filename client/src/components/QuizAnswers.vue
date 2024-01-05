<template>
  <div class="answers-container">

    <div
      v-for="(answerOption, index) in props.answerOptions.options"
      :key="answerLabels[index]"
      @click="selectAnswer(answerOption)"
      class="answer"
      :class="['answer-' + answerLabels[index], getAnswerStatusClass(answerOption)]"
    >
      <Transition name="slide-up" mode="out-in">
        <p class="answer--label" v-if="shouldLabelShow(answerOption)">{{ answerLabels[index] }},</p>
        <IconComponent v-else :icon-name="getIconName(answerOption)" />
      </Transition>
      <Transition name="slide-up" mode="out-in">
        <p class="answer--option" v-if="props.loading">...loading</p>
        <p class="answer--option" v-else v-html="answerOption"></p>
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { QuestionType } from "@/types/QuestionType";
import IconComponent from "./IconComponent.vue";

import { ref } from "vue";
import { gameSettings } from "@/data/options";

type Props = {
  answerOptions: QuestionType;
  loading: boolean;
  gameStarted: boolean;
}

const emits = defineEmits( [ "selectAnswer" ] );
const props = defineProps<Props>();

const answerLabels = [ "a", "b", "c", "d" ];
const clickedAnswer = ref( "" );
const correctAnswer = ref( props.answerOptions.correctAnswer );
const answerSelected = ref( false );


function shouldLabelShow ( answerOption: string ): boolean {
  const [ isCorrect, isClicked ] = checkAnswerOption( answerOption );
  return !answerSelected.value || ( !isClicked && !isCorrect );
}

function getIconName ( answerOption: string ): string {
  const [ isCorrect, isClicked ] = checkAnswerOption( answerOption );

  if ( answerSelected.value ) {
    return isClicked ? ( isCorrect ? "check-mark" : "close-mark" ) : ( isCorrect ? "check-mark" : "" );
  }

  return "";
}

function getAnswerStatusClass ( answerOption: string ): string {

  const [ isCorrect, isClicked ] = checkAnswerOption( answerOption );

  if ( answerSelected.value ) {
    return isClicked ? ( isCorrect ? "correct" : "incorrect" ) : ( isCorrect ? "correct not-clicked" : "deactive" );
  }

  return "";
}

function selectAnswer ( answerOption: string ): void {
  if ( !props.loading ) {

    clickedAnswer.value = answerOption;

    answerSelected.value = true;

    // If game has not started yet, the game settings are being selected. The clicked option is the right answer always
    if ( !props.gameStarted ) {
      correctAnswer.value = clickedAnswer.value;
      emits( "selectAnswer", answerOption, true );
    } else {
      const selectedCorrectAnswer = answerOption === correctAnswer.value;
      emits( "selectAnswer", answerOption, selectedCorrectAnswer );
    }

  }
}

// checks if given answerOption is the clicked answer correct Answer
function checkAnswerOption ( answerOption: string ): boolean[] {
  return [ answerOption === correctAnswer.value, answerOption === clickedAnswer.value ];
}

</script>

<style scoped lang="less">


.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s ease-in-out;
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}

.answers-container {
  margin: 1rem 0;

  .answer {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.75rem;
    margin: 1rem 0;
    height: 3.5rem;
    cursor: pointer;
    border: 2px solid transparent;
    border-radius: var(--border-radius);
    box-shadow: var(--box-shadow);
    transition: all 0.3s ease-in-out;
  }

  .answer.correct.not-clicked {
    border-color: var(--color-correct);
    opacity: 0.70;
    pointer-events: none;
  }

  .answer.correct, .answer.answer.incorrect {
    svg {
      width: 1.875rem;
      height: 1.875rem;
    }
  }

  .answer.correct {
    border-color: var(--color-correct);
    pointer-events: none;
  }

  .answer.incorrect {
    border-color: var(--color-incorrect);
    pointer-events: none;
  }

  .answer.deactive {
    border-color: var(--color-disabled);
    pointer-events: none;
    box-shadow: none;
    .answer--label, .answer--option {
      color: var(--color-disabled);
    }
  }

  .answer-a {
    border: var(--border-width) solid var(--color-yellow-lighter);
    .answer--label {
      color: var(--color-yellow-lighter);
    }

    &:hover {
      border: var(--border-width) solid var(--color-yellow);
      .answer--label {
      color: var(--color-yellow);
      }
    }
  }

  .answer-b {
    border: var(--border-width) solid var(--color-blue-lighter);

    .answer--label {
      color: var(--color-blue-lighter);
    }

    &:hover {
      border: var(--border-width) solid var(--color-blue);
      .answer--label {
      color: var(--color-blue);
      }
    }
  }

  .answer-c {
    border: var(--border-width) solid var(--color-pink-lighter);

    .answer--label {
      color: var(--color-pink-lighter);
    }

    &:hover {
      border: var(--border-width) solid var(--color-pink);
      .answer--label {
      color: var(--color-pink);
      }
    }
  }

  .answer-d {
    border: var(--border-width) solid var(--color-purple-lighter);

    .answer--label {
      color: var(--color-purple-lighter);
    }

    &:hover {
      border: var(--border-width) solid var(--color-purple);
      .answer--label {
      color: var(--color-purple);
      }
    }
  }

  .answer--label {
    font-family: 'Montserrat', sans-serif;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 1.25rem;
    width: 1.875rem;
    transition: all 0.3s ease-in-out;

  }

  .answer--option {
    font-weight: 600;
    letter-spacing: .75px;
    transition: all 0.3s ease-in-out;

  }
}

</style>
