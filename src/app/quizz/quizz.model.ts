import { Question } from './question/question.model';
import { User } from '../../shared/user.model';

export class Quiz {

  public get questionList(): Question[] {
    return this._questionList;
  }
  public set questionList(value: Question[]) {
    this._questionList = value;
  }
  public get maxQuestions(): string {
    return this._maxQuestions;
  }
  public set maxQuestions(value: string) {
    this._maxQuestions = value;
  }
  public get title(): string {
    return this._title;
  }
  public set title(value: string) {
    this._title = value;
  }

  constructor(private _title: string, private _maxQuestions: string, private _questionList: Question[]) {}

}
