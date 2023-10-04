import Html from "@kitajs/html";

export function PostsList() {
  return (
    <div
      class="flex justify-center items-center"
      hx-get="/api/posts"
      hx-swap="innerHTML"
      hx-trigger="load"
    />
  );
}

export function Post({ title, body }: { title: string; body: string }) {
  return (
    <div>
      <h3 safe>{title}</h3>
      <article>{body}</article>
    </div>
  );
}
