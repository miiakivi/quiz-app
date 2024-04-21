


<template>

  <!--ANIMATIONS DO NOT WORK IF THERE IS IF STATEMENET ON THE COMPONENT-->

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

      <QuizQuestion
        :question="quizOptions[currentIndex].question"
        :loading="loading"
        :is-visible="visible"
        :on-after-leave="onAfterLeave" />

      <ProgressTimer
        v-if="visible && gameStarted"
        :pause-timer="pauseTimer"
        :loading="loading"
        :timer-duration="5"
        :is-visible="visible && gameStarted"
        :on-after-leave="onAfterLeave"
        @game-over="handleGameOver"/>

      <GameSettings
        v-if="visible && showGameSettings && !gameStarted"
        @settings-selected="gameSettingsSelected"
        :is-visible="visible && showGameSettings && !gameStarted"
        :on-after-leave="onAfterLeave">
      </GameSettings>

      <QuizAnswers
        v-if="visible && !showGameSettings && !loading"
        :is-visible="visible"
        :on-after-leave="onAfterLeave"
        :answerOptions="quizOptions[currentIndex]"
        @selectAnswer="processAnswerAndMoveToNextQuestion"
        :loading="loading"
        :game-started="isGameStarted()"/>


    </div>
    <div class="buttons-container">
      <ButtonComponent
        v-if="gameModeSelected"
        @handle-button-click="loadQuestionsFromDB"
        label="Let's go"
        :disabled="!gameModeSelected"/>
    </div>
  </div>
</template>

<script setup lang="ts">

import { reactive, ref, watch } from "vue";

import { useLazyQuery } from "@vue/apollo-composable";

import type { QuizQueryResult } from "../types/QuizQuestionQuery";
import type { QuestionType } from "../types/QuestionType";
import type { SelectOptionType } from "../types/SelectOptionType";

import GameSettings from "./gameSettings/GameSettings.vue";
import QuizAnswers from "./QuizAnswers.vue";
import QuizQuestion from "./QuizQuestion.vue";
import ButtonComponent from "./ButtonComponent.vue";

import { gameSettings } from  "../data/options";

import { shuffleArrayOrder } from "../helpers";

import { GET_QUESTIONS } from "../graphql/query";
import QuizCategoryInfo from "./QuizCategoryInfo.vue";
import QuizPoints from "./QuizPoints.vue";
import ProgressTimer from "./ProgressTimer.vue";
import ConfettiExplosion from "./ConfettiExplosion.vue";

type QuizQuestionArgs = {
  amount: number,
  category?: number,
  difficulty?: string,
}

const emits = defineEmits( [ "handleError", "gameOver" ] );

const pauseTimer = ref( false );
const gameStarted = ref( false );

const queryLoaded = ref( false );

const quizOptions = reactive( gameSettings ); // Game starts with selecting game settings
const currentIndex = ref( 0 );
const visible = ref( true );

const showGameSettings = ref( false );
const gameModeSelected = ref( false );

const lives = ref( 3 );

// How many qiestions quiz has and has 'correct' or 'wrong' in a place already answered questions.
const answeredQuestionsArr = ref<string[]>();

const questionArgs: QuizQuestionArgs = {
  amount: 10,
} ;

let categoryName = "";

const { loading, error, result, load, refetch } = useLazyQuery( GET_QUESTIONS, {
  args: questionArgs,
} );

watch( error, () => {
  emits( "handleError", error.value ? error.value.message : "GraphQL Error!" );
  console.error( "GraphQL error!", error.value?.message );
} );

// Watch for changes in the fetched data
watch( result, () => {
  const queryResponse = result.value.getRandomQuizQuestions;
  const responseCode = queryResponse.response_code;

  if ( responseCode === 0 ) {
    // Success
    showGameSettings.value = false;
    gameStarted.value = true;
    handleSuccessfulQuestionsQuery( queryResponse.results );
  } else {
    // Error happened
    //errorHappened.value = true;
    handleQuestionsQueryFailure( responseCode );
  }
} );

watch( gameModeSelected, () => {
  console.log( "gameModeSelected", gameModeSelected.value );
} );

const loadQuestionsFromDB = (): void => {
  //Load questions and start game
  load() || refetch();
};

const handleQuestionsQueryFailure = ( code: number ): void => {
  let errorMsg = "";
  switch ( code ) {
    case 1:
      errorMsg = `No Results! Category ${ categoryName } doesn't have enough questions for your query.`;
      break;
    case 2:
      errorMsg = "Invalid Amount! Must be number and between 10-50";
      break;
    case 3:
      errorMsg = "Token Not Found! Session Token does not exist.";
      break;
    case 4:
      errorMsg = "Token Empty! Resetting the Sessoin Token is necessary.";
      break;
    case 5:
      errorMsg = "Rate Limit! Too many requests have occurred.";
      break;
  }
  emits( "handleError", errorMsg );
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

const isGameStarted = (): boolean => {
  return gameStarted.value;
};

const gameSettingsSelected = ( amount: SelectOptionType, category: SelectOptionType, difficulty: SelectOptionType ): void => {

  questionArgs.category = category.id;
  categoryName = category.name;
  questionArgs.amount = amount.id;
  questionArgs.difficulty = difficulty.name.toLowerCase();

  gameModeSelected.value = true;
};

const onAfterLeave = (): void => {
  console.log( "after leace" );
  visible.value = true;
};

const nextQuestion = (): void => {
  pauseTimer.value = false;
  currentIndex.value = ( currentIndex.value + 1 ) % quizOptions.length;
};

function handleGameModeSelection ( answer: string ): void {
  if ( answer === "Customize your challenge" ) {
    showGameSettings.value = true;
    quizOptions.splice( 0, quizOptions.length, { question: "Make your choices" } );
    return;
  }

  gameModeSelected.value = true;
}

function processAnswerAndMoveToNextQuestion ( answerOption: string, selectedRightAnswer: boolean ): void {

  // Check if game mode is selected
  if ( !gameModeSelected.value ) {
    handleGameModeSelection( answerOption );
    //return; // Exit the function if game mode is not selected
  }

  // Check if questions are loaded from the database
  if ( queryLoaded.value && answeredQuestionsArr.value ) {
    // Pause timer for processing the answer
    pauseTimer.value = true;

    // Update the answered questions array based on the selected answer
    if ( selectedRightAnswer ) {
      answeredQuestionsArr.value[currentIndex.value] = "correct";
      waitAndRunNextQuestion(); // Move to the next question
    } else {
      answeredQuestionsArr.value[currentIndex.value] = "wrong";
      handleWrongAnswer(); // Handle wrong answer if selected answer is wrong
    }

  }
}


function handleWrongAnswer (): void {
  // Check if there are lives left
  if ( lives.value >= 1 ) {
    // If there are lives left, decrement
    lives.value -= 1;
    // Continue to the next question
    waitAndRunNextQuestion();
  } else {
    // If no lives left, handle game over
    handleGameOver( "loser" );
  }
}

async function handleGameOver ( type: string ): Promise<void> {
  await new Promise( resolve => setTimeout( resolve, 250 ) );
  emits( "gameOver", type );
};

async function waitAndRunNextQuestion (): Promise<void> {
  await new Promise( resolve => setTimeout( resolve, 1250 ) ); // Wait for 1.25 seconds

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
  </style>
