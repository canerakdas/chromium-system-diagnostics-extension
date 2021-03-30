# Chromium System Diagnostics Extension

This extension can get system information and able to send messages to the PWA.

## Get started

Install the dependencies...

```bash
npm install
```

## Build

To build the compiler, and all the other modules included in the package:

```bash
npm run build
```

## Installing extension

[https://developer.chrome.com/docs/extensions/mv3/faq/#faq-dev-01](How can I set up extension)

## How to get extension id

1. chrome://extensions/
2. Find "System Diagnostics Extension" and click "Details"
3. The ID is the long string of characters at ID section.

## File structure

```
│   manifest.json
│   background.js
│
└───source
│   │   index.js
│   │   router.js
│   │
│   └───adapter
│   │   └───chrome_system
│   │
│   └───models
│   │
│   └───controllers
│
└───icons
```
