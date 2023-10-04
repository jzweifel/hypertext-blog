import Elysia from "elysia";
import { newPost } from "./new-post";

export const admin = new Elysia({ prefix: "/admin" }).use(newPost);
