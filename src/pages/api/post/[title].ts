import { NextApiRequest, NextApiResponse } from 'next'

import PostDB from '../../../../db/posts/db.json'

type GetPostPropsType = {
  titleSlug: string
}

export function getPostFromDB(props: { titleSlug: string }) {
  return PostDB.find(postItem => postItem.titleSlug === props.titleSlug)
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  try {
    const title:undefined | string = Array.isArray(req.query.title)? req.query.title.join('') : req.query.title
    if (req.method === 'GET' && title) {
      const post = await getPostFromDB({ titleSlug: encodeURIComponent(title) })
      if (post) {
        return res.status(200).json({ data: post })
      }
    }

    throw { message: `cannot found content` }
  } catch (error: any) {
    return res.status(404).json({ error: true, message: error.message })
  }
}