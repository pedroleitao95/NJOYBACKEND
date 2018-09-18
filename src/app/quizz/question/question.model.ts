export class Question {
  public get image(): string {
    return this._image;
  }
  public set image(value: string) {
    this._image = value;
  }
  public get solution(): string {
    return this._solution;
  }
  public set solution(value: string) {
    this._solution = value;
  }

  constructor(private _id: string,
    private _type: string,
    private _title: string,
    private _image?: string,
    private _solution?: string,
    private _quizz?: string) {}

  public get quizz(): string {
    return this._quizz;
  }
  public set quizz(value: string) {
    this._quizz = value;
  }
  public get title(): string {
    return this._title;
  }
  public set title(value: string) {
    this._title = value;
  }
  public get type(): string {
    return this._type;
  }
  public set type(value: string) {
    this._type = value;
  }
  public get id(): string {
    return this._id;
  }
  public set id(value: string) {
    this._id = value;
  }


}
