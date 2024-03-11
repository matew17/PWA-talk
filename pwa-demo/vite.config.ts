import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

import { VitePWA } from "vite-plugin-pwa";

// const API_URL = "https://api.open-meteo.com/v1/forecast";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      includeAssets: ["public/*"],
      strategies: "generateSW",
      registerType: "autoUpdate",
      mode: "development",
      workbox: {
        globPatterns: ["**/*.{js,jsx,css,html,png,svg,woff2,json}"],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/api\.open-meteo.com\/v1/,
            handler: "StaleWhileRevalidate",
            method: "GET",
            options: {
              cacheName: "api-open-meteo",
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365, // <== 365 days
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          {
            urlPattern: /^https:\/\/api\.bigdatacloud.net\/data/,
            handler: "StaleWhileRevalidate",
            method: "GET",
            options: {
              cacheName: "api-bigdatacloud",
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365, // <== 365 days
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
      },
      manifest: {
        name: "Softserve's weather app",
        short_name: "WApp",
        description: "A demo app for softserve's first ui commmunity gathering",
        theme_color: "#2196f3",
        background_color: "#2196f3",
        display: "standalone",
        scope: "/",
        start_url: "/",
        orientation: "portrait",
        icons: [
          {
            src: "images/icons/icon-72x72.png",
            sizes: "72x72",
            type: "image/png",
          },
          {
            src: "images/icons/icon-96x96.png",
            sizes: "96x96",
            type: "image/png",
          },
          {
            src: "images/icons/icon-128x128.png",
            sizes: "128x128",
            type: "image/png",
          },
          {
            src: "images/icons/icon-144x144.png",
            sizes: "144x144",
            type: "image/png",
          },
          {
            src: "images/icons/icon-152x152.png",
            sizes: "152x152",
            type: "image/png",
          },
          {
            src: "images/icons/icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "images/icons/icon-384x384.png",
            sizes: "384x384",
            type: "image/png",
          },
          {
            src: "images/icons/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "images/icons/icon-512.maskable.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
    }),
  ],
});
