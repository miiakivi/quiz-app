export type QuizQueryResult = {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
}

export type QuizQuestionQuery = {
  getRandomQuizQuestions: QuizQueryResult[];
}
