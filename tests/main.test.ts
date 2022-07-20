import NOTION_APIS from "../scripts/notion-apis";

it("My first jest test case", async () => {
  const pages = await NOTION_APIS.getPosts();
  const firstPage = await NOTION_APIS.getPostPage(pages[pages.length - 1].id);
  console.log("FIRST PAGE ", firstPage);
  console.log("FIRST PAGE LINK ", firstPage.toHTML());
  // expect(firstPage.toHTML()).not.toBe("");
});
