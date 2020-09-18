import React from 'react'

import styles from './index.module.scss'

type ImageProps = {
  path: string
  alt: string
  caption?: string
}

type ImageCaptionProps = {
  caption: string
}

function Caption(props: ImageCaptionProps): JSX.Element {
  const { caption } = props
  return <figcaption>{caption}</figcaption>
}

export default function Image(props: ImageProps): JSX.Element {
  const { path, alt, caption } = props
  return (
    <figure className={styles.imageType}>
      <img src={path} alt={alt} />
      <div className={styles.bgContainer}>
        <img className={styles.hidden} src={path} alt={alt} />
      </div>

      {caption ? <Caption caption={caption} /> : null}
    </figure>
  )
}
