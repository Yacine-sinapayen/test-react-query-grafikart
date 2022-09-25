import ReactDOMServer from "react-dom/server.node.js";
import App from "./App.jsx";
import React from "react";

import Fastify from "fastify";
import { ServerLocation } from "@reach/router";
import {
  dehydrate,
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "react-query";
import { loadPost, loadPosts } from "./api.js";

const fastify = Fastify({
  logger: true,
});

fastify.get("/", async function (request, reply) {
  const queryClient = new QueryClient();
  await queryClient.prefetchInfiniteQuery(["posts"], () => loadPosts(1));
  reply.type("text/html");
  reply.send(renderPage(request.url, queryClient));
});

fastify.get("/posts/:id", async function (request, reply) {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["posts", request.params.id], () =>
    loadPost(request.params.id)
  );
  reply.type("text/html");
  reply.send(renderPage(request.url, queryClient));
});

function renderPage(url, queryClient) {
  const dehydratedState = dehydrate(queryClient);
  const html = ReactDOMServer.renderToString(
    <ServerLocation url={url}>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={dehydratedState}>
          <App />
        </Hydrate>
      </QueryClientProvider>
    </ServerLocation>
  );
  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Ma page de test</title>
  <script type="module" src="http://localhost:3000/@vite/client"></script>
  <script type="module">
  import RefreshRuntime from "http://localhost:3000/@react-refresh"
  RefreshRuntime.injectIntoGlobalHook(window)
  window.$RefreshReg$ = () => {}
  window.$RefreshSig$ = () => (type) => type
  window.__vite_plugin_react_preamble_installed__ = true
  </script>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.css" rel="stylesheet">
</head>
<body>
<div id="root">${html}</div>
<script>
  window.__REACT_QUERY_STATE__ = ${JSON.stringify(dehydratedState)}
</script>
<script type="module" src="http://localhost:3000/src/main.jsx?t=1639991946670"></script>
</body>
</html>`;
}

const start = async () => {
  try {
    await fastify.listen(8000);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
