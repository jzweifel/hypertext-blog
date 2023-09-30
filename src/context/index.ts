import { html } from "@elysiajs/html";
import { Elysia } from "elysia";

export const ctx = new Elysia({
  name: "@app/ctx",
}).use(html());
