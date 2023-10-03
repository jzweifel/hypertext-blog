import { OAuthRequestError } from "@lucia-auth/oauth";
import Elysia from "elysia";
import { parseCookie, serializeCookie } from "lucia/utils";
import { githubAuth } from "../auth";
import { config } from "../config";
import { ctx } from "../context";
import { redirect, syncIfLocal } from "../lib";

export const authController = new Elysia({
  prefix: "/auth",
})
  .use(ctx)
  .get("/signout", async (ctx) => {
    const authRequest = ctx.auth.handleRequest(ctx);
    const session = await authRequest.validate();

    if (!session) {
      redirect(
        {
          set: ctx.set,
          headers: ctx.headers,
        },
        "/",
      );
      return;
    }

    await ctx.auth.invalidateSession(session.sessionId);

    const sessionCookie = ctx.auth.createSessionCookie(null);

    ctx.set.headers["Set-Cookie"] = sessionCookie.serialize();
    redirect(
      {
        set: ctx.set,
        headers: ctx.headers,
      },
      "/",
    );
  })
  .get("/login/github", async ({ set }) => {
    const [url, state] = await githubAuth.getAuthorizationUrl();

    const state_cookie = serializeCookie("github_auth_state", state, {
      maxAge: 60 * 60,
      httpOnly: true,
      secure: config.env.NODE_ENV === "production",
      path: "/",
    });

    set.headers["Set-Cookie"] = state_cookie;

    set.redirect = url.toString();
  })
  .get("/github/callback", async ({ set, query, headers, auth, log }) => {
    const { state, code } = query;

    const cookies = parseCookie(headers["cookie"] || "");
    const state_cookie = cookies["github_auth_state"];

    if (!state_cookie || !state || state_cookie !== state || !code) {
      set.status = "Unauthorized";
      return;
    }

    try {
      const { createUser, getExistingUser, githubUser } =
        await githubAuth.validateCallback(code);

      const getUser = async () => {
        const existingUser = await getExistingUser();

        if (existingUser) {
          log.debug({ message: "GitHub user already exists", existingUser });
          return existingUser;
        }

        const user = await createUser({
          attributes: {
            name: githubUser.name,
            email: githubUser.email ?? null,
            picture: githubUser.avatar_url,
          },
        });

        log.debug({ message: "Created GitHub user", user });

        return user;
      };

      const user = await getUser();
      const session = await auth.createSession({
        userId: user.userId,
        attributes: {},
      });
      const sessionCookie = auth.createSessionCookie(session);

      await syncIfLocal();

      set.headers["Set-Cookie"] = sessionCookie.serialize();

      redirect(
        {
          set,
          headers,
        },
        "/",
      );
    } catch (err) {
      log.error(err, "Error signing in with GitHub");
      if (err instanceof OAuthRequestError) {
        set.status = "Unauthorized";
        return;
      } else {
        set.status = "Internal Server Error";
        return;
      }
    }
  });
