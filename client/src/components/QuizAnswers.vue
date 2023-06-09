<script setup lang="ts">
import type { Option } from "../types/AnswerOption";

type Props = {
  answerOptions: Option[];
}

const emits = defineEmits( [ "selectAnswer" ] );
const props = defineProps<Props>();

function selectAnswer ( label: string ): void {
  emits( "selectAnswer", label );
}

</script>

<template>
  <div class="answers-container">
    <div
      v-for="(answer) in props.answerOptions"
      :key="answer.label"
      @click="selectAnswer(answer.label)"
      :class="`answer answer-${answer.label}`"
    >
      <p class="answer--label">
        {{ answer.label }},
      </p>
      <p class="answer--option">
        {{ answer.option }}
      </p>
    </div>
  </div>
</template>

<style scoped lang="less">

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.answers-container {
  margin: 1rem 0;

  .answer {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.75rem;
    margin: 1rem 0;
    cursor: pointer;
    border-radius: var(--border-radius);
    box-shadow: var(--box-shadow);
    transition: all 0.2s ease-in-out;

  }

  .answer-a {
    border: var(--border-width) solid var(--color-yellow-lighter);
    .answer--label {
      color: var(--color-yellow-lighter);
    }

    &:hover {
      border: var(--border-width) solid var(--color-yellow);
      .answer--label {
      color: var(--color-yellow);
      }
    }
  }

  .answer-b {
    border: var(--border-width) solid var(--color-blue-lighter);

    .answer--label {
      color: var(--color-blue-lighter);
    }

    &:hover {
      border: var(--border-width) solid var(--color-blue);
      .answer--label {
      color: var(--color-blue);
      }
    }
  }

  .answer-c {
    border: var(--border-width) solid var(--color-pink-lighter);

    .answer--label {
      color: var(--color-pink-lighter);
    }

    &:hover {
      border: var(--border-width) solid var(--color-pink);
      .answer--label {
      color: var(--color-pink);
      }
    }
  }

  .answer-d {
    border: var(--border-width) solid var(--color-purple-lighter);

    .answer--label {
      color: var(--color-purple-lighter);
    }

    &:hover {
      border: var(--border-width) solid var(--color-purple);
      .answer--label {
      color: var(--color-purple);
      }
    }
  }

  .answer--label {
    font-family: 'Montserrat', sans-serif;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 1.25rem;
    transition: all 0.2s ease-in-out;

  }

  .answer--option {
    font-weight: 600;
    letter-spacing: .75px;
  }
}

</style>
