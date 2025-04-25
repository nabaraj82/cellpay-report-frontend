import { defineConfig, configDefaults } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    css: true,
    setupFiles: "./vitest.setup.js",
    exclude: [...configDefaults.exclude, "**/e2e/**"],
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
    },
  },
});
