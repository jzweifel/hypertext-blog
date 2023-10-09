import Html from "@kitajs/html";
import type { Prisma, PrismaClient } from "@prisma/client";

export async function PostsList({
  db,
  limit,
  cursor,
}: {
  db: PrismaClient;
  limit?: number;
  cursor?: string;
}) {
  const criteria: Prisma.PostFindManyArgs = {
    orderBy: [
      {
        createdAt: "desc",
      },
    ],
  };
  if (limit) criteria.take = limit;
  if (cursor) {
    criteria.skip = 1; // skip the cursor
    criteria.cursor = {
      id: cursor,
    };
  }
  const posts = await db.post.findMany(criteria);
  const postsHtmlElements = posts.map((post) => PostPreview(post));
  const triggerDiv = (
    <div
      hx-get={`/api/posts?cursor=${posts[4]?.id}`}
      hx-trigger="revealed"
      hx-swap="afterend"
    ></div>
  );

  // one extra request if at the end of the list..
  // see if we can make it better later
  if (posts.length > 0) {
    postsHtmlElements.push(triggerDiv);
  }
  return postsHtmlElements;
}

export function PostPreview({
  id,
  title,
  body,
  createdAt,
}: {
  id: string;
  title: string;
  body: string;
  createdAt: Date;
}) {
  return (
    <div class="prose text-black bg-color-almost-white mt-2 py-1 px-4 rounded-lg min-w-3/5 mx-auto">
      <h2 class="font-sans" safe>
        {title}
      </h2>
      <article class="max-h-xs truncate">{body}</article>
      <div>
        <a href={`/posts/${id}`}>Read more...</a>
      </div>
      <span class="text-xs text-color-is-it-grey" safe>
        {createdAt}
      </span>
    </div>
  );
}

export function Post({
  title,
  body,
  createdAt,
}: {
  title: string;
  body: string;
  createdAt: Date;
}) {
  return (
    <div class="prose text-black bg-color-almost-white mt-2 py-1 px-4 rounded-lg min-w-3/5 mx-auto">
      <h2 class="font-sans" safe>
        {title}
      </h2>
      <article>{body}</article>
      <span class="text-xs text-color-is-it-grey" safe>
        {createdAt}
      </span>
    </div>
  );
}
