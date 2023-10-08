import { Elysia } from "elysia";
import { BaseHtml } from "../components/base";
import { PostsList } from "../components/posts";
import { ctx } from "../context";

export const index = new Elysia()
  .use(ctx)
  .get("/", async ({ html, session }) => {
    return html(
      <BaseHtml>
        <div class="w-full mt-1">
          {session ? (
            <>
              <p class="text-gray-800 float-left" safe>
                We've been waiting for you, {session.user.name}.
              </p>
              <a
                href="/api/auth/signout"
                class="float-right i-octicon-sign-out text-white transition duration-200 hover:bg-black"
              >
                Log Out
              </a>
              {session.user.roles.includes("ADMIN") ? (
                <a
                  href="/admin/new-post"
                  class="float-right i-octicon-diff-added text-white transition duration-200 hover:bg-black"
                >
                  New Post
                </a>
              ) : null}
            </>
          ) : (
            <a
              href="/api/auth/login/github"
              hx-boost="false"
              class="float-right i-octicon-sign-in text-white transition duration-200 hover:bg-black"
            ></a>
          )}
        </div>
        <PostsList />
      </BaseHtml>,
    );
  });
