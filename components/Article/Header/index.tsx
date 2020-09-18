import React, { createRef, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import styles from './index.module.scss'

type ArticleHeaderProps = {
  title: string
}

function ArticleHeader(props: ArticleHeaderProps): JSX.Element {
  const { title } = props
  const headingElement = createRef<HTMLHeadingElement>()
  const viewPort = useSelector((state) => state.tracking.viewPort)

  const [scaleValue, setScaleValue] = useState('1.0')
  useEffect(() => {
    const { current } = headingElement
    const leavePosition = viewPort.leave
    const headerHeight = current.getBoundingClientRect().height
    if (current && leavePosition <= headerHeight) {
      setScaleValue((1 - leavePosition / headerHeight).toFixed(2))
    }
  }, [headingElement, viewPort])
  return (
    <header ref={headingElement} className={styles.container}>
      <h1 style={{ transform: `scale(${scaleValue})` }}>{title}</h1>
    </header>
  )
}

export default ArticleHeader
