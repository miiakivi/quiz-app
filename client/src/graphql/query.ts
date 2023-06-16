import gql from "graphql-tag";

export const GET_QUESTIONS = gql`
  query GetRandomQuizQuestions($args: QuestionRequestArgs) {
    getRandomQuizQuestions(args: $args) {
      category
      correct_answer
      difficulty
      incorrect_answers
      question
      type
    }
  }
`;