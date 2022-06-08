import { BLOCK_TYPES } from "../Types.enum";
import { NotionBlock } from "../../Models/Blocks";
import { TextBlock } from "../Text/index.model";

class VideoBlockItem implements BlockItem {
  readonly _block: BlockItem;
  constructor(notionBlock: BlockItem) {
    this._block = notionBlock;
  }

  get id(): string {
    return this._block.id;
  }

  get type(): string {
    return BLOCK_TYPES.VIDEO;
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

    if (/youtube.com/.test(this.href)) {
      const url = this.href.replace("https://www.youtube.com/watch?v=", "");
      return `
      <div>
        <iframe src="https://www.youtube.com/embed/${url}" title="" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        <p class="caption">
          ${instedHTML}
        </p>
      </div>`;
    }

    return `<video src="${this.href}" class="${this.attributes.join(
      " "
    )}">${instedHTML}</video>`;
  }
}

export const VideoBlock = {
  build(notionBlock: BlockItem | any): BlockItem {
    if (NotionBlock.instanceOfBlockItem(notionBlock)) {
      return new VideoBlockItem(notionBlock);
    }
    const rawRes: any = notionBlock;
    const blockItem = NotionBlock.Builder();
    blockItem.id = rawRes.id;
    blockItem.type = rawRes.type;
    const videoType = rawRes[blockItem.type].type;
    blockItem.href = rawRes[blockItem.type][videoType].url;
    blockItem.value = blockItem.href = rawRes[blockItem.type][videoType].url;
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
      textBlock.attributes = [`notion-${BLOCK_TYPES.TEXT}`, ...attributes];

      return TextBlock.build(textBlock.build());
    });

    blockItem.children = children;
    blockItem.attributes = [`notion-${rawRes.type}`];

    return new VideoBlockItem(blockItem.build());
  },
};
