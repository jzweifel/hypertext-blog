import { config } from "../config";

export function redirect(
  {
    set,
    headers,
  }: {
    headers: Record<string, string | null>;
    set: {
      headers: Record<string, string> & {
        "Set-Cookie"?: string | string[];
      };
      status?: number | string;
      redirect?: string;
    };
  },
  href: string,
) {
  if (headers["hx-request"] === "true") {
    set.headers["HX-Location"] = href;
  } else {
    set.redirect = href;
  }
}

export async function syncIfLocal() {
  //   if (config.env.DATABASE_CONNECTION_TYPE === "local-replica") {
  //     await client.sync();
  //   }
}
