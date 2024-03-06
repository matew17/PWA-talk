# PWA Weather app

## Steps to create a PWA with React + Vite from Scratch

1. Create your app using vite. `npm create vite@latest`
1. Pick React TS + SWC
1. Once scaffolding is created, go to the app folder and install all packages.
1. Clean up your App.tsx
1. Make sure your app runs correctly by running `npm run dev`

## Add Workbox window and workbox vite plugin to your app

1. In the root of the project run the following command. `npm install -D workbox-window vite-plugin-pwa`
1. This will install workbox and vite plugin, necessary for initial setup

## Add workbox configuration to vite.config.ts

1. First thing to do is to import viteplugin `import { VitePWA } from "vite-plugin-pwa";`
2. Add it inside of the plugins array:

```javascript
  plugins: [
    react(),
    VitePWA({
        ...
    })
  ]
```

3. Add all necessary configuration

```javascript
plugins: [
  react(),
  VitePWA({
    includeAssets: ["public/*"], // to add all images
    strategies: "generateSW",
    registerType: "autoUpdate",
    mode: "development", // only for dev mode, remove this later
    workbox: {
      // workbox config to do cache
      globPatterns: ["**/*.{js,jsx,css,html,png,svg,woff2,json}"], // cache all files
      runtimeCaching: [
        {
          urlPattern: /^https:\/\/api\.open-meteo.com\/v1/, // cache for api calls when offline.
          handler: "StaleWhileRevalidate",
          method: "GET",
          options: {
            cacheName: "api-cache",
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
      // same as manifest.json
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
];
```

4. For the runtimeCaching, make sure you replace the URL with the API URL you will be hitting, so the api is cached.

## Test your PWA and check google Lighthouse

We won't be able to test the PWA by using the dev vite server, we need to build the app and the run it either in a server or a local server.

1. Build the app by running `npm run build` in the root of the project
1. Once it's completed we need to run it by emulating a real server.
1. Run `npx servor dist` in the root of the project once the app was built.
1. This should run the app in localhost:8080
1. Go there and open devtools, run lighthouse validation and see the results
1. You can also go to application tab, service workers and see the version of it
1. Inside of application tab you should also be able to see cache strategies, including the API Cache we created previously
