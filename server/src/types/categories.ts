export type Category = {
    id: number;
    name: string;
}

export type CategoryResponse = {
  trivia_categories: Category[];
}

export type CategoryQuestionCount = {
  total_easy_question_count: number;
  total_hard_question_count: number;
  total_medium_question_count: number;
  total_question_count: number;
}

export type CategoryQuestionsFromId = {
  category_id: number;
  category_question_count: CategoryQuestionCount;
}
