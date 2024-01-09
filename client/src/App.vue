<template>
  <div class="wrapper">
    <Transition name="slide-fade" @after-leave="onAfterLeave">
      <div v-if="visible">
        <QuizPoints :answered-questions="answeredQuestionsArr" :question-index="currentIndex" />

      </div>
    </Transition>

    <div class="main-container" >
      <div >
        <QuizCategoryInfo
          :question-number="`${currentIndex + 1}/${quizOptions.length}`"
          :is-visible="visible"
          :current-category="quizOptions[currentIndex].category"
          :on-after-leave="onAfterLeave" />

        <Transition name="slide-fade" @after-leave="onAfterLeave">
          <div v-if="visible">
            <QuizQuestion
              :question="quizOptions[currentIndex].question"
              :loading="loading" />
          </div>
        </Transition>

        <Transition name="slide-fade" @after-leave="onAfterLeave">
          <div v-if="visible && gameStarted">
            <ProgressTimer :pause-timer="pauseTimer" :loading="loading" :timer-duration="10"/>
          </div>
        </Transition>


        <Transition name="slide" @after-leave="onAfterLeave">
          <div v-if="visible && showGameSettings && !gameStarted">
            <GameSettings
              @settings-selected="gameSettingsSelected">
            </GameSettings>
          </div>
        </Transition>

        <Transition name="slide" @after-leave="onAfterLeave">
          <div v-if="visible && !showGameSettings && !loading">
            <QuizAnswers
              :answerOptions="quizOptions[currentIndex]"
              @selectAnswer="handleNextQuestion"
              :loading="loading"
              :game-started="isGameStarted()"/>

          </div>
        </Transition>


      </div>
      <div class="buttons-container">
        <ButtonComponent
          v-if="gameModeSelected"
          @handle-button-click="startGame"
          label="Let's go"
          :disabled="!gameModeSelected"/>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">

import { reactive, ref, watch } from "vue";

import { useLazyQuery } from "@vue/apollo-composable";

import type { QuizQueryResult } from "./types/QuizQuestionQuery";
import type { QuestionType } from "./types/QuestionType";
import type { SelectOptionType } from "./types/SelectOptionType";

import GameSettings from "./components/GameSettings.vue";
import QuizAnswers from "./components/QuizAnswers.vue";
import QuizQuestion from "./components/QuizQuestion.vue";
import ButtonComponent from "./components/ButtonComponent.vue";

import { gameSettings } from  "./data/options";

import { shuffleArrayOrder } from "./helpers";

import { GET_QUESTIONS } from "./graphql/query";
import QuizCategoryInfo from "./components/QuizCategoryInfo.vue";
import QuizPoints from "./components/QuizPoints.vue";
import ProgressTimer from "./components/ProgressTimer.vue";
import ConfettiExplosion from "./components/ConfettiExplosion.vue";

type QuizQuestionArgs = {
  amount: number,
  category?: number,
  difficulty?: string,
}
const questionArgs: QuizQuestionArgs = {
  amount: 10,
} ;

const { loading, error, result, load } = useLazyQuery( GET_QUESTIONS, {
  args: questionArgs,
} );



watch( error, () => {
  console.error( "--------error happended.", error.value?.message );
  console.log( error );
} );


// Watch for changes in the fetched data
watch( result, () => {
  const queryResponse = result.value.getRandomQuizQuestions;
  const responseCode = queryResponse.response_code;

  if ( responseCode === 0 ) {
    // Success
    handleSuccessfulQuestionsQuery( queryResponse.results );
  } else {
    // Error happened
    handleQuestionsQueryFailure( responseCode );
  }
  //nextQuestion();
} );

const handleQuestionsQueryFailure = ( code: number ): void => {
  switch ( code ) {
    case 1:
      console.error( "No Results! Could not return results. The API doesn't have enough questions for your query." );
      return;
    case 2:
      console.error( "Invalid Parameter! Contains an invalid parameter. Arguements passed in aren't valid." );
      return;
    case 3:
      console.error( "Token Not Found! Session Token does not exist." );
      return;
    case 4:
      console.error( "Token Empty! Resetting the Sessoin Token is necessary." );
      return;
    case 5:
      console.error( "Rate Limit! Too many requests have occurred." );
      return;
  }
};

const handleSuccessfulQuestionsQuery = ( queryResponse: QuizQueryResult[] ): void => {
  queryLoaded.value = true;
  const fetchedQuestions: QuestionType[]= queryResponse.map( ( data: QuizQueryResult ) => {
    return {
      question: data.question,
      options: shuffleArrayOrder( [ ...data.incorrect_answers, data.correct_answer ] ),
      correctAnswer: data.correct_answer,
      category: data.category,
      difficulty: data.difficulty
    };
  } );

  quizOptions.splice( 0, quizOptions.length, ...fetchedQuestions );

  visible.value = false;
  answeredQuestionsArr.value = createStringArray( quizOptions.length );
};

const pauseTimer = ref( false );
const gameStarted = ref( false );

const queryLoaded = ref( false );

const quizOptions = reactive( gameSettings ); // Game starts with selecting game settings
const currentIndex = ref( 0 );
const visible = ref( true );

const showGameSettings = ref( false );
const gameModeSelected = ref( false );

// How many qiestions quiz has and has 'correct' or 'wrong' in a place already answered questions.
const answeredQuestionsArr = ref<string[]>();

const isGameStarted = (): boolean => {
  return gameStarted.value;
};

const gameSettingsSelected = ( amount: SelectOptionType, category: SelectOptionType, difficulty: SelectOptionType ): void => {

  questionArgs.category = category.id;
  questionArgs.amount = amount.id;
  questionArgs.difficulty = difficulty.name.toLowerCase();

  gameModeSelected.value = true;
};

const onAfterLeave = (): void => {
  visible.value = true;
};

function startGame (): void {
  // Load questions and start game
  showGameSettings.value = false;
  gameStarted.value = true;
  load();

}

const nextQuestion = (): void => {
  pauseTimer.value = false;
  currentIndex.value = ( currentIndex.value + 1 ) % quizOptions.length;
};

function handleGameModeSelection ( answer: string ): void {

  if ( answer === "Customize your challenge" ) {
    showGameSettings.value = true;
    return;
  }

  gameModeSelected.value = true;
}


function handleNextQuestion ( answerOption: string, selectedRightAnswer: boolean ): void {


  // What is gameMode?
  if ( !gameModeSelected.value ) handleGameModeSelection( answerOption );

  // Questions from db fetched
  if ( queryLoaded.value ) {

    if ( answeredQuestionsArr.value ) {
      pauseTimer.value = true;
      // Add string to arr to indicate correct or wrongly answered question
      answeredQuestionsArr.value[currentIndex.value] = selectedRightAnswer ? "correct" : "wrong";
    }

    waitAndRunNextQuestion();
  }
}

async function waitAndRunNextQuestion (): Promise<void> {
  await new Promise( resolve => setTimeout( resolve, 1250 ) ); // Wait for 3 seconds

  // Run the nextQuestion() function
  nextQuestion();

  // Update the visible value to false
  visible.value = false;
}

function createStringArray ( num: number ): string[] {
  if ( typeof num !== "number" || !Number.isInteger( num ) || num < 0 ) {
    throw new Error( "Input must be a non-negative integer" );
  }

  return Array( num ).fill( "" );
}

</script>

<style scoped lang="less">


.wrapper {
  display: flex;
  justify-content: center; /* Horizontally center the container */
  align-items: center; /* Vertically center the container */
flex-direction: column;
  height: 100%;
  overflow: hidden;
}

.main-container {
  width: 100%;
  max-width: 60rem;
  min-height: 31.25rem;
  background-color: var(--color-main-container);
  padding: 2rem;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);


  .buttons-container {
    display: flex;
    justify-content: end;
    align-items: center;
    gap: 2rem;
  }

}

/* --- TRANSITION --- */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}


.slide-fade-enter-from {
  opacity: 0;
  transform: translateY(100%);
}

.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-100%);
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

</style>
