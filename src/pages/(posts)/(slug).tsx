import { Elysia, t } from "elysia";
import { BaseHtml } from "../../components/base";
import { Header } from "../../components/header";
import { Post } from "../../components/posts";
import { ctx } from "../../context";

export const post = new Elysia().use(ctx).get(
  "/:slug",
  async ({ html, session, db, params, set, log }) => {
    const post = await db.post.findUnique({
      where: {
        id: params.slug,
      },
    });

    if (!post) {
      log.warn({ message: "whoops not found!", params });
      set.status = 404;
      return;
    }

    return html(
      <BaseHtml subtitle={post.title}>
        <Header session={session} />
        <Post {...post} />
      </BaseHtml>,
    );
  },
  {
    params: t.Object({
      slug: t.String({ minLength: 1 }),
    }),
  },
);
