import { createPinoLogger } from "@bogeychan/elysia-logger";
import pretty from "pino-pretty";
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

const stream = pretty({
  colorize: true,
});

export const loggerConfig =
  config.env.NODE_ENV === "development"
    ? { level: config.env.LOG_LEVEL, stream }
    : { level: config.env.LOG_LEVEL };

export function createLogger() {
  return createPinoLogger(loggerConfig);
}
