<script setup lang="ts">

const answerOptions = [
  { label: "a", option: "Suprise me",  },
  { label: "b", option: "Select game level" },
  { label: "c", option: "Select everything" }
];

function selectAnswer ( label: string ): void {
  console.log( "answer selected", label );
}

</script>

<template>
  <div class="answers-container">
    <div
      v-for="answer in answerOptions"
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
