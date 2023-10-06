import "./o11y";
import { staticPlugin } from "@elysiajs/static";
import { Elysia } from "elysia";
import { api } from "./api/*";
import { createLogger } from "./lib";
import { pages } from "./pages/*";

const log = createLogger();

const app = new Elysia().use(staticPlugin()).use(api).use(pages).listen(3000);

export type App = typeof app;

log.info(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
