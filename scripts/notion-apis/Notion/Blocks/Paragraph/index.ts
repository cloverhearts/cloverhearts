import { BLOCK_TYPES } from "../Types.enum";
import { NotionBlock } from "../../Models/Blocks";

export const paragraphParse = (rawRes: any): BlockItem => {
  const richTexts: any[] = rawRes[BLOCK_TYPES.PARAGRAPH]["rich_text"];
  const type = BLOCK_TYPES.PARAGRAPH;
  const attributes = [`notion-${BLOCK_TYPES.PARAGRAPH}`];

  const children = richTexts.map((richText: any) => {
    const textBlock = NotionBlock.Builder();
    const type = BLOCK_TYPES.TEXT;
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

    return textBlock.build();
  });

  const paragraphBlock = NotionBlock.Builder();
  paragraphBlock.id = rawRes.id;
  paragraphBlock.type = type;
  paragraphBlock.attributes = attributes;
  paragraphBlock.children = children;

  return paragraphBlock.build();
};
