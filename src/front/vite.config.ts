import { defineConfig, PluginOption } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile";
import react from "@vitejs/plugin-react";
import babel from "vite-plugin-babel";
import { visualizer } from "rollup-plugin-visualizer";
import viteCompression from "vite-plugin-compression";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  mode: "production",

  plugins: [
    react(),
    viteSingleFile(),
    babel({
      babelConfig: {
        plugins: ["@babel/plugin-transform-react-jsx"],
      },
    }),
    visualizer() as unknown as PluginOption,
  ],
});
