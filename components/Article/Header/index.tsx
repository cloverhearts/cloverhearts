import React from 'react'
import styles from './index.module.scss'

type ArticleHeaderProps = {
  title: string
}

function ArticleHeader(props: ArticleHeaderProps): JSX.Element {
  const { title } = props
  return (
    <header className={styles.container}>
      <h1>{title}</h1>
    </header>
  )
}

export default ArticleHeader
