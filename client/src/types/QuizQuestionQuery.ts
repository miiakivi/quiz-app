export type QuizQueryResult = {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
}

export type ResponseQuizQuestion = {
  response_code: number;
  results: QuizQueryResult[];
}

// Response for fetched quiz question
export type QuizQuestionQuery = {
  getRandomQuizQuestions: ResponseQuizQuestion;
}
