import { PrismaClient } from "@prisma/client";
import { uuidv7 } from "uuidv7";

export const client = new PrismaClient().$extends({
  query: {
    $allModels: {
      async create({ args, query }) {
        args.data = {
          id: uuidv7(), // provide a default value, but allow it to be replaced if another is present
          ...args.data,
        };

        return query(args);
      },
    },
  },
});
