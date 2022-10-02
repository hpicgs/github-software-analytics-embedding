import { defineConfig, loadEnv } from "vite";
import type { UserConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(({ command, mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd(), "") };
  const base = process.env.VITE_BASE_NAME
    ? `/${process.env.VITE_BASE_NAME}/`
    : "/";
  const config: UserConfig = {
    base,
    plugins: [react(), tsconfigPaths()],
    resolve: {
      alias: {
        "node-fetch": "isomorphic-fetch", // This is a workarround for https://github.com/octokit/octokit.js/issues/2126
      },
    },
    optimizeDeps: {
      include: ["treemaps", "@analytics/types"],
    },
    build: {
      rollupOptions: {
        external: ["react", "treemaps"],
      },
    },
  };
  return config;
});
