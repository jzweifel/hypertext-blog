import Elysia, { t } from "elysia";
import { ctx } from "../context";
import { client as db } from "../db";

export const postsController = new Elysia({
  prefix: "/posts",
})
  .use(ctx)
  .post(
    "/",
    async ({ body, log, session, set }) => {
      if (!session || !session.user.roles.includes("ADMIN")) {
        log.debug("You shall not pass!");
        set.status = 403;
        return;
      }

      log.debug({ message: "Creating a post!", body });
      await db.post.create({
        data: {
          title: "foobar",
          body: body.body,
        },
      });
      set.headers["HX-Redirect"] = "/";
    },
    {
      body: t.Object({
        body: t.String({ minLength: 1 }),
      }),
    },
  );
