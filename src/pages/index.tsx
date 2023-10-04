import { Elysia } from "elysia";
import { BaseHtml } from "../components/base";
import { PostsList } from "../components/posts";
import { ctx } from "../context";

export const index = new Elysia()
  .use(ctx)
  .get("/", async ({ html, session }) => {
    return html(
      <BaseHtml>
        <h1 class="text-4xl font-bold color-black">A blog thing.</h1>
        {session ? (
          <>
            <p class="text-2xl font-bold text-gray-800" safe>
              Hi! {session.user.name}
            </p>
            <a
              href="/api/auth/signout"
              class="mt-4 rounded-lg bg-blue-500 px-4 py-2 text-white transition duration-200 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
            >
              Sign Out
            </a>
          </>
        ) : (
          <a
            href="/api/auth/login/github"
            hx-boost="false"
            class="mt-4 rounded-lg bg-blue-500 px-4 py-2 text-white transition duration-200 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
          >
            Sign In
          </a>
        )}
        <PostsList />
      </BaseHtml>,
    );
  });
