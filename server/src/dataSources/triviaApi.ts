import { RESTDataSource } from "@apollo/datasource-rest";

import { GraphQLError } from "graphql";

import { CategoryQuestionCount, CategoryResponse } from "../types/categories";
import { QuestionRequestArgs, QuizQuestion } from "../types/quizQuestions";

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

  async getQuizQuestions ( { args: { amount, category, difficulty, type } }: QuestionRequestArgs ): Promise<QuizQuestion[]> {

    //console.log( "amount", amount );
    /*if ( amount < 1 || amount > 50 ) {
      throw new GraphQLError( "Invalid value. Amount must be between 1 and 50" );
    }*/

    if ( category < 9 || category > 32  ) {
      throw new GraphQLError( "Invalid value. category id must be between 9 and 32" );
    }

    const url = `api.php?amount=${ encodeURIComponent( amount ) }${ category ? `&category=${ encodeURIComponent( category ) }` : "" }${ difficulty ? `&difficulty=${ encodeURIComponent( difficulty ) }` : "" }${ type ? `&type=${ encodeURIComponent( type ) }` : "" }`;

    const response = await this.get( url );
    return response.results;
  }


}