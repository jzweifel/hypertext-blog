import { Elysia } from "elysia";
import { pages } from "./pages/*";

const app = new Elysia().use(pages).listen(8080);

export type App = typeof app;

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
