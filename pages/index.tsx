import NOTION_APIS from "../scripts/notion-apis";

type HomeProps = {
  posts: any[];
};

export async function getServerSideProps(): Promise<{ props: HomeProps }> {
  const posts = await NOTION_APIS.getPosts();
  return { props: { posts: JSON.parse(JSON.stringify(posts)) } };
}

function Index(props: HomeProps) {
  return (
    <ul>
      {props.posts.map((value: { _title: string }, index: number) => (
        <li key={index}>{value._title}</li>
      ))}
    </ul>
  );
}

export default Index;
