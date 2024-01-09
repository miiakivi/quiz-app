import { RESTDataSource } from "@apollo/datasource-rest";

import { GraphQLError } from "graphql";

import { CategoryQuestionCount, CategoryResponse } from "../types/categories";
import { QuestionRequestArgs, ResponseQuizQuestion } from "../types/quizQuestions";

export default class TriviaAPI extends RESTDataSource {
  override baseURL = "https://opentdb.com/";

  async getCategories (): Promise<CategoryResponse> {
    const response = await this.get( "api_category.php" );
    return response.trivia_categories;
  }

  async getCategoryQuestionCount ( id: number ): Promise<CategoryQuestionCount> {
    const response = await this.get( `api_count.php?category=${ id }` );
    return response.category_question_count;
  }

  async getQuizQuestions (
    { args: { amount, category, difficulty, type } }: QuestionRequestArgs ): Promise<ResponseQuizQuestion> {

    if ( amount < 10 || amount > 50 ) {
      throw new GraphQLError( "Invalid value. Amount must be between 1 and 50" );
    }

    const url = `api.php?amount=${ encodeURIComponent( amount ) }${ category ? `&category=${ encodeURIComponent( category ) }` : "" }${ difficulty ? `&difficulty=${ encodeURIComponent( difficulty ) }` : "" }${ type ? `&type=${ encodeURIComponent( type ) }` : "" }`;

    const response: ResponseQuizQuestion = await this.get( url );
    console.log( "response", response );
    return response;
  }


}