import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/core": {
        target: "http://pcstore.loc",  
        changeOrigin: true,
        secure: false,
        },
      "/api": {
        target: "http://pcstore.loc", 
        changeOrigin: true,
        secure: false,
      },
    },
  },
});