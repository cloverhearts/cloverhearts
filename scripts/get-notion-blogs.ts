import * as fs from "fs";
import * as path from "path";
import NOTION_APIS from "./notion-apis";

async function generatePostDatabase() {
  const pages: PostItem[] = await NOTION_APIS.getPosts();
  fs.writeFileSync(
    path.join(__dirname, "..", "db", "posts.index.json"),
    JSON.stringify(pages)
  );

  pages.map(async (postMeta: PostItem) => {
    const postPage: Page = await NOTION_APIS.getPostPage(postMeta.id);
    fs.writeFileSync(
      path.join(__dirname, "..", "db", `post.${postMeta.id}.json`),
      JSON.stringify({ html: postPage.toHTML() })
    );
  });
}

generatePostDatabase().then((_) => {
  console.log("DONE");
});
