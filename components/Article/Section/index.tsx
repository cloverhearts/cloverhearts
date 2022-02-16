import React from 'react'

import styles from './index.module.scss'

type SectionProps = {
  className?: string,
  children?: React.ReactNode
}

export default function Section(props: SectionProps): JSX.Element {
  const { children, className } = props
  return (
    <section
      className={[className, styles.default].join(' ')}
    >
      { children }
    </section>
  )
}
