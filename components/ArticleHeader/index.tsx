import React from 'react'
import styles from './index.module.scss'

type ArticleHeaderProps = {
  title: string
}

function ArticleHeader(props: ArticleHeaderProps): JSX.Element {
  const { title } = props
  return (
    <header className={styles.contentHeader}>
      <div className={styles.headerBackground}
           style={{ background: 'url("https://cdn.pixabay.com/photo/2017/08/30/01/05/milky-way-2695569_960_720.jpg")' }}/>
      <h1>{title}</h1>
    </header>
  )
}

export default ArticleHeader
