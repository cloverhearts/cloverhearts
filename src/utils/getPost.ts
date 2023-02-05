import PostDB from '../../db/posts/db.json'

type GetPostPropsType = {
  titleSlug: string
}

export function getPost(props:GetPostPropsType) {
  console.log(PostDB)
  return PostDB.find(postItem => postItem.titleSlug === props.titleSlug)
}