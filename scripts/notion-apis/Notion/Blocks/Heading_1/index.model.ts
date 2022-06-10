import { BLOCK_TYPES } from "../Types.enum";
import { NotionBlock } from "../../Models/Blocks";
import { TextBlock } from "../Text/index.model";

class Heading1BlockItem implements BlockItem {
  readonly _block: BlockItem;
  constructor(notionBlock: BlockItem) {
    this._block = notionBlock;
  }

  get id(): string {
    return this._block.id;
  }

  get type(): string {
    return BLOCK_TYPES.HEADING_1;
  }

  get href(): string {
    return this._block.href;
  }

  get attributes(): string[] {
    return this._block.attributes;
  }

  get children(): BlockItem[] {
    return this._block.children;
  }

  get value(): string {
    return this._block.value;
  }

  toHTML(nestedBlocksHTML: string = ""): string {
    const html = this.children.map((child) => {
      return child.toHTML();
    });
    return `<h1 class="${this.attributes.join(
      " "
    )}">${nestedBlocksHTML}${html.join("\n")}</h1>`;
  }
}

export const Heading1Block = {
  build(notionBlock: BlockItem | any): BlockItem {
    if (NotionBlock.instanceOfBlockItem(notionBlock)) {
      return new Heading1BlockItem(notionBlock);
    }
    const rawRes: any = notionBlock;
    const blockItem = NotionBlock.Builder();
    blockItem.id = rawRes.id;
    blockItem.type = rawRes.type;
    const richTexts = rawRes[blockItem.type]["rich_text"];
    const children = richTexts.map((richText: any) => {
      const textBlock = NotionBlock.Builder();
      const type = richText.type;
      const value = richText.plain_text;
      const href = richText.href || "";
      const attributes: string[] = Object.keys(richText.annotations)
        .filter((annotation) => richText.annotations[annotation])
        .map((annotation) => {
          if (annotation === "color") {
            return `color-${richText.annotations[annotation]}`;
          }
          return annotation;
        });

      textBlock.id = rawRes.id;
      textBlock.type = type;
      textBlock.value = value;
      textBlock.href = href;
      textBlock.attributes = [`notion-${BLOCK_TYPES.TEXT}`, ...attributes];

      return TextBlock.build(textBlock.build());
    });

    blockItem.children = children;
    blockItem.attributes = [`notion-${blockItem.type}`];
    return new Heading1BlockItem(blockItem.build());
  },
};
