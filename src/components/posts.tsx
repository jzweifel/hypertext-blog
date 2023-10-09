import Html from "@kitajs/html";
import type { PrismaClient } from "@prisma/client";

export async function PostsList({ db }: { db: PrismaClient }) {
  const posts = await db.post.findMany({
    orderBy: [
      {
        createdAt: "desc",
      },
    ],
  });
  return posts.map((post) => Post(post));
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
      <article class="max-h-xs truncate">{body}</article>
      <span class="text-xs text-color-is-it-grey" safe>
        {createdAt}
      </span>
    </div>
  );
}
