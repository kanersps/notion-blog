import Link from "next/link";
import { getAllPosts } from "../utils/posts";
import styles from "./Index.module.css";

export default function Home({ posts }) {
  return (
    <div className={styles.container}>
      <h1>Blog</h1>

      {posts.map((post) => {
        return (
          <Link key={post.id} href={`/post/${post.pretty_id}`} passHref>
            <div className={styles.post}>
              <span>{post.title}</span>

              <span>
                {new Date(post.posted_at).toLocaleDateString(undefined, {
                  weekday: "long",
                  year: "numeric",
                  month: "numeric",
                  day: "numeric",
                })}
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export async function getStaticProps() {
  const posts = await getAllPosts([], undefined, {});

  return { props: { posts } };
}
