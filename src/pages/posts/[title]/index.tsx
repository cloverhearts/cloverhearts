import PostPageLayout from './_layout'
import {ReactElement, useEffect} from "react";
import Head from 'next/head';
import styled from 'styled-components'
import hightlightJS from 'highlight.js'

const ArticleStyled = styled.div`
`

export type PostContextProps = {
  title: string, html: string
}

export async function getStaticPaths() {
  const dbJSONImported = await import('../../../../db/posts/db.json')
  const dbJSON = dbJSONImported.default
  const paths = dbJSON.map((post: any) => `/posts/${post.title}`);
  return {
    paths: paths,
    fallback: false
  }
}

export async function getStaticProps(context: any) {
  const {params: {title}} = context
  const dbJSONImported = await import('../../../../db/posts/db.json')
  const dbJSON = dbJSONImported.default
  const post = dbJSON.find(postItem => postItem.titleSlug === encodeURIComponent(title))
  if (!post) {
    return {
      props: {
        id: 'UnknownID',
        dirId: 'UnknownID',
        title: 'Unknown',
        titleSlug: 'Unknown',
        tags: [],
        category: 'Unknown',
        html: 'EMPTY CONTENT',
      }
    }
  }

  return {
    props: {
      id: post.id,
      dirId: post.dirId,
      title: post.title,
      titleSlug: post.titleSlug,
      tags: post.tags,
      category: post.category,
      html: post.html,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt
    },
  }
}

function PostContext(props: PostContextProps) {
  const {title, html} = props
  useEffect(() => {
    // @ts-ignore
    window.hightlightJS = hightlightJS
    hightlightJS.highlightAll()
  }, [])

  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="stylesheet"
              href="https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.7.0/build/styles/base16/chalk.min.css" />
      </Head>
      <article dangerouslySetInnerHTML={{__html: html || ''}}/>
    </>
  )
}

PostContext.getLayout = (page: ReactElement) => {
  return (
    <PostPageLayout>
      {page}
    </PostPageLayout>
  )
}
export default PostContext