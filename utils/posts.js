// Initializing a client

const { Client } = require("@notionhq/client");

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

const pretty_ids = {};
const slugs = {};

export function slugToId(slug) {
  //console.log(slugs);
  return slugs[slug];
}

async function getAllBlocks(id, blocks, cursor) {
  const page = await notion.blocks.children.list({ block_id: id, start_cursor: cursor });

  blocks.push(...page.results);

  if (page.has_more) {
    return await getAllBlocks(id, blocks, page.next_cursor);
  } else {
    return blocks;
  }
}

export async function getPost(postId) {
  const page = await notion.pages.retrieve({ page_id: postId });

  /*
  const content = await notion.blocks.children.list({
    block_id: page.,
  });
  */

  return {
    title: page.properties.Post.title[0].plain_text,
    blocks: await getAllBlocks(postId, [], undefined),
    created: page.properties.Created.date.start,
  };
}

export async function getAllPosts(allPosts, cursor) {
  const posts = await notion.databases.query({
    database_id: "94a490f55d984b38beb1a2a5099b5f37",
    sorts: [{ property: "Created", direction: "descending" }],
    start_cursor: cursor,
  });

  if (posts.results.length > 0) {
    posts.results.forEach((post) => {
      const title = post.properties.Post.title[0].plain_text;

      let pretty_id = title.replace(/ /g, "-");
      pretty_id = pretty_id.toLowerCase();

      if (pretty_ids[pretty_id] !== undefined) {
        pretty_ids[pretty_id]++;

        pretty_id += "-" + pretty_ids[pretty_id];
      } else {
        pretty_ids[pretty_id] = 0;
      }

      slugs[pretty_id] = post.id;

      allPosts.push({
        id: post.id,
        pretty_id,
        title: post.properties.Post.title[0].plain_text,
      });
    });

    if (posts.has_more) {
      return await getAllPosts(allPosts, posts.next_cursor);
    } else {
      return allPosts;
    }
  }
}
