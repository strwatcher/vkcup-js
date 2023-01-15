import { defineConfig } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile";
import react from "@vitejs/plugin-react";
import babel from "vite-plugin-babel";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  plugins: [
    react(),
    viteSingleFile(),
    babel({
      babelConfig: {
        plugins: ["@babel/plugin-transform-react-jsx"],
      },
    }),
  ],
});
