import gql from "graphql-tag";

export const GET_QUESTIONS = gql`
  query GetRandomQuizQuestions($args: QuestionRequestArgs) {
    getRandomQuizQuestions(args: $args) {
      response_code
      results {
        category
        correct_answer
        difficulty
        incorrect_answers
        question
        type
      }
    }
  }
`;

export const GET_QUIZ_CATEGORIES = gql`
  query getAllCategories {
    getAllCategories {
      id
      name
    }
  }
`;