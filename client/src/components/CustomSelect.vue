<template>
  <div class="select-container">
    <p class="select-container__title">{{ props.title }}</p>
    <div class="flex-container">

      <div class="icon-container">
        <Transition name="fade" mode="out-in">
          <IconComponent icon-name="check-mark" v-if="optionSelected"/>
          <IconComponent icon-name="check-mark--light" v-else />
        </Transition>
      </div>

      <div class="dropdown__loading" v-if="loading">
        <div class="dropdown__loading__title">
          loading...
        </div>
      </div>

      <div class="dropdown" @blur="open = false" v-else-if="!loading && props.type === SelectType.options">
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

      <div class="select-amount" v-else-if="!loading && props.type === SelectType.number">

        <input
          class="select-amount__container"
          v-model="optionAmount"
          type="number"
          @blur="checkAndChangeValue"
        />

        <div class="select-amount__icons" >
          <IconComponent icon-name="single-arrow" @click="addAmount()"/>
          <IconComponent icon-name="single-arrow" @click="decreaseAmount()"/>
        </div>
      </div>
    </div>
  </div>

</template>

<script setup lang="ts">

import { ref, defineProps, defineEmits, watch } from "vue";


import IconComponent from "./IconComponent.vue";
import type { SelectOptionType } from "@/types/SelectOptionType";

type Props = {
  options: SelectOptionType[] | undefined,
  default: string,
  title: string,
  type: SelectType,
  loading?: boolean,
}

enum SelectType {
  number,
  options
}

const props = defineProps<Props>();
const emit = defineEmits( [ "input" ] );

const selected = ref( props.default ?? props.options?.[0] ?? null );

const open = ref( false );
const optionSelected = ref( false );

const optionAmount = ref( 10 );
const oldOptionAmount = ref( 10 );

const checkAndChangeValue = (): void => {
  const inputValueAsNumber = Number( optionAmount.value );

  if ( inputValueAsNumber < 10 || inputValueAsNumber > 50 ) {
    console.log( "NOT valid number" );
    // Value is valid
    optionAmount.value = oldOptionAmount.value;
  }
  else {
    console.log( "Valid number" );
    // Value is not valid, revert to the old value
    oldOptionAmount.value = optionAmount.value;
  }

};

const addAmount = (): void => {
  if ( optionAmount.value < 50 ) {
    optionAmount.value++;
  }
};

const decreaseAmount = (): void => {
  if ( optionAmount.value > 10 ) {
    optionAmount.value--;
  }

};

const handleOptionClick = ( option: SelectOptionType ): void => {
  selected.value = option.name;
  open.value = false;
  optionSelected.value = true;
  emit( "input", option, props.title );
};

</script>

<style scoped lang="less">

input[type="number"] {
  -webkit-appearance: textfield;
  -moz-appearance: textfield;
  appearance: textfield;
}
input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button {
  -webkit-appearance: none;
}

.icon-container{
  width: 1.5rem;
  height: 1.5rem;
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(100%);
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(-100%);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s, transform 0.25s;
}

.flex-container {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.select-container {
  width: 100%;
  //max-width: 15rem;

  .select-container__title {
    font-size: 1.2rem;
    text-transform: capitalize;
    font-weight: 700;
    letter-spacing: 0.5px;
    margin: 0.5rem 0 0.25rem 2rem;
  }
}

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

.select-amount {
    display: flex;
    align-items: center;
  }

.dropdown, .select-amount {
  position: relative;
  width: 100%;
  text-align: center;
  outline: none;
  /*
  height: 47px;
  line-height: 47px;
  */


  .dropdown__title, .select-amount__container {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: var(--border-radius);
      border: var(--border-width) solid var(--color-pink);
      cursor: pointer;
      padding: 0.75rem 0.5rem 0.75rem 0;
      transition: all 0.2s ease-in-out;
  }


  .select-amount__container {
      width: fit-content;
      padding: 0.75rem 1rem;
    }

    .select-amount__icons {
      display: grid;
      > :nth-child(2) {
        transform: rotate(180deg);
      }

  }

    .dropdown__title {

      p {
        width: 100%;
        text-transform: uppercase;
        color: var(--color-pink);
        font-weight: 900;
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
