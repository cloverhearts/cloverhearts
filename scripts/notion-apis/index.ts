import { Client } from "@notionhq/client";
import { NotionPost } from "./Notion/Models/Post";
import { NotionBlock } from './Notion/Models/Blocks'
import dayjs from "dayjs";

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

const getBlogPageID = () => "9ddacb35b6b344d6a0f41fb036723e7e";
const getBlogPublicDatabaseID = () => "f6ea8bfdf160445daffe0c8cc755bc7a";

type CommonBlockType = { object: string, type: string };

const notionBlockNomalizer = (blocks:CommonBlockType[]): BlockItem[] => {
  const normalizedBlocks:BlockItem[] = []

  blocks
    .filter(block => block.object === 'block' )
    .map(block => {
      const rawRes:any = block
      if (block.type === 'paragraph') {
        const richTexts:any[] = rawRes[block.type]['rich_text']
        const paragraph = NotionBlock.Builder()
        richTexts.map((richText:any) => {
          const type = richText.type
          const attributes: string[] = Object.keys(richText.annotations)
                                              .filter(annotation => richText.annotations[annotation])
                                              .map(annotation => {
                                                if (annotation === 'color') {
                                                  return `color-${richText.annotations[annotation]}`
                                                }
                                                return richText.annotations[annotation]
                                              })

          console.log('BLOCK ', type, attributes)
        })
      }
    })


  return normalizedBlocks
}

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
  getPostPage: async (pageID: string): Promise<PostPage> => {
    try {
      const postPageRes: any = await notion.pages.retrieve({ page_id: pageID });
      console.log("PAGE ", postPageRes);

      if (postPageRes.object !== "page") {
        throw new Error("Object is not page.");
      }

      const blocks: any = await notion.blocks.children.list({
        block_id: "bdbe5605-0155-4c03-a3a2-8f20ed231d5d",
      });
      notionBlockNomalizer(blocks.results)
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
    };
  },
};
