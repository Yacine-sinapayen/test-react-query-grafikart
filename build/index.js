import { build } from "esbuild";
import { nodeExternalsPlugin } from "esbuild-node-externals";

build({
  entryPoints: ["src/server.jsx"],
  target: "node14",
  format: "esm",
  platform: "node",
  outdir: "dist",
  watch: true,
  logLevel: "debug",
  bundle: true,
  inject: ["./build/react-shim.js"],
  external: ["events", "react-dom", "react"],
  plugins: [nodeExternalsPlugin()],
});
