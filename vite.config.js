import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    // Increase chunk size warning limit (default is 500 kB)
    chunkSizeWarningLimit: 1500, // You can adjust as needed (in KB)

    // Optional: Enable manual code splitting
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("react")) return "react";
            if (id.includes("tailwindcss")) return "tailwind";
            return "vendor"; // other libraries
          }
        },
      },
    },
  },
});
