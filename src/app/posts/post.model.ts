export class Post {
  public get creator(): string {
    return this._creator;
  }
  public set creator(value: string) {
    this._creator = value;
  }

  constructor(private id: string, private _title: string, private _content: string, private imagePath: string, private _creator: string) {
  }


  get title(): string {
    return this._title;
  }

  set title(newTitle: string) {
    this._title = newTitle;
  }


  get postId() {
    return this.id;
  }

  set postId(id: string) {
    this.id = id;
  }

  public set content(v: string) {
    this._content = v;
  }

 public get content(): string {
   return this._content;
 }

 get image(): string {
   return this.imagePath;
 }

 set image(image: string) {
   this.imagePath = image;
 }


}
