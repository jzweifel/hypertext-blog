import { Elysia } from "elysia";
import { BaseHtml } from "../components/base";
import { ctx } from "../context";

export const index = new Elysia().use(ctx).get("/", async ({ html }) => {
  return html(
    <BaseHtml>
      <div>Welcome to a blog thing.</div>
    </BaseHtml>,
  );
});
