import Elysia, { t } from "elysia";
import { uuidv7 } from "uuidv7";
import { Post } from "../components/posts";
import { ctx } from "../context";
import { client as db } from "../db";

export const postsController = new Elysia({
  prefix: "/posts",
})
  .use(ctx)
  .get("/", async ({ log }) => {
    const data = await db.post.findMany();
    log.debug({ message: "Found posts!", data });
    return (
      <div>
        {data.map((post) => (
          <Post {...post} />
        ))}
      </div>
    );
  })
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
          id: uuidv7(),
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
