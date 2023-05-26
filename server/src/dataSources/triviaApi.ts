import { RESTDataSource } from "@apollo/datasource-rest";
import { CategoryResponse } from "../types/categories";

export default class TriviaAPI extends RESTDataSource {
  override baseURL = "https://opentdb.com/";
  test = "test";
  anotrher = "test ";
  te = [ 1, 2, 3 ];
  
  async getCategories (): Promise<CategoryResponse> {
    const response = await this.get( "api_category.php" );
    return response.trivia_categories;
  }
  
  async getCategoryQuestionCount (): Promise<CategoryResponse> {
    const response = await this.get( "api_category.php" );
    return response.trivia_categories;
  }
  
}