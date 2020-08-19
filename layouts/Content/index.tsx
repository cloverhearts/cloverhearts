import React from 'react'

import Footer from '@layouts/Footer'
import Nav from '@layouts/Header/Nav'
import ArticleHeader from '@components/Article/Header'

import styles from './index.module.scss'

type ContentProps = {
  title: string,
  children?: React.ReactNode,
}

function layout(props: ContentProps): JSX.Element {
  const { title, children } = props
  return (
    <>
      <Nav/>
      <main>
        <article className={styles.mainArticle}>
          <ArticleHeader title={title}/>
          {children ? children : <></>}
        </article>
      </main>
      <Footer/>
    </>
  )
}

export default layout