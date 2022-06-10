import NOTION_APIS from "../scripts/notion-apis";

it("My first jest test case", async () => {
  const pages = await NOTION_APIS.getPosts();
  const firstPage = await NOTION_APIS.getPostPage(pages[0].id);
  console.log("FIRST PAGE ", firstPage);
  expect(firstPage.toHTML()).not.toBe("");
});
