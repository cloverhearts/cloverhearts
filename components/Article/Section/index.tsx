import React from 'react'

import styles from './index.module.scss'

type SectionProps = {
  title?: string
  fullWidth?: boolean
  children?: React.ReactNode
}

export default function Section(props: SectionProps): JSX.Element {
  const { title, children, fullWidth } = props
  return (
    <section
      className={`${!fullWidth ? styles.articleSection : styles.fullWidth}`}
    >
      {title ? (
        <header>
          <h2>{title}</h2>
        </header>
      ) : null}

      {children ? children : <></>}
    </section>
  )
}
