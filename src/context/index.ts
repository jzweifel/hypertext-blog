import { html } from "@elysiajs/html";
import { Elysia } from "elysia";

export const ctx = new Elysia({
  name: "@app/ctx",
})
  .use(html())
  .decorate("auth", auth)
  .derive(async (ctx) => {
    const now = performance.now();
    const authRequest = ctx.auth.handleRequest(ctx);
    const session = await authRequest.validate();
    console.log("auth time", performance.now() - now, "ms");

    return { session };
  });
