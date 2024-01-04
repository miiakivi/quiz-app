<template>
  <div class="game-settings__container">
    <CustomSelect
      :options="quizDifficulty"
      :default="'select'"
      title="Difficulty"
      @input="inputSelected"
    />
    <CustomSelect
      :options="quizDifficulty"
      :default="'select'"
      title="Category"
      @input="inputSelected"
    />
    <CustomSelect
      :options="quizDifficulty"
      :default="'select'"
      title="Amount"
      @input="inputSelected"
    />
  </div>
</template>

<script setup lang="ts">
import { watch } from "vue";

import { useQuery } from "@vue/apollo-composable";


import quizDifficulty from "../data/quizz-difficulty";
import CustomSelect from "./CustomSelect.vue";

import { GET_QUIZ_CATEGORIES } from "../graphql/query";

const { loading, error, result } = useQuery( GET_QUIZ_CATEGORIES );

watch( result, () => {
  console.log( "category results", result.value );
} );

console.log( quizDifficulty );

const inputSelected = ( input: string ): void => {
  console.log( "selected input:", input );
};

</script>

<style scoped lang="less">


.game-settings__container {

    @media(min-width: 500px) {
      display: flex;
      justify-content: space-between;
      gap: 2rem;
      margin-top: 2rem;
  }
}

</style>