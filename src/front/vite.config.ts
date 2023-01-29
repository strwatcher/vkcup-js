import { defineConfig, PluginOption } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile";
import react from "@vitejs/plugin-react";
import babel from "vite-plugin-babel";
import { visualizer } from "rollup-plugin-visualizer";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        react: "preact/compat",
        "react-dom": "preact/compat",
        "react/jsx-runtime": "preact/jsx-runtime",
      },
    },

    plugins: [
      react(),
      viteSingleFile(),
      babel({
        babelConfig: {
          plugins: [
            [
              "@babel/plugin-transform-react-jsx",
              {
                pragma: "h",
                pragmaFrag: "Fragment",
              },
            ],
          ],
        },
      }),
      visualizer() as unknown as PluginOption,
    ],
    build: {
      minify: mode === "production" ? true : false,
    },
  };
});
