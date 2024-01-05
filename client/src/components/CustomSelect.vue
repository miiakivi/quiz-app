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

      <div class="select-dropdown__loading" v-if="loading">
        <div class="select-dropdown__loading__selected">
          loading...
        </div>
      </div>

      <div class="select-dropdown" @blur="open = false" v-else>
        <div class="select-dropdown__selected" :class="{ open: open }" @click="open = !open">
          {{ selected }}
        </div>
        <div class="select-dropdown__options" :class="{ selectHide: !open }">
          <div
            v-for="(option, i) of options"
            :key="i"
            @click="
              handleOptionClick(option);
            "
          >
            {{ option }}
          </div>
        </div>
      </div>
    </div>
  </div>





</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits } from "vue";
import IconComponent from "./IconComponent.vue";

type Props = {
  options: SelectOptionType[] | undefined,
  default: string,
  title: string,
  loading?: boolean,
}

const props = defineProps<Props>();
const emit = defineEmits( [ "input" ] );

const selected = ref( props.default ?? props.options?.[0] ?? null );

const open = ref( false );

const handleOptionClick = ( option: SelectOptionType ): void => {
  selected.value = option.name;
  open.value = false;
  optionSelected.value = true;
  emit( "input", option, props.title );
};

</script>

<style scoped lang="less">

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
.select-dropdown {
  position: relative;
  width: 100%;
  text-align: center;
  outline: none;
  /*
  height: 47px;
  line-height: 47px;
  */

    .select-dropdown__selected {
      border-radius: var(--border-radius);
      border: var(--border-width) solid var(--color-pink);
      color: #fff;
      padding-left: 1em;
      cursor: pointer;
      user-select: none;
      text-transform: uppercase;
      color: var(--color-pink);
      font-weight: 900;
      letter-spacing: 1px;
      padding: 0.75rem 0;

    .open {
      border: 1px solid #ad8225;
      border-radius: 6px 6px 0px 0px;
    }
  }

    &:after {
      position: absolute;
      content: "";
      top: 22px;
      right: 1em;
      width: 0;
      height: 0;
      border: 5px solid transparent;
      border-color: #fff transparent transparent transparent;
  }

  .select-dropdown__options {
    border-radius: var(--border-radius);
    overflow: hidden;
    position: absolute;
    background-color: #292f52;
    box-shadow: var(--box-shadow);
    left: 0;
    right: 0;
    z-index: 1;

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
