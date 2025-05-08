import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { visualizer } from "rollup-plugin-visualizer";
import path from "path";
import mkcert from "vite-plugin-mkcert";


export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [react(), visualizer(), tailwindcss(), mkcert()],
    server: {
      port: 3000,
      https: true, 
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        "@components": path.resolve(__dirname, "./src/components"),
        "@component": path.resolve(__dirname, "./src/components"), 
      },
    },
    assetsInclude: ["**/*.lottie"],
    define: {
      __APP_ENV__: JSON.stringify(env.VITE_APP_NAME),
    },
  };
});
