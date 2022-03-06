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
            <header className={style.MainSectionHeader}>
                <h1 className={style.NameHeaderTitle}>CHAE SUNG LIM</h1>
                <h2 className={style.JobHeaderTitle}>SOFTWARE DEVELOPER</h2>
            </header>
            <ContentNav className={style.ContentNav}/>
        </Section>
        <Section className={style.SelfDescriptionSection}>
            <Header className={style.DescriptionSectionHeader} title={`About ME`} />
            <div className={style.Context}>
                <p># 중간규모 이상의 서비스를 5건 이상 런칭한 경험이 있습니다</p>
                <p># 백앤드부터 프론트엔드까지 모두 제작이 가능해요</p>
                <p># 아파치 재단 커미터이며 이외에도 다양한 오픈소스에 참여하고 있습니다</p>
                <p># Node.js, JVM, Native, Browser 등 다양한 플랫폼 경험이 있습니다</p>
                <p># 차세대 및 고도화 프로젝트에 참여한 경험이 풍부하고 모두 성공했습니다</p>
            </div>
        </Section>
        <Section className={style.PhilosophySection}>
            <Header className={style.PhilosophySectionHeader} title={`Philosophy`} tags={[`#성실`, `#책임`, `#도전`]} />
            <div className={style.Context}>
                <p>비록 낡고 진부한 것일지도 모르지만</p>
                <p>저는 성실함과 맡은 일에 대한 책임감 그리고 새로운 일에 대한 도전이</p>
                <p>제 삶의 나타내는 단어라고 생각합니다</p>
                <p>이러한 삶의 가치를 가지고 고객과 동료에게 힘이 되어주고 싶습니다</p>
            </div>
        </Section>
        <Section className={style.ProjectSkillsSection}>
            <Header className={style.ProjectSkillsSectionHeader} title={`PROJECTS & SKILLS`} tags={[`#네이티브개발`, `#프론트엔드`, `#백앤드`, `#오픈소스`, `#프로젝트리딩경험`, ``]} />
            <div className={style.Context}>
                <p># 중간규모 이상의 서비스를 5건 이상 런칭한 경험이 있습니다</p>
                <p># 백앤드부터 프론트엔드까지 모두 제작이 가능해요</p>
                <p># 아파치 재단 커미터이며 이외에도 다양한 오픈소스에 참여하고 있습니다</p>
                <p># Node.js, JVM, Native, Browser 등 다양한 플랫폼 경험이 있습니다</p>
                <p># 차세대 및 고도화 프로젝트에 참여한 경험이 풍부하고 모두 성공했습니다</p>
            </div>
        </Section>
    </Page>
  )
}
