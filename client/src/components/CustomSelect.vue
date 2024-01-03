<template>
  <div class="select-container">

    <div class="select-container__title">
      <p>Title</p>
    </div>
    <div class="select-dropdown" @blur="open = false">
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


</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits } from "vue";

type Props = {
  options: string[],
  default: string,
}

const props = defineProps<Props>();
const emit = defineEmits( [ "input" ] );

const selected = ref(
  props.default
    ? props.default
    : props.options.length > 0
      ? props.options[0]
      : null
);
const open = ref( false );

const handleOptionClick = ( option: string ): void => {
  selected.value = option;
  open.value = false;
  emit( "input", option );
};

</script>

<style scoped lang="less">
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
    color: #fff;
    border-radius: 0px 0px 6px 6px;
    overflow: hidden;
    border-right: 1px solid #ad8225;
    border-left: 1px solid #ad8225;
    border-bottom: 1px solid #ad8225;
    position: absolute;
    background-color: #0a0a0a;
    left: 0;
    right: 0;
    z-index: 1;

    div {
      color: #fff;
      padding-left: 1em;
      cursor: pointer;
      user-select: none;

      &:hover {
        background-color: #ad8225;
      }
    }
  }
}

.selectHide {
  display: none;
}
</style>
