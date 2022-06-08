import { Client } from "@notionhq/client";
import { NotionPost } from "./Notion/Models/Post";
import { NotionBlock } from "./Notion/Models/Blocks";
import dayjs from "dayjs";
import { NotionPage } from "./Notion/Models/Page";
import { ParagraphBlock } from "./Notion/Blocks/Paragraph/index.model";
import { Heading1Block } from "./Notion/Blocks/Heading_1/index.model";
import { Heading2Block } from "./Notion/Blocks/Heading_2/index.model";
import { Heading3Block } from "./Notion/Blocks/Heading_3/index.model";
import { QuoteBlock } from "./Notion/Blocks/Quote/index.model";
import { DividerBlock } from "./Notion/Blocks/Divider/index.model";
import { BookmarkBlock } from "./Notion/Blocks/Bookmark/index.model";
import { VideoBlock } from "./Notion/Blocks/Video/index.model";
import { ImageBlock } from "./Notion/Blocks/Image/index.model";

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

const getBlogPageID = () => "9ddacb35b6b344d6a0f41fb036723e7e";
const getBlogPublicDatabaseID = () => "f6ea8bfdf160445daffe0c8cc755bc7a";

type CommonBlockType = { object: string; type: string };

const notionBlockNormalizer = (blocks: CommonBlockType[]): BlockItem[] => {
  return blocks
    .filter((block) => block.object === "block")
    .map((block) => {
      switch (block.type) {
        case "heading_1":
          return Heading1Block.build(block);
        case "heading_2":
          return Heading2Block.build(block);
        case "heading_3":
          return Heading3Block.build(block);
        case "paragraph":
          return ParagraphBlock.build(block);
        case "quote":
          return QuoteBlock.build(block);
        case "divider":
          return DividerBlock.build(block);
        case "bookmark":
          return BookmarkBlock.build(block);
        case "video":
          return VideoBlock.build(block);
        case "image":
          return ImageBlock.build(block);
        default:
          console.log("UNKNOWN BLOCK", block);
      }

      return NotionBlock.Builder().build();
    })
    .filter((e) => e && e.id !== "UNKNOWN_ID");
};

export default {
  getBlogPageID,
  getBlogPublicDatabaseID,
  getUserList: async () => {
    const list = await notion.users.list({});
    return list;
  },
  getPosts: async (
    databaseID: string = getBlogPublicDatabaseID()
  ): Promise<PostItem[]> => {
    try {
      const databaseRes = await notion.databases.query({
        database_id: getBlogPublicDatabaseID(),
      });

      if (databaseRes.results.length <= 0) {
        throw new Error("pages is empty on database");
      }

      const list: PostItem[] = databaseRes.results
        .filter((item) => item.object === "page")
        .map((item: any) => {
          const titleID = item.properties.Name.type;
          const keywordsID = item.properties.Keywords.type;
          const subjectID = item.properties.Subject.type;

          const newPost = NotionPost.Builder();
          newPost.id = item.id;
          newPost.createdAt = dayjs(item.created_time).toDate();
          newPost.updatedAt = dayjs(item.last_edited_time).toDate();

          const title = item.properties.Name[titleID][0];
          newPost.title = title ? title.plain_text : "EMPTY_TITLE";
          const keywords = item.properties.Keywords[keywordsID];
          newPost.keywords = keywords ? keywords : [];
          const subject = item.properties.Subject[subjectID];
          newPost.subject = subject;
          return newPost.build();
        });
      return list;
    } catch (e) {
      console.error("Cannot get posts data on workspace. ", e);
    }
    return [];
  },
  getPostPage: async (pageID: string): Promise<Page> => {
    try {
      const postPageRes: any = await notion.pages.retrieve({ page_id: pageID });
      console.log("PAGE ", postPageRes);

      if (postPageRes.object !== "page") {
        throw new Error("Object is not page.");
      }

      const blocks: any = await notion.blocks.children.list({
        block_id: "bdbe5605-0155-4c03-a3a2-8f20ed231d5d",
      });
      const content = notionBlockNormalizer(blocks.results);

      const page = NotionPage.Builder();
      const subjectType = postPageRes.properties.Subject["type"];
      const keywordsType = postPageRes.properties.Keywords["type"];
      page.id = pageID;
      page.subject = postPageRes.properties.Subject[subjectType];
      page.keywords = postPageRes.properties.Keywords[keywordsType];
      page.createdAt = dayjs(postPageRes.created_time).toDate();
      page.updatedAt = dayjs(postPageRes.last_edited_time).toDate();
      page.content = content;
      return page.build();
    } catch (e) {
      console.error("Cannot found postPage from ", pageID, e);
    }

    return {
      id: "UNKNOWN_ID",
      title: "UNKNOWN_PAGE",
      createdAt: dayjs().toDate(),
      updatedAt: dayjs().toDate(),
      keywords: [],
      subject: { color: "default", id: "UNKNOWN_ID", name: "UNKNOWN" },
      content: [],
    };
  },
};
