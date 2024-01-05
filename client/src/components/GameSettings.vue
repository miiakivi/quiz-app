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
      :loading="loading"
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

import type { SelectOptionType } from "@/types/SelectOptionType";
const { loading, error, result } = useQuery( GET_QUIZ_CATEGORIES );


const gameDifficulty: SelectOptionType[] = quizDifficulty.map( ( name: string, index: number ) => {
  return {
    id: index,
    name
  };
} );
watch( result, () => {


  const fetchedCategories = result.value.getAllCategories.map( ( data: SelectOptionType )  => {
    return {
      id: data.id,
      name: data.name
    };
  } ).sort( ( a: SelectOptionType, b: SelectOptionType ) => a.name.localeCompare( b.name ) );

  console.log( "category results", fetchedCategories );

  quizCategories.value = fetchedCategories;

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