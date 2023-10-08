import Elysia from "elysia";
import { BaseHtml } from "../../components/base";
import { Header } from "../../components/header";
import { ctx } from "../../context";

export const newPost = new Elysia()
  .use(ctx)
  .get("/new-post", async ({ html, log, session, set }) => {
    if (!session || !session.user.roles.includes("ADMIN")) {
      log.debug("You shall not pass!");
      set.redirect = "/";
      return;
    }

    return html(
      <BaseHtml>
        <Header session={session} />
        <script>{`
      tinymce.init({
        selector: '#new-post'
      });
    `}</script>
        <form hx-post="/api/posts">
          <textarea id="new-post" name="body"></textarea>
          <button type="submit">Add</button>
        </form>
      </BaseHtml>,
    );
  });
