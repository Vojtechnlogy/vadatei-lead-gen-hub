import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import metaMapPlugin from "vite-plugin-react-meta-map";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: '/',
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    metaMapPlugin({
      pageMetaMapFilePath: "./src/pageMetaMap.ts",
      pageTemplateFilePath: "./src/PageTemplate.tsx",
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    target: 'es2015', // Ensures compatibility with most browsers
  },
}));
