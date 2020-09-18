import React from 'react'

type QuoteProps = {
  children?: React.ReactNode
  author?: string
  since?: string
}

type AuthorFooterProps = {
  author: string
  since?: string
}

function AuthorFooter(props: AuthorFooterProps): JSX.Element {
  const { author, since } = props
  return (
    <footer>
      {author}, {since ? since : <></>}
    </footer>
  )
}

export default function Quote(props: QuoteProps): JSX.Element {
  const { children, author, since } = props
  return (
    <blockquote>
      {children}
      {author ? <AuthorFooter author={author} since={since} /> : null}
    </blockquote>
  )
}
