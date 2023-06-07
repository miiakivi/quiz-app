
export type QuizQuestion = {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
}

export type QuestionRequestArgs = {
  args: {
    amount?: number | undefined;
    category?: number;
    difficulty?: Difficulty;
    type?: QuestionType;
  }
}

enum Difficulty {
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard",
}

enum QuestionType {
  MULTIPLE = "multiple",
  BOOLEAN = "boolean",
}