import React from "react";
import styles from "./index.module.scss";

type HeaderProps = {
  className?: string,
  title: string,
  children?: React.ReactNode,
  tags?: string[]
}

export default function Header(props: HeaderProps): JSX.Element {
  const { title, className, tags } = props;
  const sectionTags: string[] = tags || [];
  return (
    <header className={`${className} ${styles.default}`}>
      <h2>
        {title}
        {sectionTags.length ?
          <hgroup className={`${styles.HgroupTagsContainer}`}>
            {sectionTags.map((tag, index) => <h3 key={index}>{tag}</h3>)}
          </hgroup> : <></>
        }
      </h2>
    </header>
  );
}
