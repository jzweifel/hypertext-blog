import { logger } from "@bogeychan/elysia-logger";
import { html } from "@elysiajs/html";
import { HoltLogger } from "@tlscipher/holt";
import { Elysia } from "elysia";
import pretty from "pino-pretty";
import { auth } from "../auth";
import { config } from "../config";

const stream = pretty({
  colorize: true,
});

const loggerConfig =
  config.env.NODE_ENV === "development"
    ? { level: config.env.LOG_LEVEL, stream }
    : { level: config.env.LOG_LEVEL };

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
  .use(
    // @ts-expect-error
    config.env.NODE_ENV === "development"
      ? new HoltLogger().getLogger()
      : (a) => a,
  );
