import { defineConfig } from "vite";
import type { UserConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { resolve } from "path";

export default defineConfig(({ command, mode }) => {
  const config: UserConfig = {
    plugins: [react(), tsconfigPaths()],
    resolve: {
      alias: {
        "node-fetch": "isomorphic-fetch", // This is a workarround for https://github.com/octokit/octokit.js/issues/2126
      },
    },
    build: {
      emptyOutDir: true,
      outDir: resolve(__dirname, "embed"),
      lib: {
        entry: resolve(__dirname, "src/embed/main.tsx"),
        name: "embed",
        fileName: "embed",
      },
      commonjsOptions: {
        include: [/treemap/, /node_modules/],
      },
    },
  };
  return config;
});
