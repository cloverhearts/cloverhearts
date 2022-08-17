type PostProps = {
  title: string;
  html: string;
};

export async function getServerSideProps(
  context: any
): Promise<{ props: PostProps }> {
  const { params } = context;
  const title = params.title || "UNKNOWN_TITLE";
  const dbModule = await import("../../db/posts.index.json");
  const indexedDB: any[] = dbModule.default;

  const post = indexedDB.find((postMeta: any) => postMeta._title === title);
  if (!post) {
    return { props: { title, html: "" } };
  }

  const postDBModule = await import(`../../db/post.${post._id}.json`);
  const postData = postDBModule.default;

  return { props: { title, html: postData.html } };
}

export default function PostPage(props: PostProps): JSX.Element {
  const title: string = props.title;
  const html: string = props.html;
  console.log(html);
  return (
    <article>
      <h1>{title}</h1>
      <div dangerouslySetInnerHTML={{ __html: html }}></div>
    </article>
  );
}
