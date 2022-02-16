import React from 'react'
import styles from './index.module.scss'

type HeaderProps = {
    className?: string,
    children?: React.ReactNode
}

export default function Header(props: HeaderProps) : JSX.Element {
    const { children, className } = props
    return (
        <header className={`${className} ${styles.default}`}>
            { children }
        </header>
    )
}
