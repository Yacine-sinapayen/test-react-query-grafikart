import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./App.css";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

/**
 * SEEEDER
 *
for (let i = 1; i < 100; i++) {
  createPost({
    title: `Titre ${i}`,
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam lectus ex, tincidunt sed commodo in, finibus et lectus. Cras quis velit mauris. Nulla at neque sit amet metus pretium gravida fermentum et dolor. Etiam finibus orci nec convallis porta. Integer luctus sagittis leo id auctor. Vestibulum eget mi a tortor imperdiet mattis vel quis nunc. Etiam sed gravida elit. Duis a porta tortor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed suscipit libero eu urna rhoncus eleifend. Proin ac nisi nec lacus tristique dapibus. Aliquam pharetra nunc maximus risus hendrerit, vel sollicitudin risus volutpat.",
    status: "published",
  });
}
 **/

const queryClient = new QueryClient();

ReactDOM.hydrate(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Hydrate state={window.__REACT_QUERY_STATE__}>
        <App />
      </Hydrate>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
