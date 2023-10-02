import { Elysia } from "elysia";
import { BaseHtml } from "../components/base";
import { ctx } from "../context";

export const index = new Elysia().use(ctx).get("/", async ({ html }) => {
  return html(
    <BaseHtml>
      <h1 class="text-4xl font-bold color-black" safe>
        A blog thing.
      </h1>
    </BaseHtml>,
  );
});
