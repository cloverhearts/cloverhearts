
type ContentProps = {
    className?: string,
}

export default function ContentNav(props: ContentProps):JSX.Element {
    const { className } = props
    return (
        <nav className={[className].join(' ')}>Hello</nav>
    )
}