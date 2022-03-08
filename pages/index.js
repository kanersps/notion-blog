import Link from "next/link";
import { getAllPosts } from "../utils/posts";
import styles from "./Index.module.css";

export default function Home({ posts }) {
  return (
    <div className={styles.container}>
      <h1>Blog</h1>

      {posts.map((post) => {
        return (
          <div className={styles.post} key={post.id}>
            <Link href={`/post/${post.pretty_id}`} passHref>
              {post.title}
            </Link>

            <span>
              {new Date(post.posted_at).toLocaleDateString(undefined, {
                weekday: "long",
                year: "numeric",
                month: "numeric",
                day: "numeric",
              })}
            </span>
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
