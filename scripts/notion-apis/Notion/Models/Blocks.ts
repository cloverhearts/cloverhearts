class NotionBlockItem implements BlockItem {
  readonly _id: string;
  readonly _value: string;
  readonly _href: string;
  readonly _attributes: string[];
  readonly _children: BlockItem[];

  constructor(arg: NotionBlockBuilder) {
    this._id = arg.id;
    this._children = arg.children
    this._attributes = arg.attributes
    this._href = arg.href
    this._value = arg.value
  }

  get id(): string {
    return this._id;
  }

  get value(): string {
    return this._value;
  }

  get attributes(): string[] {
    return this._attributes;
  }

  get children(): BlockItem[] {
    return this._children
  }

  get href(): string {
    return this._href
  }

  public toHTML(): string {
    throw new Error("Method not implemented.");
  }
}

class NotionBlockBuilder {
  private _id: string;
  private _type: string;
  private _value: string;
  private _href: string;
  private _attributes: string[];
  private _children: BlockItem[];
  

  constructor() {
    this._id = "UNKNOWN_ID";
    this._type = 'UNKNOWN'
    this._children = []
    this._attributes = []
    this._href = ''
    this._value = ''
  }

  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  get value(): string {
    return this._value;
  }

  set value(textValue: string) {
    this._value = textValue;
  }

  get href(): string {
    return this._href;
  }

  set href(value: string) {
    this._href = value;
  }

  get type(): string {
    return this._type;
  }

  set attributes(value: string[]) {
    this._attributes = value;
  }

  get attributes(): string[] {
    return this._attributes;
  }

  set type(value: string) {
    this._type = value;
  }

  get children(): BlockItem[] {
    return this._children;
  }

  set children(value: BlockItem[]) {
    this._children = value;
  }

  build() {
    return new NotionBlockItem(this);
  }
}

export const NotionBlock = {
  Builder() {
    return new NotionBlockBuilder();
  },
};
