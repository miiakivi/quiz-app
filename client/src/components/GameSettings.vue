<template>
  <div>
    <CustomSelect
      :options="quizDifficulty"
      :default="'select'"
      @input="inputSelected"
    />
    <CustomSelect
      :options="quizDifficulty"
      :default="'select'"
      @input="inputSelected"
    />
    <CustomSelect
      :options="quizDifficulty"
      :default="'select'"
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

</script>../data/quizz-difficulty