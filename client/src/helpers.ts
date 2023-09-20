import type { Option } from "./types/AnswerOption";
//import { answerLabels } from "./data/options";
import type { QuestionType } from "./types/QuestionType";
/*
export function createAnswerOptions ( currentOptions: QuestionType ): Option[]  {


  return currentOptions.options.map( ( answer, index ) => {
    return {
      label: answerLabels[index],
      option: answer,
    };
  } );
};*/

export function shuffleArrayOrder ( arr: string[] ): string[] {
  return arr
    .map( value => ( { value, sort: Math.random() } ) )
    .sort( ( a, b ) => a.sort - b.sort )
    .map( ( { value } ) => value );
}