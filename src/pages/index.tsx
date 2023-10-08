import { Elysia } from "elysia";
import { BaseHtml } from "../components/base";
import { Header } from "../components/header";
import { PostsList } from "../components/posts";
import { ctx } from "../context";

export const index = new Elysia()
  .use(ctx)
  .get("/", async ({ html, session, db }) => {
    // lol this works but maybe we should find another way
    const postsLists = await PostsList({ db });
    return html(
      <BaseHtml>
        <Header session={session} />
        {postsLists}
      </BaseHtml>,
    );
  });
