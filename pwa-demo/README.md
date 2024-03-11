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
      ... // Check vite.config.ts to see whole implementation
    },
    manifest: {
      ... // Check vite.config.ts to see whole implementation
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
