<template>
  <button @click="clickEvent()" :class="getButtonClassNames()">
    {{ props.label }}
    <IconComponent :icon-name="icon ? icon : 'double-arrow'"/>
  </button>
</template>

<script setup lang="ts">
import IconComponent from "./IconComponent.vue";

type Props = {
  label: string;
  disabled: boolean;
  icon?: string;
  classNames?: string;
}

function getButtonClassNames (): string {
  const classes = [ "btn" ];

  if ( props.classNames ) classes.push( props.classNames );
  if ( props.disabled ) classes.push( "disabled" );

  return classes.join( " " );
}

const props = defineProps<Props>();
const emits = defineEmits( [ "handleButtonClick" ] );

function clickEvent (): void {
  emits( "handleButtonClick" );
}

</script>
