import Elysia from "elysia";
import { admin } from "./(admin)/*";
import { authGroup } from "./(auth)/*";
import { posts } from "./(posts)/*";
import { index } from "./index";

export const pages = new Elysia()
  .use(index)
  .use(authGroup)
  .use(admin)
  .use(posts);
