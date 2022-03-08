import Link from "next/link";
import { getAllPosts } from "../utils/posts";
import styles from "./Index.module.css";

export default function Home({ posts }) {
  return (
    <div className={styles.container}>
      {posts.map((post) => {
        return (
          <div key={post.id}>
            <Link href={`/post/${post.pretty_id}`} passHref>
              {post.title}
            </Link>
          </div>
        );
      })}
    </div>
  );
}

export async function getStaticProps() {
  const posts = await getAllPosts([], undefined, {});

  return { props: { posts } };
}
