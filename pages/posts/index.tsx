import Link from "next/link";

type PostProps = {
  posts: any[];
};

export async function getServerSideProps(
  context: any
): Promise<{ props: PostProps }> {
  const dbModule = await import("../../db/posts.index.json");
  const indexedDB = dbModule.default;
  return { props: { posts: indexedDB } };
}

export default function PostsPage(props: PostProps): JSX.Element {
  const { posts } = props;
  return (
    <div>
      <ul>
        {posts.map((post: any, index: number) => (
          <li key={index}>
            <Link href={`/posts/${post._title}`}>{post._title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
