import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleQuestion } from "@fortawesome/free-regular-svg-icons";
import { IconDefinition } from "@fortawesome/free-brands-svg-icons";
import { SizeProp } from "@fortawesome/fontawesome-svg-core";

import styles from "./index.module.scss";

type ServiceButtonProps = {
  title: string,
  link: string,
  linkText?: string,
  size?: SizeProp,
  color?: string,
  icon?: IconDefinition,
  className?: string
}

export default function ServiceButton(props: ServiceButtonProps): JSX.Element {
  const { title, link, icon, size, color, linkText, className } = props;
  const iconImage = icon || faCircleQuestion;
  const iconSize = size || `1x`;
  const iconColor = color || `#fff`;
  const linkTextString = linkText || link;
  const styleClassName = className || "";
  return (
    <div className={[styles.serviceButtonContainer, styleClassName].join("")}>
      <div className={styles.contentContainer}>
        <a href={link} target={`_blank`}>
          <FontAwesomeIcon className={[styles.iconBorder, styles.icon].join(" ")} icon={iconImage} size={iconSize}
                           color={iconColor} />
          <div className={styles.description}>
            <p>{title}</p>
            <p>
              {linkTextString}
            </p>
          </div>
        </a>
      </div>
    </div>
  );
}
