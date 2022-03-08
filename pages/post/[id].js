import Button from "../../components/button";
import { getAllPosts, getPost, slugToId } from "../../utils/posts";
import Heading from "./heading";
import Paragraph from "./paragraph";
import styles from "./Post.module.css";

function Post(props) {
  return (
    <div className={styles.container}>
      <div className={styles.top_bar}>
        <Button href="/" size={2}>
          <svg xmlns="http://www.w3.org/2000/svg" style={{ width: 24, height: 24, marginRight: 10 }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
          </svg>
          Back
        </Button>

        <div>
          {new Date(props.posted_at).toLocaleDateString(undefined, {
            weekday: "long",
            year: "numeric",
            month: "numeric",
            day: "numeric",
          })}
        </div>
      </div>

      <h1>{props.title}</h1>

      <div>
        {props.blocks.map((block, id) => {
          if (block.type.startsWith("heading_")) {
            return <Heading key={id} object={block[block.type].rich_text} type={block.type} />;
          }

          switch (block.type) {
            case "paragraph": {
              return <Paragraph key={id} objects={block.paragraph.rich_text} />;
            }
            default: {
              console.log(block);
              return <div key={id}>UNKNOWN</div>;
            }
          }
        })}
      </div>
    </div>
  );
}

export async function getStaticProps({ params }) {
  // Required to fill slugs
  await getAllPosts([], undefined);

  // Get post
  const post = await getPost(slugToId(params.id));

  return {
    props: {
      id: slugToId(params.id),
      slug: params.id,
      blocks: post.blocks,
      title: post.title,
      posted_at: post.created,
    },
  };
}

export async function getStaticPaths() {
  const posts = await getAllPosts([], undefined);

  const paths = posts.map((post) => ({
    params: { id: post.pretty_id },
  }));

  return { paths, fallback: false };
}

export default Post;
