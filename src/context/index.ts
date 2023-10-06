import { logger } from "@bogeychan/elysia-logger";
import { html } from "@elysiajs/html";
import { HoltLogger } from "@tlscipher/holt";
import { Elysia } from "elysia";
import { auth } from "../auth";
import { config } from "../config";
import { client as db } from "../db";
import { loggerConfig } from "../lib";

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
  })
  .use(logger(loggerConfig))
  .decorate("db", db)
  .use(
    // @ts-expect-error
    config.env.NODE_ENV === "development"
      ? new HoltLogger().getLogger()
      : (a) => a,
  );
