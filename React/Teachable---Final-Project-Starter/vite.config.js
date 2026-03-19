import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { Transform } from "stream";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "/vite.svg": path.resolve(__dirname, "node_modules/identity-obj-proxy"),
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.js",
    TransformMode: { web: [/.[tj]sx$/] },
  },
});
