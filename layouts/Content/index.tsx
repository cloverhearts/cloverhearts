import React from 'react'
import ArticleHeader from '@components/ArticleHeader'
import styles from './index.module.scss'

type ContentProps = {
  title: string,
  children?: React.ReactNode,
}

function layout(props: ContentProps): JSX.Element {
  const { title, children } = props
  return (
    <main>
      <article className={styles.mainArticle}>
        <ArticleHeader title={title}/>
        <section className={styles.contentContainer}>
          {children ? children : <></>}
        </section>
      </article>
    </main>
  )
}

export default layout