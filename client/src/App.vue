<template>
  <div class="wrapper">

    <div class="main-container" >
      <div >
        <Transition name="slide-fade" @after-leave="onAfterLeave">
          <div v-if="visible">
            <QuizQuestion :question="quizOptions[currentIndex].question" />
          </div>
        </Transition>
        <Transition name="slide" @after-leave="onAfterLeave">
          <div v-if="visible">
            <QuizAnswers
              :answerOptions="createAnswerOptions( quizOptions[currentIndex].options )"
              @selectAnswer="handleSelectedGameMode"/>
          </div>
        </Transition>
      </div>
      <div class="buttons-container">
        <ButtonComponent
          @handle-button-click="startGame"
          label="Let's go"
          :disabled="!gameModeSelected"/>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from "vue";
import gql from "graphql-tag";

import { useLazyQuery } from "@vue/apollo-composable";

import type { Option } from "./types/AnswerOption";

import QuizAnswers from "./components/QuizAnswers.vue";
import QuizQuestion from "./components/QuizQuestion.vue";
import ButtonComponent from "./components/ButtonComponent.vue";

import { answerLabels, gameSettings } from  "./data/options";

/*
const queryLoaded = ref( false );

const GET_QUESTIONS = gql`
  query GetRandomQuizQuestions($args: QuestionRequestArgs) {
    getRandomQuizQuestions(args: $args) {
      category
      correct_answer
      difficulty
      incorrect_answers
      question
      type
    }
  }
`;

const { loading, error, result, load } = useLazyQuery( GET_QUESTIONS, {
  args: {
    "amount": 10
  }
} );
*/


// Watch for changes in the fetched data
watch( result, () => {

  queryLoaded.value = true;
  const fetchedQuestions: QuestionType[]= result.value.getRandomQuizQuestions.map( ( data: QuizQueryResult ) => {
    return {
      question: data.question,
      options: shuffleArrayOrder( [ ...data.incorrect_answers, data.correct_answer ] ),
      correctAnswer: data.correct_answer,
      category: data.category,
      difficulty: data.difficulty
    };
  } );

  quizOptions.push( ...fetchedQuestions );

  visible.value = false;
  nextQuestion();
} );


function createAnswerOptions ( options: string[] ): Option[]  {
  return options.map( ( answer, index ) => {
    return { label: answerLabels[index], option: answer };
  } );
};

function shuffleArrayOrder ( arr: string[] ): string[] {
  let shuffled = arr
    .map( value => ( { value, sort: Math.random() } ) )
    .sort( ( a, b ) => a.sort - b.sort )
    .map( ( { value } ) => value );

  console.log( shuffled );
  return shuffled;
}

// Game starts with selecting game settings
const quizOptions = reactive( gameSettings );

const currentIndex = ref( 0 );

const nextQuestion = (): void => {
  currentIndex.value = ( currentIndex.value + 1 ) % gameSettings.length;

};

const visible = ref( true );
const gameModeSelected = ref( false );

watch( currentIndex, () => {
  visible.value = false;
} );

const onAfterLeave = (): void => {
  visible.value = true;
};

function startGame (): void {
  console.log( "button clicked hurraah!" );
}
/*
const fetchPosts = (): void => {
  console.log( "loading..." );
  const firstTimeLoad = load();

  if ( firstTimeLoad ) queryLoaded.value = firstTimeLoad;
  console.log( "first time load", firstTimeLoad );
};*/
function checkCorrectAnswer ( answerOption: string ): void {
  const currentQuestion = quizOptions[currentIndex.value];

  if ( currentQuestion.correctAnswer === answerOption ) {
    console.log( "Correnct answer!" );
  } else {
    console.log( "wrong answer..." );
  }

}

function handleSelectedGameMode ( answerOption: string ): void {
  gameModeSelected.value = true;

  if ( queryLoaded.value ) {
    checkCorrectAnswer( answerOption );
    nextQuestion();
    visible.value = false;
  }
}

</script>

<style scoped lang="less">


.wrapper {
  display: flex;
  justify-content: center; /* Horizontally center the container */
  align-items: center; /* Vertically center the container */
  height: 100%;
  overflow: hidden;
}

.main-container {
  width: 100%;
  max-width: 60rem;
  min-height: 31.25rem;
  background-color: #232946;
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
