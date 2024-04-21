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

      <div class="flex-item" v-if="props.type === SelectType.options">
        <SettingsOptionsSelect
          :options="props.options"
          :title="props.title"
          :loading="props.loading"
          @input="handleOptionSelected"/>
      </div>

      <div v-else-if="props.type === SelectType.number">
        <SettingsOptionsAmount @input="handleAmountSelected"/>
      </div>

    </div>
  </div>

</template>

<script setup lang="ts">

import { ref, defineProps, defineEmits } from "vue";

import IconComponent from "../IconComponent.vue";
import type { SelectOptionType } from "../../types/SelectOptionType";
import SettingsOptionsAmount from "./SettingsOptionsAmount.vue";
import SettingsOptionsSelect from "./SettingsOptionsSelect.vue";

  type Props = {
    options?: SelectOptionType[],
    title: string,
    type: SelectType,
    loading?: boolean,
  }

  enum SelectType {
    number,
    options
  }

const props = defineProps<Props>();
const emits = defineEmits( [ "input" ] );

const optionSelected = ref( props.type === SelectType.number );

const handleAmountSelected = ( amount: number ): void => {
  emits( "input", { id:amount, name: "amount" }, "amount" );
};

const handleOptionSelected = ( option: SelectOptionType ): void => {
  console.log( "option selected", option );
  optionSelected.value = true;
  emits( "input", option, props.title );
};

</script>

<style scoped lang="less">

.flex-item {
  width: 100%;
}

input[type="number"] {
  -webkit-appearance: textfield;
  -moz-appearance: textfield;
  appearance: textfield;
}
input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button {
  -webkit-appearance: none;
}

.flex-container {
  display: flex;
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
  margin-top: 1.5rem;
  width: 100%;


  .select-container__title {
    font-size: 1rem;
    text-transform: capitalize;
    font-weight: 700;
    letter-spacing: 0.5px;
    margin: 0.5rem 0;
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


  .select-amount__container {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: var(--border-radius);
    border: var(--border-width) solid var(--color-pink);
    cursor: pointer;
    padding: 0.75rem;
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
