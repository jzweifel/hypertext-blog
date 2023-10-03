import { staticPlugin } from "@elysiajs/static";
import { Elysia } from "elysia";
import { api } from "./api/*";
import { pages } from "./pages/*";

const app = new Elysia().use(staticPlugin()).use(api).use(pages).listen(3000);

export type App = typeof app;

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
