import { defineConfig, loadEnv } from "vite";
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite";
// https://vite.dev/config/
export default defineConfig(({ mode }) => {
   // eslint-disable-next-line no-undef
   const env = loadEnv(mode, process.cwd(), "");
  return {
   plugins: [react(), tailwindcss()],
    assetsInclude: ["**/*.lottie"],
    define: {
       __APP_ENV__: JSON.stringify(env.VITE_APP_NAME),
  }
}
});
