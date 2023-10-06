import * as Sentry from "@sentry/bun";
import { config } from "./config";

Sentry.init({
  dsn: "https://82353143d6659ead5b9e92cf3f9c845b@o4506004695482368.ingest.sentry.io/4506004698365952",
  // Performance Monitoring
  tracesSampleRate: 1.0, // Capture 100% of the transactions, reduce in production!
  debug: config.env.NODE_ENV === "development",
});
