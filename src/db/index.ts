import { createClient } from "@libsql/client";
import { PrismaLibSQL } from "@prisma/adapter-libsql";
import { PrismaClient } from "@prisma/client";
import { config } from "../config";

const options = (() => {
  switch (config.env.DATABASE_CONNECTION_TYPE) {
    case "local":
      return;
    case "remote":
      if (!config.env.TURSO_DATABASE_URL) return;
      if (!config.env.TURSO_AUTH_TOKEN) return;
      const libsql = createClient({
        url: config.env.TURSO_DATABASE_URL,
        authToken: config.env.TURSO_AUTH_TOKEN,
      });
      const adapter = new PrismaLibSQL(libsql);
      return { adapter };
  }
})();

export const client = new PrismaClient(options);
