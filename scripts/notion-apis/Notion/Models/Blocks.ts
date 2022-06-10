import { BLOCK_TYPES } from "../Blocks/Types.enum";
import { ParagraphBlock } from "../../Notion/Blocks/Paragraph/index.model";
import { TextBlock } from "../Blocks/Text/index.model";
import { Heading1Block } from "../Blocks/Heading_1/index.model";
import { Heading2Block } from "../Blocks/Heading_2/index.model";
import { Heading3Block } from "../Blocks/Heading_3/index.model";

class NotionBlockItem implements BlockItem {
  readonly _id: string;
  private readonly _type: string;
  readonly _value: string;
  readonly _href: string;
  readonly _attributes: string[];
  readonly _children: BlockItem[];

  constructor(arg: NotionBlockBuilder) {
    this._id = arg.id;
    this._children = arg.children;
    this._attributes = arg.attributes;
    this._href = arg.href;
    this._value = arg.value;
    this._type = arg.type;
  }

  get id(): string {
    return this._id;
  }

  get type(): string {
    return this._type;
  }

  get value(): string {
    return this._value;
  }

  get attributes(): string[] {
    return this._attributes;
  }

  get children(): BlockItem[] {
    return this._children;
  }

  get href(): string {
    return this._href;
  }

  toHTML(): string {
    // const nestedBlocks: string[] = this.children.map(
    //   (nestedBlock: BlockItem) => {
    //     return nestedBlock.toHTML();
    //   }
    // );
    //
    // const nestedBlocksHTML: string = nestedBlocks.join("\n");
    // if (this.type === BLOCK_TYPES.PARAGRAPH) {
    //   return ParagraphBlock.build(this).toHTML(nestedBlocksHTML);
    // } else if (this.type === BLOCK_TYPES.TEXT) {
    //   return TextBlock.build(this).toHTML(nestedBlocksHTML);
    // } else if (this.type === BLOCK_TYPES.HEADING_1) {
    //   return Heading1Block.build(this).toHTML(nestedBlocksHTML);
    // } else if (this.type === BLOCK_TYPES.HEADING_2) {
    //   return Heading2Block.build(this).toHTML(nestedBlocksHTML);
    // } else if (this.type === BLOCK_TYPES.HEADING_3) {
    //   return Heading3Block.build(this).toHTML(nestedBlocksHTML);
    // }
    return "";
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
    this._type = "UNKNOWN";
    this._children = [];
    this._attributes = [];
    this._href = "";
    this._value = "";
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

const instanceOfBlockItem = (someItem: any): boolean => {
  return !("object" in someItem) && "children" in someItem;
};

export const NotionBlock = {
  instanceOfBlockItem,
  Builder() {
    return new NotionBlockBuilder();
  },
};
