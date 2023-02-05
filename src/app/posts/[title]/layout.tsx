'use client'
import { createGlobalStyle } from 'styled-components'
import styled from './notionStyled.scss'
type PageLayoutPropsType = {
  children: React.ReactNode
}

const GlobalStyle = createGlobalStyle`
    ${styled}
`

export default function PageLayout(props: PageLayoutPropsType) {
  const { children } = props
  return (
    <html lang="ko">
    <head/>
    <GlobalStyle />
    <body>Notion Page Layout {children}</body>
    </html>
  )
}
