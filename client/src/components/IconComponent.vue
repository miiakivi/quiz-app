<template>
  <component :is="iconComponent" :class="`icon-${props.iconName}`"></component>
</template>

<script setup lang="ts">
import { computed, defineAsyncComponent } from "vue";
import type { DefineComponent } from "vue";

const props = defineProps( {
  iconName: {
    type: String,
    required: true,
  },
} );

const iconComponent = computed<DefineComponent>( () => {
  return defineAsyncComponent( () =>
    import( `../icons/${ props.iconName }.vue` ).catch( () => ( {
      render: (): string => {
        console.error( `Error fetching icon from: /src/icons/${ props.iconName }.vue` );
        return "";
      }
    } ) )
  );
} );
</script>
