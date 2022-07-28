import { defineConfig } from "vite";
import type { UserConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(({ command, mode }) => {
  const config: UserConfig = {
    base: "/github-software-analytics-embedding/",
    plugins: [react(), tsconfigPaths()],
    resolve: {
      alias: {
        "node-fetch": "isomorphic-fetch", // This is a workarround for https://github.com/octokit/octokit.js/issues/2126
      },
    },
    optimizeDeps: {
      include: [
        "treemaps"
      ]
    },
    build: {
      rollupOptions: {
        external: ['react'],
      },
    },
  };
  return config;
});
