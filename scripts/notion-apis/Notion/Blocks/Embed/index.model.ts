import { BLOCK_TYPES } from "../Types.enum";
import { NotionBlock } from "../../Models/Blocks";
import { TextBlock } from "../Text/index.model";

class EmbedBlockItem implements BlockItem {
  readonly _block: BlockItem;
  constructor(notionBlock: BlockItem) {
    this._block = notionBlock;
  }

  get id(): string {
    return this._block.id;
  }

  get type(): string {
    return BLOCK_TYPES.BOOKMARK;
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

    let embedUrl = this.href;
    if (/https:\/\/codepen.io/.test(embedUrl)) {
      // codepen embedded
      embedUrl = embedUrl.replace("/pen/", "/embed/");
    }

    return `
<div class="notion-iframe-container">
  <iframe 
      class="${this.attributes.join(" ")}"
      src="${embedUrl}" loading="lazy" allowtransparency="true" allowfullscreen="true">
    </iframe>
</div>
    `;
  }
}

export const EmbedBlock = {
  build(notionBlock: BlockItem | any): BlockItem {
    if (NotionBlock.instanceOfBlockItem(notionBlock)) {
      return new EmbedBlockItem(notionBlock);
    }
    const rawRes: any = notionBlock;
    const blockItem = NotionBlock.Builder();
    blockItem.id = rawRes.id;
    blockItem.type = rawRes.type;
    blockItem.href = rawRes[blockItem.type].url;
    const captions = rawRes[blockItem.type].caption;

    const children = captions.map((richText: any) => {
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
      textBlock.attributes = [`notion-${BLOCK_TYPES.EMBED}`, ...attributes];

      return TextBlock.build(textBlock.build());
    });

    blockItem.children = children;
    blockItem.attributes = [`notion-${rawRes.type}`];

    return new EmbedBlockItem(blockItem.build());
  },
};
