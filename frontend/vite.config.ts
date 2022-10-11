import { defineConfig, loadEnv } from "vite";
import type { UserConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(({ command, mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd(), "") };
  const base = "/github-software-analytics-embedding/";
  //console.log(`Building for ${mode} with base URL ${base}`);
  const config: UserConfig = {
    plugins: [react(), tsconfigPaths()],
    resolve: {
      alias: {
        "node-fetch": "isomorphic-fetch", // This is a workarround for https://github.com/octokit/octokit.js/issues/2126
      },
    },
    optimizeDeps: {
      include: ["treemap"],
    },
    build: {
      commonjsOptions: {
        include: [/treemap/, /node_modules/],
      },
    },
  };
  return config;
});
