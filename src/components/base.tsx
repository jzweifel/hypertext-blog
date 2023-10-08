import Html from "@kitajs/html";

export const BaseHtml = ({ children }: Html.PropsWithChildren) => (
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>A blog thing</title>
      <script
        src="https://js.sentry-cdn.com/a0654b7e9a0d42e0dd8f25332ae9ca6b.min.js"
        crossorigin="anonymous"
      ></script>
      <script>
        {`
          Sentry.init({
            dsn: "https://a0654b7e9a0d42e0dd8f25332ae9ca6b@o4506004695482368.ingest.sentry.io/4506004856373248",
            replaysSessionSampleRate: 1.0,
            replaysOnErrorSampleRate: 1.0,
            integrations: [new Sentry.Replay()],
          });
      `}
      </script>
      <script
        async
        data-id="101429098"
        src="//static.getclicky.com/js"
      ></script>
      <script src="https://unpkg.com/htmx.org@1.9.5"></script>
      <script>htmx.config.globalViewTransitions = true;</script>
      <script src="https://unpkg.com/htmx.org/dist/ext/response-targets.js"></script>
      <script src="https://unpkg.com/htmx.org/dist/ext/loading-states.js"></script>
      <script src="https://unpkg.com/hyperscript.org@0.9.11"></script>
      <script src="/public/tinymce/js/tinymce/tinymce.min.js"></script>
      <style>
        {`
          [data-loading] {
            display: none;
          }
        `}
      </style>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/@unocss/reset/tailwind.min.css"
      />
      <link rel="stylesheet" href="/public/dist/unocss.css" />
    </head>
    <body
      hx-boost="true"
      hx-ext="loading-states"
      class="bg-color-very-blue py-4 px-4"
    >
      <div class="flex min-h-screen w-full">
        <div class="flex flex-1 flex-col items-center bg-color-is-it-grey mx-auto p-4 max-w-screen-xl rounded-2xl border-5 border-color-almost-white border-solid brutal-shadow">
          <div class="flex border-b border-black w-full">
            <a href="/">
              <h1 class="text-5xl font-bold color-black divide-y font-sans">
                A blog thing.
              </h1>
            </a>
          </div>
          {children}
        </div>
      </div>
    </body>
  </html>
);
