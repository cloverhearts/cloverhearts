import styles from "./index.module.scss";

type ProjectPanelProps = {
  name?: string
}

export default function ProjectPanel(props: ProjectPanelProps): JSX.Element {
  const { name } = props;
  const projectName = name || "UNKNOWN_PROJECT_NAME";
  return (
    <div className={styles.ProjectPanel}>
      <h4>{projectName}</h4>
      <div className={styles.DescriptionContainer}>
        <p>
          AWS ECS 및 로드밸런서 활용한 스케일 아웃 인프라 구현
        </p>
        <p>
          모바일 제외 백앤드 및 프론트엔드 개발
        </p>
      </div>
      <div>
        <p>Javascript, Ruby on rails,  Bootstrap CSS, Mysql, AWS ECS</p>
        <p>Docker, ActiveRecord, Restful API</p>
      </div>

    </div>
  );
}