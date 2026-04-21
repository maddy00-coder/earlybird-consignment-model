import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

const DEFAULT_API_TARGET = "http://localhost:5000";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const configuredTarget = env.VITE_API_PROXY_TARGET || env.VITE_API_URL || DEFAULT_API_TARGET;
  const proxyTarget = /^https?:\/\//i.test(configuredTarget)
    ? configuredTarget.replace(/\/+$/, "")
    : DEFAULT_API_TARGET;

  return {
    plugins: [react()],
    server: {
      proxy: {
        "/api": {
          target: proxyTarget,
          changeOrigin: true,
        },
      },
    },
  };
});
