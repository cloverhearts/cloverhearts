import { BLOCK_TYPES } from "../Types.enum";
import { NotionBlock } from "../../Models/Blocks";
import { TextBlock } from "../Text/index.model";

class ParagraphBlockItem implements BlockItem {
  readonly _block: BlockItem;
  constructor(blockItem: BlockItem) {
    this._block = blockItem;
  }

  get id(): string {
    return this._block.id;
  }

  get type(): string {
    return BLOCK_TYPES.TEXT;
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
    const instedHTML: string = this.children
      .map((child) => {
        return child.toHTML();
      })
      .join("\n");
    const html = `<p class="${this.attributes.join(
      " "
    )}">${nestedBlocksHTML}${instedHTML}</p>`;
    return this.href ? `<a href="${this.href}">${html}</a>` : html;
  }
}

export const ParagraphBlock = {
  build(notionRawParagraph: BlockItem | any): BlockItem {
    if (NotionBlock.instanceOfBlockItem(notionRawParagraph)) {
      return new ParagraphBlockItem(notionRawParagraph);
    }
    const rawRes: any = notionRawParagraph;
    const richTexts: any[] = rawRes[BLOCK_TYPES.PARAGRAPH]["rich_text"];
    const type = BLOCK_TYPES.PARAGRAPH;
    const attributes = [`notion-${BLOCK_TYPES.PARAGRAPH}`];

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

    const paragraphBlock = NotionBlock.Builder();
    paragraphBlock.id = rawRes.id;
    paragraphBlock.type = type;
    paragraphBlock.attributes = attributes;
    paragraphBlock.children = children;

    return new ParagraphBlockItem(paragraphBlock.build());
  },
};
