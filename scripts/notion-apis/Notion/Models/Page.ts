class NotionPageItem implements Page {
  readonly _id: string;
  readonly _title: string;
  readonly _createdAt: Date;
  readonly _updatedAt: Date;
  readonly _subject: PostTag;
  readonly _keywords: PostTag[];
  readonly _content: BlockItem[];

  constructor(arg: NotionPageBuilder) {
    this._id = arg.id;
    this._title = arg.title;
    this._createdAt = arg.createdAt;
    this._updatedAt = arg.updatedAt;
    this._keywords = arg.keywords;
    this._subject = arg.subject;
    this._content = arg.content;
  }

  get id(): string {
    return this._id;
  }

  get title(): string {
    return this._title;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  get subject(): PostTag {
    return this._subject;
  }

  get keywords(): PostTag[] {
    return this._keywords;
  }

  get content(): BlockItem[] {
    return this._content;
  }

  toHTML(): string {
    return this.content.map((c) => c.toHTML()).join("\n");
  }
}

class NotionPageBuilder {
  private _id: string;
  private _title: string;
  private _createdAt: Date;
  private _updatedAt: Date;
  private _subject: PostTag;
  private _keywords: PostTag[];
  private _content: BlockItem[];

  constructor() {
    this._id = "UNKNOWN_ID";
    this._title = "UNKNOWN_TITLE";
    this._createdAt = new Date();
    this._updatedAt = new Date();
    this._subject = { id: "UNKNOWN_ID", name: "UNKNOWN", color: "default" };
    this._keywords = [];
    this._content = [];
  }

  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  set createdAt(value: Date) {
    this._createdAt = value;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  set updatedAt(value: Date) {
    this._updatedAt = value;
  }

  get subject(): PostTag {
    return this._subject;
  }

  set subject(value: PostTag) {
    this._subject = value;
  }

  get keywords(): PostTag[] {
    return this._keywords;
  }

  set keywords(value: PostTag[]) {
    this._keywords = value;
  }

  get content(): BlockItem[] {
    return this._content;
  }

  set content(value: BlockItem[]) {
    this._content = value;
  }

  build() {
    return new NotionPageItem(this);
  }
}

export const NotionPage = {
  Builder() {
    return new NotionPageBuilder();
  },
};
