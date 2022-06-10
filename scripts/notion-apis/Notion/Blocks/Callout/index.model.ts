import { BLOCK_TYPES } from "../Types.enum";
import { NotionBlock } from "../../Models/Blocks";
import { TextBlock } from "../Text/index.model";

type iconType = { type: string; value: string };

class CalloutBlockItem implements BlockItem {
  readonly _block: BlockItem;
  private _icon: iconType;

  constructor(blockItem: BlockItem, icon?: iconType) {
    this._block = blockItem;
    this._icon = icon || { type: "UNKNOWN", value: "" };
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

    let iconHTML = "";
    if (this._icon.type === "emoji") {
      iconHTML = `<div class="notion-icon ${this._icon.type}">${this._icon.value}</div>`;
    } else {
      const valueObject: any = this._icon.value;
      iconHTML = `<div class="notion-icon ${this._icon.type}"><img src="${valueObject.url}" /></div>`;
    }

    return `<blockquote class="${this.attributes.join(" ")}">
              ${iconHTML}
              ${instedHTML}
            </blockquote>`;
  }
}

export const CalloutBlock = {
  build(notionCallout: BlockItem | any): BlockItem {
    if (NotionBlock.instanceOfBlockItem(notionCallout)) {
      return new CalloutBlockItem(notionCallout);
    }
    const rawRes: any = notionCallout;
    const type = rawRes["type"];
    const richTexts: any[] = rawRes[type]["rich_text"];
    const attributes = [`notion-${type} ${rawRes[type]["color"]}`];

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
      textBlock.attributes = [`notion-${BLOCK_TYPES.CALLOUT}`, ...attributes];

      return TextBlock.build(textBlock.build());
    });

    const calloutBlack = NotionBlock.Builder();
    calloutBlack.id = rawRes.id;
    calloutBlack.type = type;
    calloutBlack.attributes = attributes;
    calloutBlack.children = children;

    const iconType = rawRes[type]["icon"]["type"];
    const iconValue = rawRes[type]["icon"][iconType];
    return new CalloutBlockItem(calloutBlack.build(), {
      type: iconType,
      value: iconValue,
    });
  },
};
