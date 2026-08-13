import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),

    VitePWA({
      registerType: "autoUpdate",

      manifest: {
        name: "งานพิมพ์มือตรวจประวัติ",
        short_name: "พิมพ์มือตรวจประวัติ",
        description:
          "ระบบงานพิมพ์มือตรวจประวัติ งานนโยบายและแผน",

        start_url: "/",
        scope: "/",
        display: "standalone",

        theme_color: "#800020",
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