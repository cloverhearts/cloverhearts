const NotionClient = require("@notionhq/client")
const notionPageToSemanticHTML = require('notion-page-to-semantic-html')
const path = require("path");
const fs = require("fs");

// Initializing a client
const notion = new NotionClient.Client({
  auth: process.env.NOTION_TOKEN,
})

console.log('notion ', notion)

const fetchDB = async () => {
  const publishedPages = await notion.databases.query({
    database_id: "f6ea8bfdf160445daffe0c8cc755bc7a",
    filter: {
      property: 'Published',
      checkbox: { equals: true }
    },
  })

  const pages = publishedPages.results
      .filter(page => page.object === 'page')
      .map(page => {
        const id = page.id
        const createdAt = page.properties['CreatedAt'].created_time
        const updatedAt = page.properties['UpdatedAt'].last_edited_time
        const title = page.properties['Name']['title'][0]
        const postCategoryProperty = page.properties['Category']['select']
        const postCategory = postCategoryProperty ? postCategoryProperty['name'] : 'UNKNOWN'
        const postTags = page.properties['Keywords'].multi_select.map(item => {
          return {...item}
        })
        return {
          dirId: id.replace(/-/g, ''),
          id,
          title: title.plain_text,
          titleSlug: encodeURIComponent(title.plain_text),
          category: postCategory,
          tags: postTags,
          createdAt,
          updatedAt
        }
      })
  return pages
}

fetchDB().then(async contents => {
  const { NotionPage } = notionPageToSemanticHTML
  const postPageDB = await Promise.all(contents.map(async postItem => {
    const htmlObject = await NotionPage.get({ id: postItem.id, authToken: process.env.NOTION_TOKEN})
    return { ...postItem, html: htmlObject.toHTML() || 'EMPTY Content' }
  }))
  const postsDBPath = path.join('db', 'posts', 'db.json')
  fs.writeFileSync(postsDBPath, JSON.stringify(postPageDB), 'utf-8')
})