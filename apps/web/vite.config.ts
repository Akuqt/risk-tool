import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import macros from "vite-plugin-babel-macros";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), macros()],
});
