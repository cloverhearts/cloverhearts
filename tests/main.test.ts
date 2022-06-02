import NOTION_APIS from "../scripts/notion-apis";

it("My first jest test case", async () => {
  const pages = await NOTION_APIS.getPosts();
  console.log("LIST ", pages);
  const firstPage = await NOTION_APIS.getPostPage(pages[0].id);
  console.log("FIRST PAGE ", firstPage);

  console.log(firstPage.content.map((e) => e.toHTML()).join("\n"));

  expect(true).toBe(true);
});
