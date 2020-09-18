import React from 'react'

import styles from './index.module.scss'

type CommentProps = {
  message: string
}

export default function Comment(props: CommentProps): JSX.Element {
  const { message } = props
  return <span className={styles.articleComment}>{message}</span>
}
