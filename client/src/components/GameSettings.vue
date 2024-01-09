<template>
  <div class="game-settings__container">
    <div class="bigger">
      <CustomSelect
        :options="quizCategories"
        :default="'select'"
        title="category"
        :type="SelectType.options"
        :loading="loading"
        @input="inputSelected"
      />
    </div>

    <div class="medium">
      <CustomSelect
        :options="gameDifficulty"
        :default="'select'"
        title="difficulty"
        :type="SelectType.options"
        @input="inputSelected"
      />
    </div>
    <div class="smaller">
      <CustomSelect
        :options="gameDifficulty"
        :default="'select'"
        title="amount"
        :type="SelectType.number"
        @input="inputSelected"
      />
    </div>



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

.smaller {
  flex: 1; /* Adjust the flex property to control the size of smaller items */
}

.medium {
  flex: 2;
}

.bigger {
  flex: 3; /* Adjust the flex property to control the size of the bigger item */
}

</style>