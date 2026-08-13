import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),

    VitePWA({
      registerType: "autoUpdate",

      manifest: {
        name: "ระบบบันทึกรายรับรายจ่าย",
        short_name: "รายรับรายจ่าย",
        description: "ระบบบันทึกรายรับรายจ่าย",

        start_url: "/",
        scope: "/",
        display: "standalone",

        theme_color: "#4CAF50",
        background_color: "#ffffff",

        icons: [
          {
            src: "/assets/muangchonburi.webp",
            sizes: "192x192",
            type: "image/webp",
          },
          {
            src: "/assets/muangchonburi.webp",
            sizes: "512x512",
            type: "image/webp",
          },
        ],
      },
    }),
  ],
});
