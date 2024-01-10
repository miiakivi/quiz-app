<template>
  <div class="game-settings__container">
    <SettingsOptions
      :options="quizCategories"
      title="category"
      :type="SelectType.options"
      :loading="loading"
      @input="inputSelected"
    />

    <SettingsOptions
      :options="gameDifficulty"
      title="difficulty"
      :type="SelectType.options"
      @input="inputSelected"
    />
    <SettingsOptions
      title="amount"
      :type="SelectType.number"
      @input="inputSelected"
    />

  </div>
</template>

<script setup lang="ts">
import { watch, ref } from "vue";

import { useQuery } from "@vue/apollo-composable";

import quizDifficulty from "../../data/quizz-difficulty";
import SettingsOptions from "./SettingsOptions.vue";
import { GET_QUIZ_CATEGORIES } from "../../graphql/query";

import type { SelectOptionType } from "../../types/SelectOptionType";

  enum SelectType {
    number,
    options
  }

const emits = defineEmits( [ "settingsSelected" ] );

const { loading, error, result } = useQuery( GET_QUIZ_CATEGORIES );

const quizCategories = ref();

const gameDifficulty: SelectOptionType[] = quizDifficulty.map( ( name: string, index: number ) => {
  return {
    title: "difficulty",
    id: index,
    name
  };
} );

let selectedDifficulty: SelectOptionType | null = null;
let selectedCategory: SelectOptionType | null = null;
let selectedAmount: SelectOptionType = { id:10, name: "amount" };

watch( result, () => {


  const fetchedCategories = result.value.getAllCategories.map( ( data: SelectOptionType )  => {
    return {
      title:"category",
      id: data.id,
      name: data.name
    };
  } ).sort( ( a: SelectOptionType, b: SelectOptionType ) => a.name.localeCompare( b.name ) );

  console.log( "category results", fetchedCategories );

  quizCategories.value = fetchedCategories;

} );


const inputSelected = ( option: SelectOptionType, optionTitle: string ): void => {

  switch ( optionTitle ) {
    case "amount":
      selectedAmount = option;
      break;
    case "difficulty":
      selectedDifficulty = option;
      break;
    case "category":
      selectedCategory = option;

      break;
  }

  if ( selectedDifficulty && selectedAmount && selectedCategory ) {
    emits( "settingsSelected", selectedAmount, selectedCategory, selectedDifficulty );
  }
};

</script>

  <style scoped lang="less">

  .game-settings__container {
  /*
      @media(min-width: 500px) {
        display: flex;
        justify-content: space-between;
        gap: 2rem;
        margin-top: 2rem;
    }*/
  }


  </style>