import Elysia from "elysia";
import { post } from "./(slug)";

export const posts = new Elysia({ prefix: "/posts" }).use(post);
