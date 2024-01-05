<template>
  <div class="game-settings__container">
    <CustomSelect
      :options="gameDifficulty"
      :default="'select'"
      title="Difficulty"
      @input="inputSelected"
    />
    <CustomSelect
      :options="quizCategories"
      :default="'select'"
      title="Category"
      :loading="loading"
      @input="inputSelected"
    />
    <CustomSelect
      :options="gameDifficulty"
      :default="'select'"
      title="Amount"
      @input="inputSelected"
    />
  </div>
</template>

<script setup lang="ts">
import { watch, ref } from "vue";

import { useQuery } from "@vue/apollo-composable";

import quizDifficulty from "../data/quizz-difficulty";
import CustomSelect from "./CustomSelect.vue";

import { GET_QUIZ_CATEGORIES } from "../graphql/query";

import type { SelectOptionType } from "@/types/SelectOptionType";

const emits = defineEmits( [ "settingsSelected" ] );

const { loading, error, result } = useQuery( GET_QUIZ_CATEGORIES );

const quizCategories = ref();

const gameDifficulty: SelectOptionType[] = quizDifficulty.map( ( name: string, index: number ) => {
  return {
    id: index,
    name
  };
} );

let selectedDifficulty: SelectOptionType | null = null;
let selectedCategory: SelectOptionType | null = null;
let selectedAmount: SelectOptionType | null = null;

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


const inputSelected = ( option: SelectOptionType, optionTitle: string ): void => {

  console.log( "selected input:", option.name, "selected input title", optionTitle );

  switch ( optionTitle ) {
    case "Amount":
      selectedAmount = option;
      break;
    case "Difficulty":
      selectedCategory = option;
      break;
    case "Category":
      selectedDifficulty = option;
      break;
  }

  if ( selectedDifficulty && selectedAmount && selectedCategory ) {
    console.log( "All settings selected" );
    emits( "settingsSelected" );
  }

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