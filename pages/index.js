import Link from "next/link";
import { getAllPosts } from "../utils/posts";
import styles from "./Index.module.css";
import Image from "next/image";

export default function Home({ posts }) {
  return (
    <div className="bg-stone-800 h-screen">
      <div className="md:w-8/12 ml-auto mr-auto pt-10">
        <div className="text-center">
          <span className="font-bold text-white text-4xl">Blog</span>
        </div>

        <div className="w-full h-2 border-t-2 mt-5 mb-5" />

        <div className="grid-cols-1 md:grid-cols-4 grid gap-4">
          {posts.map((post) => {
            return (
              <Link key={post.id} href={`/post/${post.pretty_id}`} passHref>
                <div className="cursor-pointer bg-stone-900 rounded-xl flex flex-col justify-between">
                  {post.cover ? (
                    <div className="w-full mb-0 align-middle">
                      <Image className="align-middle" width={400} height={200} sizes="400px" alt={""} objectFit="responsive" src={post.cover} />
                    </div>
                  ) : (
                    <div></div>
                  )}

                  <div className="flex h-72 flex-col justify-between text-white pl-4 pr-4 pt-2 pb-2 mb-1">
                    <div>
                      <div className="text-2xl text-center font-bold">{post.title}</div>
                      <div>{post.description}</div>
                    </div>

                    <div className="italic text-gray-300">
                      {new Date(post.posted_at).toLocaleDateString(undefined, {
                        weekday: "long",
                        year: "numeric",
                        month: "numeric",
                        day: "numeric",
                      })}
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const posts = await getAllPosts([], undefined, {});

  return { props: { posts } };
}
