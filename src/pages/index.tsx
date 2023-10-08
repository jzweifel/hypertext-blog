import { Elysia } from "elysia";
import { BaseHtml } from "../components/base";
import { Header } from "../components/header";
import { PostsList } from "../components/posts";
import { ctx } from "../context";

export const index = new Elysia()
  .use(ctx)
  .get("/", async ({ html, session }) => {
    return html(
      <BaseHtml>
        <Header session={session} />
        <PostsList />
      </BaseHtml>,
    );
  });
