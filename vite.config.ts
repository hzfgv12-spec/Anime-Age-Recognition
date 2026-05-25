import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "."),
      },
    },
    server: {
      // Allow HMR to be disabled in constrained editing environments.
      hmr: process.env.DISABLE_HMR !== "true",
      // Disable file watching entirely when HMR is off to reduce background work.
      watch: process.env.DISABLE_HMR === "true" ? null : {},
    },
  };
});
