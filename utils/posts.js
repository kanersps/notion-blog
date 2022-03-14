// Initializing a client

const { Client } = require("@notionhq/client");

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

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

async function getFirstBlock(id) {
  return await getAllBlocks(id, [], undefined);
}

export async function getPost(postId) {
  const page = await notion.pages.retrieve({ page_id: postId });

  return {
    title: page.properties.Post.title[0].plain_text,
    blocks: await getAllBlocks(postId, [], undefined),
    created: page.properties.Created.date.start,
  };
}

export async function getAllPosts(allPosts, cursor, pretty_ids) {
  const posts = await notion.databases.query({
    database_id: "94a490f55d984b38beb1a2a5099b5f37",
    sorts: [{ property: "Created", direction: "descending" }],
    start_cursor: cursor,
  });

  if (posts.results.length > 0) {
    await Promise.all(
      posts.results.map(async (post) => {
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

        const firstBlock = (await getFirstBlock(post.id))[0];

        let desc = "";

        if (firstBlock && firstBlock.paragraph && firstBlock.paragraph.rich_text[0]) {
          desc = firstBlock.paragraph.rich_text[0].text.content;
        }

        if (desc.length > 200) {
          desc = desc.substring(0, 197);
          desc += "...";
        }

        let cover = "";

        if (post.cover) {
          switch (post.cover.type) {
            case "external":
              cover = post.cover.external.url;
              break;
          }
        }

        console.log(cover);

        allPosts.push({
          id: post.id,
          pretty_id,
          title: post.properties.Post.title[0].plain_text,
          posted_at: post.properties.Created.date.start,
          description: desc,
          cover: cover,
        });
      })
    );

    if (posts.has_more) {
      return await getAllPosts(allPosts, posts.next_cursor, pretty_ids);
    } else {
      allPosts = allPosts.sort((a, b) => {
        return new Date(b.posted_at) - new Date(a.posted_at);
      });

      return allPosts;
    }
  }
}
