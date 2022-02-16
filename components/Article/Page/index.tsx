import styles from './index.module.scss'
import React from "react";

type PageProps = {
    children?: React.ReactNode
}

export default function Page(props: PageProps) : JSX.Element {
    const { children } = props
    return (
        <div className={styles.default}>
            { children }
        </div>
    )
}
