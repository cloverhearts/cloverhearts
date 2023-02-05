import {getPost} from "@/utils/getPost";

type PostContextProps = {
  params: { title: string }
}

export default function PostContext(props: PostContextProps) {
  const { params: { title } } = props

  const post: any = getPost({ titleSlug: title }) || { html: 'EMPTY CONTENT'}

  return (
    <main>
      Page title : {decodeURIComponent(title)} <br />
      <article dangerouslySetInnerHTML={{ __html: post.html }} />
    </main>
  )
}
