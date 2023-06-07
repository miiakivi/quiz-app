<script setup lang="ts">
import { ref, watch } from "vue";
import type { Option } from "./types/AnswerOption";

import QuizAnswers from "./components/QuizAnswers.vue";
import IconComponent from "./components/IconComponent.vue";
import { answerLabels, answerOptions, difficultyOptions } from  "./data/options";

function createAnswerOptions ( options: string[] ): Option[]  {
  return options.map( ( answer, index ) => {
    return { label: answerLabels[index], option: answer };
  } );
};

const optionRef = ref( createAnswerOptions( answerOptions ) );
const selectedRef = ref( true );

const visible = ref( true );

watch( optionRef, () => {
  visible.value = false;
} );

const onAfterLeave = (): void => {
  console.log( "on after leave" );
  visible.value = true;
};

function handleSelectedAnswer ( label: string ): void {

  switch( label ) {
    case "a":
      console.log( "Lets make an query" );
      return;
    case "b":
      optionRef.value = createAnswerOptions( difficultyOptions );
      return;
    case "c":
      console.log( "select everything" );
      return;
    case "d":
      console.log( "nothing " );
      return;
  }
}

</script>

<template>
  <div class="wrapper">

    <div class="main-container" >
      <div >
        <Transition name="slide-fade" @after-leave="onAfterLeave">
          <div class="question-container component-container" v-if="visible">
            <h2 class="question--subtitle">Question</h2>
            <p class="question--title">What kind of game you would like to play?</p>
          </div>
        </Transition>
        <Transition name="slide" @after-leave="onAfterLeave">
          <div class="component-container" v-if="visible">
            <QuizAnswers :answerOptions="optionRef" @selectAnswer="handleSelectedAnswer"/>


            <div class="answers--button-container">
              <button v-if="selectedRef" class="btn btn-start">
                Let's go
                <IconComponent icon-name="double-arrow"/>
              </button>
            </div>
          </div>


        </Transition>

      </div>
    </div>

  </div>
</template>

<style scoped lang="less">

.slide-fade-enter-from {
  opacity: 0;
  transform: translateY(-100%);
}

.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(100%);
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}

.slide-enter-active,
.slide-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}

.slide-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.slide-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}


.wrapper {
  display: flex;
  justify-content: center; /* Horizontally center the container */
  align-items: center; /* Vertically center the container */
  height: 100%;
}

.main-container {
  width: 100%;
  max-width: 60rem;
  min-height: 31.25rem;
  background-color: #232946;
  padding: 2rem;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
}

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

.answers--button-container {
  display: flex;
  justify-content: end;
  margin-top: 2.5rem;
}

</style>
