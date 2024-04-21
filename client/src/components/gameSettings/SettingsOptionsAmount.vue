<template>
  <div class="select-amount">

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

</template>

<script setup lang="ts">

import { ref, defineEmits } from "vue";

import IconComponent from "../IconComponent.vue";

const emit = defineEmits( [ "input" ] );

const optionAmount = ref( 10 );
const oldOptionAmount = ref( 10 );

const checkAndChangeValue = (): void => {
  const inputValueAsNumber = Number( optionAmount.value );

  if ( inputValueAsNumber < 10 || inputValueAsNumber > 50 ) {
    // Value is not valid, revert to the old value

    optionAmount.value = oldOptionAmount.value;
  }
  else {
    // Value is valid
    oldOptionAmount.value = optionAmount.value;
    handleAmountSelected();
  }
};

const addAmount = (): void => {
  if ( optionAmount.value < 50 ) {
    optionAmount.value++;
    handleAmountSelected();
  }
};

const decreaseAmount = (): void => {
  if ( optionAmount.value > 10 ) {
    optionAmount.value--;
    handleAmountSelected();
  }
};

const handleAmountSelected = (): void => {
  emit( "input", optionAmount.value );
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
      justify-content: space-between;
      align-items: center;
      border-radius: var(--border-radius);
      border: var(--border-width) solid var(--color-pink);
      cursor: pointer;
      padding: 0.5rem 0.75rem;
      transition: all 0.2s ease-in-out;
    }


      .select-amount__container {
        width: 5rem;
        text-align: center;
        background-color: var(--color-main-container);
        color: var(--color-pink);
        font-size: 1rem;
        text-transform: uppercase;
        font-weight: 900;
        letter-spacing: 1px;
        }

        .select-amount__icons {
          display: grid;
          margin-left: 0.5rem;
          cursor: pointer;

          > :nth-child(2) {
            transform: rotate(180deg);
          }

          svg {
            stroke: var(--color-text);
          }
      }
    }
    </style>
