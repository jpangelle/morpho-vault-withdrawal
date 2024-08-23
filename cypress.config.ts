import synpressPlugins from "@synthetixio/synpress/plugins";
import { defineConfig } from "cypress";
import { config } from "dotenv";

config({
  path: ".env.local",
});

module.exports = defineConfig({
  userAgent: "synpress",
  chromeWebSecurity: true,
  defaultCommandTimeout: 30000,
  pageLoadTimeout: 30000,
  requestTimeout: 30000,
  video: false,
  screenshotOnRunFailure: false,
  e2e: {
    testIsolation: true,
    setupNodeEvents(on, config) {
      synpressPlugins(on, config);
    },
    baseUrl: "http://localhost:3000",
    supportFile: "cypress/e2e/support/support.ts",
  },
  env: {
    SKIP_METAMASK_SETUP: true,
    ADMIN_RPC: process.env.CYPRESS_ADMIN_RPC,
    PUBLIC_RPC: process.env.CYPRESS_PUBLIC_RPC,
  },
});
