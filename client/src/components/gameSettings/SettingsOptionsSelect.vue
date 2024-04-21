<template>

  <div class="dropdown__loading" v-if="loading">
    <div class="dropdown__loading__title">
      loading...
    </div>
  </div>

  <div class="dropdown" @blur="open = false" v-else>
    <div :class="optionSelected ?'dropdown__title selected' : 'dropdown__title'" @click="open = !open">
      <p>{{ selected }}</p>
      <IconComponent icon-name="single-arrow"/>
    </div>
    <div class="dropdown__options" :class="{ selectHide: !open }">
      <div
        v-for="(option, i) of options"
        :key="i"
        @click="
          handleOptionClick(option);
        "
      >
        {{ option.name }}
      </div>
    </div>
  </div>

</template>

<script setup lang="ts">

import { ref, defineProps, defineEmits } from "vue";

import IconComponent from "../IconComponent.vue";
import type { SelectOptionType } from "../../types/SelectOptionType";

type Props = {
  options: SelectOptionType[] | undefined,
  //default: string,
  title: string,
  loading?: boolean,
}

const props = defineProps<Props>();
const emit = defineEmits( [ "input" ] );

const selected = ref( "Select" );

const open = ref( false );
const optionSelected = ref( false );

const handleOptionClick = ( option: SelectOptionType ): void => {
  selected.value = option.name;
  open.value = false;
  optionSelected.value = true;
  emit( "input", option, props.title );
};

</script>

<style scoped lang="less">

// Make this better please! Too much repetition
.dropdown__loading {
  position: relative;
  width: 100%;
  text-align: center;
  outline: none;

  .dropdown__loading__title {
    border-radius: var(--border-radius);
    border: var(--border-width) solid var(--color-pink-lighter);
    padding-left: 1em;
    user-select: none;
    text-transform: uppercase;
    color: var(--color-pink-lighter);
    font-weight: 900;
    letter-spacing: 1px;
    padding: 0.75rem 0;
  }
}

.dropdown {
  position: relative;
  width: 100%;
  text-align: center;
  outline: none;
  /*
  height: 47px;
  line-height: 47px;
  */


  .dropdown__title{
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: var(--border-radius);
    border: var(--border-width) solid var(--color-pink);
    cursor: pointer;
    padding: 0.5rem 0.75rem;
    transition: all 0.2s ease-in-out;

    p {
      text-transform: uppercase;
      color: var(--color-pink);
      font-weight: 900;
      font-size: 0.85rem;
      letter-spacing: 1px;
      transition: all 0.2s ease-in-out;
    }
    svg {
      stroke: var(--color-pink);
      transition: all 0.2s ease-in-out;
    }
  }

  .dropdown__options {
    border-radius: var(--border-radius);
    overflow: hidden;
    position: absolute;
    background-color: #292f52;
    box-shadow: var(--box-shadow);
    left: 0;
    right: 0;
    z-index: 1;
    max-height: 15rem;
    overflow: auto;
    text-align: left;

    div {
      font-weight: 700;
      letter-spacing: .75px;
      padding-left: 1em;
      cursor: pointer;
      user-select: none;

      &:hover {
        background-color: var(--color-pink);
      }
    }
  }
}

.selectHide {
  display: none;
}
</style>
