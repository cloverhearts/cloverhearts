class NotionPostItem implements PostItem {
  readonly _id: string;
  readonly _title: string;
  readonly _createdAt: Date;
  readonly _updatedAt: Date;
  private readonly _subject: PostTag;
  readonly _keywords: PostTag[];

  constructor(arg: NotionPostBuilder) {
    this._id = arg.id;
    this._title = arg.title;
    this._createdAt = arg.createdAt;
    this._updatedAt = arg.updatedAt;
    this._keywords = arg.keywords;
    this._subject = arg.subject;
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
}

class NotionPostBuilder {
  private _id: string;
  private _title: string;
  private _createdAt: Date;
  private _updatedAt: Date;
  private _subject: PostTag;
  private _keywords: PostTag[];

  constructor() {
    this._id = "UNKNOWN_ID";
    this._title = "UNKNOWN_TITLE";
    this._createdAt = new Date();
    this._updatedAt = new Date();
    this._subject = { id: "UNKNOWN_ID", name: "UNKNOWN", color: "default" };
    this._keywords = [];
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

  build() {
    return new NotionPostItem(this);
  }
}

export const NotionPost = {
  Builder() {
    return new NotionPostBuilder();
  },
};
