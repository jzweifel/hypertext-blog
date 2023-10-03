import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

const env = createEnv({
  server: {
    LOG_LEVEL: z.enum(["debug", "info", "warn", "error"]),
    DATABASE_CONNECTION_TYPE: z.enum(["local", "remote"]),
    DATABASE_URL: z
      .string()
      .optional()
      .refine((s) => {
        const type = process.env.DATABASE_CONNECTION_TYPE;
        return type === "local" ? s && s.length > 0 : true;
      }),
    NODE_ENV: z.enum(["development", "production"]),
    GITHUB_CLIENT_ID: z.string().min(1),
    GITHUB_CLIENT_SECRET: z.string().min(1),
    HOST_URL: z.string().min(1),
    TURSO_AUTH_TOKEN: z
      .string()
      .optional()
      .refine((s) => {
        const type = process.env.DATABASE_CONNECTION_TYPE;
        return type === "remote" ? s && s.length > 0 : true;
      }),
    TURSO_DATABASE_URL: z
      .string()
      .optional()
      .refine((s) => {
        const type = process.env.DATABASE_CONNECTION_TYPE;
        return type === "remote" ? s && s.length > 0 : true;
      }),
  },
  runtimeEnv: process.env,
});

const args = {
  // watch: process.argv.includes("--watch"),
  // liveReload: true,
};

export const config = {
  env,
  args,
};
