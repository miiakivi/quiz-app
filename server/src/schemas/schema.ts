export const typeDefs = `#graphql
  type Category {
    id: Int!
    name: String!
  }

  "Category Question Count Lookup: Returns the number of questions in the database, in a specific category."
  type CategoryQuestionCount {
    "Total count of easy questions"
  total_easy_question_count: Int
  "Total count of medium questions"
  total_hard_question_count: Int
  "Total count of hard questions"
  total_medium_question_count: Int
  "Total count of all of the questions"
  total_question_count: Int
}

  type CategoryQuestionsFromId {
    category_id: Int
    category_question_count: CategoryQuestionCount
  }

  type QuizQuestion {
    category: String
    correct_answer: String
    difficulty: String
    incorrect_answers: [String]
    question: String
    type: String
  }

  input QuestionRequestArgs {
    amount: Int
    category: Int
    difficulty: Difficulty
    type: QuestionType
  }

  enum Difficulty {
    EASY
    MEDIUM
    HARD
  }

  enum QuestionType {
    MULTIPLE
    BOOLEAN
  }

  type Query {
    getAllCategories: [Category!]!
    getQuestionCountFromCategory(id: Int!): CategoryQuestionCount
    getRandomQuizQuestions(args: QuestionRequestArgs): [QuizQuestion]
  }
`;
