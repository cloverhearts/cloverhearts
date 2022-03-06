import React from 'react'
import styles from './index.module.scss'

type HeaderProps = {
    className?: string,
    title: string,
    children?: React.ReactNode,
    tags?: string[]
}

/**
 *                 <hgroup className={style.SubTitles}>
 *                     <h3>#성실</h3>
 *                     <h3>#책임</h3>
 *                     <h3>#도전</h3>
 *                 </hgroup>
 * @param props
 * @constructor
 */

export default function Header(props: HeaderProps) : JSX.Element {
    const { title, children, className, tags } = props
    const sectionTags:string[] = tags || []
    return (
        <header className={`${className} ${styles.default}`}>
            <h2>
                {title}
            { sectionTags.length ?
              <hgroup className={`${styles.HgroupTagsContainer}`}>
                {sectionTags.map(tag => <h3>{tag}</h3>)}
              </hgroup> : <></>
            }
            </h2>
        </header>
    )
}
