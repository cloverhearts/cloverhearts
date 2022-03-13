import ServiceButton from "@components/Buttons/Service";
import { faBloggerB, faGithub, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import styles from "./index.module.scss";

type ContentProps = {
  className?: string,
}

export default function ContentNav(props: ContentProps): JSX.Element {
  const { className } = props;
  return (
    <nav className={[className, styles.contentNavContainer].join(" ")}>
      <ServiceButton
        title={`Email`}
        icon={faEnvelope}
        size={`2x`}
        link={`mailto:estail7s@outlook.com`}
        linkText={`estail7s@outlook.com`}
      />
      <ServiceButton
        title={`Github`}
        icon={faGithub}
        size={`2x`}
        link={`https://github.com/cloverhearts`}
        linkText={`github.com/cloverhearts`}
      />
      <ServiceButton
        title={`Blog`}
        icon={faBloggerB}
        size={`2x`}
        link={`https://blog.cloverhearts.com`}
        linkText={`blog.cloverhearts.com`}
      />
      <ServiceButton
        title={`LinkedIn`}
        icon={faLinkedinIn}
        size={`2x`}
        link={`https://www.linkedin.com/in/chaesunglim`}
        linkText={`Chae Sung Lim`}
      />
    </nav>
  );
}