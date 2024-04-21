<template>
  <Transition name="fade" @after-leave="props.onAfterLeave">
    <div v-if="props.isVisible" class="category-info">
      <p>{{ props.currentCategory ? props.currentCategory : "Settings" }}</p>

      <div>
        <div :class="`life-icon__container `">
          <IconComponent icon-name="heart-filled" />
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import IconComponent from "./IconComponent.vue";

type Props = {
  currentCategory?: string
  questionNumber: string
  isVisible: boolean
  onAfterLeave: () => void
}

const props = defineProps<Props>();
</script>

<style scoped lang="less">
.category-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;

  p {
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.5px;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.life-icon__container {
  transition: all 0.25 ease-in-out;
}

.life-icon__container .lost-life {
  opacity: 0.25;
}

</style>
