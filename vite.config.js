/* eslint-env node */

import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import process from "node:process";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const backendUrl = env.VITE_API_URL;

  return {
    plugins: [react()],
    server: {
      proxy: {
        "/v1": backendUrl,
      },
      host: true,
      strictPort: true,
      watch: {
        usePolling: true,
      },
    },
    build: {
      outDir: "dist",
    },
    define: {
      __VITE_API_URL__: JSON.stringify(env.VITE_API_URL),
    },
  };
});
