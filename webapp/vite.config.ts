import { defineConfig } from "vite";
import type { UserConfig } from "vite"; 
import react from "@vitejs/plugin-react";
import legacy from "@vitejs/plugin-legacy";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(({ command, mode }) => {
  const config: UserConfig = {
    plugins: [
      react(),
      tsconfigPaths(),
      legacy()
    ],
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            react: ["react"],
            "react-dom": ["react-dom"],
          },
        },
      },
    },
  };
  return config;
});
