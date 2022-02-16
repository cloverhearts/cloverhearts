import React from 'react'
import Page from '@components/Article/Page'
import Section from '@components/Article/Section'
import Header from "@components/Article/Header";

import style from './index.module.scss'
import ContentNav from "@components/Article/ContentNav";

export default function index(): JSX.Element {
  return (
    <Page>
        <Section className={style.IndexHeaderSection}>
            <Header className={style.MainSectionHeader}>
                <h1 className={style.NameHeader}>CHAE SUNG LIM</h1>
                <h2 className={style.JobHeader}>SOFTWARE DEVELOPER</h2>
            </Header>
            <ContentNav className={style.ContentNav}/>
        </Section>
    </Page>
  )
}
