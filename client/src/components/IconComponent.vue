<template>
  <div class="icon">
    <component :is="iconComponent"></component>
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed, defineAsyncComponent } from "vue";
import type { DefineComponent } from "vue";

const props = defineProps( {
  iconName: {
    type: String,
    required: true,
  },
} );

const iconComponent = computed<DefineComponent>( () => {
  return defineAsyncComponent( () =>
    import( `./icons/${ props.iconName }.vue` ).catch( () => ( {
      render: (): string => {
        console.error( `Error fetching icon from: /src/components/icons/${ props.iconName }.vue` );
        return "";
      }
    } ) )
  );
} );
</script>
