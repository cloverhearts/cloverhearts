import Link from "next/link";

export async function getStaticProps(context: any) {
  const dbJSONImported = await import('../../db/posts/db.json')
  const posts = dbJSONImported.default

  return {
    props: {
      posts: posts.map((post:any) => {
        return {
          id: post.id,
          dirId: post.dirId,
          title: post.title,
          titleSlug: post.titleSlug,
          tags: post.tags,
          category: post.category,
          html: post.html,
          createdAt: post.createdAt,
          updatedAt: post.updatedAt
        }
      })
    },
  }
}

export default function Home(props: any) {
  const { posts } = props
  return (
    <main>
      Main
      { posts.map((post:any) => <p key={post.id} ><Link href={{ pathname: `/posts/${post.title}`}} passHref>{post.title}</Link></p> )}
    </main>
  )
}
