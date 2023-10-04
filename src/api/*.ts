import Elysia from "elysia";
import { authController } from "./auth";
import { postsController } from "./posts";

export const api = new Elysia({
  prefix: "/api",
})
  .use(authController)
  .use(postsController);
