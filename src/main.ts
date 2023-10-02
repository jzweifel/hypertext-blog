import { staticPlugin } from "@elysiajs/static";
import { Elysia } from "elysia";
import { pages } from "./pages/*";

const app = new Elysia().use(staticPlugin()).use(pages).listen(3000);

export type App = typeof app;

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
